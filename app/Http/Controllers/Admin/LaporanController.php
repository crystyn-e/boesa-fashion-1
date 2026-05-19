<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Transaksi;
use App\Models\Barang;
use App\Exports\TransaksiExport;
use App\Exports\BarangExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanController extends Controller
{
    public function index()
    {
        $stats = [
            'totalTransaksi' => Transaksi::count(),
            'totalPendapatan' => Transaksi::where('status', 'selesai')->sum('total_harga'),
            'barangTerpopuler' => Barang::orderBy('total_disewa', 'desc')->first()?->nama_barang ?? '-',
        ];

        return Inertia::render('Admin/Laporan/Index', [
            'stats' => $stats
        ]);
    }

    public function transaksi(Request $request)
    {
        $query = Transaksi::with('pelanggan');

        if ($request->filled('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }
        if ($request->filled('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $transaksis = $query->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($t) {
                // HITUNG DENDA BERDASARKAN TANGGAL KEMBALI
                $denda = 0;
                if ($t->tgl_kembali && $t->tgl_kembali > $t->tgl_harus_kembali) {
                    $hariTerlambat = $t->tgl_kembali->diffInDays($t->tgl_harus_kembali);
                    $denda = $hariTerlambat * 50000;
                }

                // ATAU jika belum ada tgl_kembali, gunakan denda dari database
                if ($denda == 0 && $t->denda > 0) {
                    $denda = $t->denda;
                }

                $totalHarga = is_numeric($t->total_harga) ? floatval($t->total_harga) : 0;
                $dp = is_numeric($t->dp) ? floatval($t->dp) : 0;

                return [
                    'id' => $t->id,
                    'kode_transaksi' => $t->kode_transaksi,
                    'pelanggan' => $t->pelanggan?->nama ?? 'Walk-in',
                    'tgl_sewa' => $t->tgl_sewa->format('d/m/Y'),
                    'tgl_harus_kembali' => $t->tgl_harus_kembali->format('d/m/Y'),
                    'tgl_kembali' => $t->tgl_kembali?->format('d/m/Y'),
                    'total_harga' => $totalHarga,
                    'dp' => $dp,
                    'sisa' => floatval($t->sisa_pembayaran),
                    'denda' => $denda,
                    'deposit_tipe' => $t->deposit_tipe === 'uang' ? 'Uang' : 'KTP',
                    'status' => $t->status,
                    'created_at' => $t->created_at->format('d/m/Y H:i'),
                ];
            });

        return Inertia::render('Admin/Laporan/Transaksi', [
            'transaksis' => $transaksis,
            'filters' => $request->only(['start_date', 'end_date', 'status']),
        ]);
    }

    public function exportTransaksi(Request $request)
    {
        return Excel::download(new TransaksiExport($request->start_date, $request->end_date, $request->status), 'laporan-transaksi.xlsx');
    }

    public function barang()
    {
        $barangs = Barang::withCount('detailTransaksis')
            ->with('kategori')
            ->orderBy('total_disewa', 'desc')
            ->get()
            ->map(function ($b) {
                return [
                    'id' => $b->id,
                    'kode_barang' => $b->kode_barang,
                    'nama_barang' => $b->nama_barang,
                    'kategori' => $b->kategori?->nama_kategori ?? '-',
                    'ukuran' => $b->ukuran ?? '-',
                    'warna' => $b->warna ?? '-',
                    'harga_sewa' => floatval($b->harga_sewa),
                    'stok' => $b->stok,
                    'total_disewa' => $b->detail_transaksis_count,
                    'total_pendapatan' => $b->detail_transaksis_count * floatval($b->harga_sewa),
                    'status' => $b->status,
                ];
            });

        return Inertia::render('Admin/Laporan/Barang', [
            'barangs' => $barangs
        ]);
    }

    public function exportBarang()
    {
        return Excel::download(new BarangExport, 'laporan-barang.xlsx');
    }
}
