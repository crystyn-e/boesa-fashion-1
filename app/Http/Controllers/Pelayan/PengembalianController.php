<?php

namespace App\Http\Controllers\Pelayan;

use App\Http\Controllers\Controller;
use App\Models\Transaksi;
use App\Models\Barang;
use App\Models\DetailTransaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PengembalianController extends Controller
{
    public function index()
    {
        // Ambil transaksi dengan status 'sewa' yang masih ada barang belum kembali
        $sewaAktif = Transaksi::with(['pelanggan', 'detailTransaksis.barang'])
            ->where('status', 'sewa')
            ->whereHas('detailTransaksis', function ($q) {
                $q->where('status_kembali', 'belum');
            })
            ->orderBy('tgl_harus_kembali')
            ->get()
            ->map(function ($transaksi) {
                // Hitung denda jika telat
                $hariIni = now();
                $tglHarusKembali = $transaksi->tgl_harus_kembali;
                $hariTerlambat = $hariIni->gt($tglHarusKembali) ? $hariIni->diffInDays($tglHarusKembali) : 0;
                $denda = $hariTerlambat * 50000;

                // Hitung progress barang
                $totalBarang = $transaksi->detailTransaksis->count();
                $barangKembali = $transaksi->detailTransaksis->filter(fn($d) => $d->status_kembali === 'sudah')->count();

                return [
                    'id' => $transaksi->id,
                    'kode_transaksi' => $transaksi->kode_transaksi,
                    'pelanggan' => $transaksi->pelanggan->nama ?? 'Walk-in',
                    'status_transaksi' => $transaksi->status,
                    'tgl_sewa' => $transaksi->tgl_sewa->format('d/m/Y'),
                    'tgl_harus_kembali' => $transaksi->tgl_harus_kembali->format('d/m/Y'),
                    'total_harga' => $transaksi->total_harga,
                    'dp' => $transaksi->dp,
                    'sisa' => $transaksi->sisa_pembayaran,
                    'denda' => $denda,
                    'hari_terlambat' => $hariTerlambat,
                    'total_barang' => $totalBarang,
                    'barang_kembali' => $barangKembali,
                    'progress' => $totalBarang > 0 ? round(($barangKembali / $totalBarang) * 100) : 0,
                    'barang' => $transaksi->detailTransaksis->map(function ($detail) {
                        return [
                            'id' => $detail->barang->id,
                            'nama_barang' => $detail->barang->nama_barang,
                            'status_kembali' => $detail->status_kembali,
                        ];
                    }),
                    'semua_kembali' => $transaksi->detailTransaksis->every(fn($d) => $d->status_kembali === 'sudah'),
                ];
            });

        return Inertia::render('Pelayan/Pengembalian/Index', [
            'sewaAktif' => $sewaAktif
        ]);
    }

    public function show($id)
    {
        // Ambil detail transaksi tertentu
        $transaksi = Transaksi::with(['pelanggan', 'detailTransaksis.barang.kategori'])
            ->where('status', 'sewa')
            ->find($id);

        // Jika tidak ditemukan, redirect dengan pesan error
        if (!$transaksi) {
            return redirect()->route('pelayan.pengembalian')
                ->with('error', 'Transaksi tidak ditemukan atau sudah selesai');
        }

        // Hitung denda
        $hariIni = now();
        $tglHarusKembali = $transaksi->tgl_harus_kembali;
        $hariTerlambat = $hariIni->gt($tglHarusKembali) ? $hariIni->diffInDays($tglHarusKembali) : 0;
        $denda = $hariTerlambat * 50000;

        return Inertia::render('Pelayan/Pengembalian/Show', [
            'transaksi' => [
                'id' => $transaksi->id,
                'kode_transaksi' => $transaksi->kode_transaksi,
                'pelanggan' => [
                    'nama' => $transaksi->pelanggan->nama ?? 'Walk-in',
                    'no_telepon' => $transaksi->pelanggan->no_telepon ?? '-',
                ],
                'tgl_sewa' => $transaksi->tgl_sewa->format('Y-m-d'),
                'tgl_harus_kembali' => $transaksi->tgl_harus_kembali->format('Y-m-d'),
                'total_harga' => $transaksi->total_harga,
                'dp' => $transaksi->dp,
                'sisa' => $transaksi->sisa_pembayaran,
                'denda' => $denda,
                'hari_terlambat' => $hariTerlambat,
                'deposit_tipe' => $transaksi->deposit_tipe,
                'deposit_ktp' => $transaksi->deposit_ktp,
                'detail_transaksis' => $transaksi->detailTransaksis->map(function ($detail) {
                    return [
                        'id' => $detail->id,
                        'barang' => [
                            'id' => $detail->barang->id,
                            'nama_barang' => $detail->barang->nama_barang,
                            'ukuran' => $detail->barang->ukuran ?? '-',
                            'kategori' => $detail->barang->kategori->nama_kategori ?? '-',
                        ],
                        'harga_sewa' => $detail->harga_sewa,
                        'status_kembali' => $detail->status_kembali,
                    ];
                }),
            ]
        ]);
    }

    public function proses(Request $request, $id)
    {
        $request->validate([
            'detail_ids' => 'required|array',
            'detail_ids.*' => 'exists:detail_transaksis,id',
            'kondisi' => 'nullable|array',
        ]);

        DB::beginTransaction();

        try {
            $transaksi = Transaksi::findOrFail($id);
            $tglKembali = now()->toDateString();
            $hariTerlambatGlobal = 0;
            $dendaGlobal = 0;

            // Proses barang yang dikembalikan
            foreach ($request->detail_ids as $detailId) {
                $detail = DetailTransaksi::findOrFail($detailId);

                $detail->update([
                    'status_kembali' => 'sudah',
                    'tgl_kembali_aktual' => $tglKembali,
                    'kondisi' => $request->kondisi[$detailId] ?? null,
                ]);

                // Kembalikan status barang
                Barang::where('id', $detail->barang_id)
                    ->update(['status' => 'tersedia']);
            }

            // Cek apakah semua barang sudah kembali
            $belumKembali = DetailTransaksi::where('transaksi_id', $id)
                ->where('status_kembali', 'belum')
                ->count();

            if ($belumKembali == 0) {
                // Hitung denda final
                $tglHarusKembali = $transaksi->tgl_harus_kembali;
                $tglKembaliObj = now();
                $hariTerlambatGlobal = $tglKembaliObj->gt($tglHarusKembali) ? $tglKembaliObj->diffInDays($tglHarusKembali) : 0;
                $dendaGlobal = $hariTerlambatGlobal * 50000;

                // Update transaksi menjadi selesai
                $transaksi->update([
                    'status' => 'selesai',
                    'tgl_kembali' => $tglKembali,
                    'hari_terlambat' => $hariTerlambatGlobal,
                    'denda' => $dendaGlobal,
                    'status_deposit' => 'dikembalikan',
                ]);
            }

            DB::commit();

            $message = 'Barang berhasil dikembalikan.';
            if ($hariTerlambatGlobal > 0) {
                $message .= " Terlambat {$hariTerlambatGlobal} hari, denda Rp " . number_format($dendaGlobal, 0, ',', '.');
            }

            return redirect()->route('pelayan.pengembalian')
                ->with('success', $message);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    public function kembalikanSemua($id)
    {
        DB::beginTransaction();

        try {
            $transaksi = Transaksi::with('detailTransaksis')->findOrFail($id);
            $tglKembali = now()->toDateString();

            // Hitung keterlambatan
            $tglHarusKembali = $transaksi->tgl_harus_kembali;
            $tglKembaliObj = now();
            $hariTerlambat = $tglKembaliObj->gt($tglHarusKembali) ? $tglKembaliObj->diffInDays($tglHarusKembali) : 0;
            $denda = $hariTerlambat * 50000;

            // Update semua detail transaksi
            foreach ($transaksi->detailTransaksis as $detail) {
                $detail->update([
                    'status_kembali' => 'sudah',
                    'tgl_kembali_aktual' => $tglKembali,
                ]);

                Barang::where('id', $detail->barang_id)
                    ->update(['status' => 'tersedia']);
            }

            // Update transaksi
            $transaksi->update([
                'status' => 'selesai',
                'tgl_kembali' => $tglKembali,
                'hari_terlambat' => $hariTerlambat,
                'denda' => $denda,
                'status_deposit' => 'dikembalikan',
            ]);

            DB::commit();

            return redirect()->route('pelayan.pengembalian')
                ->with('success', "Semua barang berhasil dikembalikan. Denda: Rp " . number_format($denda, 0, ',', '.'));
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
