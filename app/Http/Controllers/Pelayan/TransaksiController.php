<?php

namespace App\Http\Controllers\Pelayan;

use App\Http\Controllers\Controller;
use App\Models\Barang;
use App\Models\PelangganCustomer;
use App\Models\Transaksi;
use App\Models\DetailTransaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TransaksiController extends Controller
{
    public function create()
    {
        $barangs = Barang::with('kategori')
            ->where('status', 'tersedia')
            ->get()
            ->map(function ($barang) {
                return [
                    'id' => $barang->id,
                    'kode_barang' => $barang->kode_barang,
                    'nama_barang' => $barang->nama_barang,
                    'kategori' => $barang->kategori->nama_kategori ?? 'Umum',
                    'harga_sewa' => $barang->harga_sewa,
                    'gambar' => $barang->gambar_utama ? '/storage/' . $barang->gambar_utama : null,
                ];
            });

        return Inertia::render('Pelayan/Transaksi/Create', [
            'barangs' => $barangs,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_pelanggan' => 'required|string|max:100',
            'no_telepon' => 'required|string|max:15',
            'alamat' => 'nullable|string',
            'tanggal_pengambilan' => 'required|date|after_or_equal:today',
            'barang_ids' => 'required|array|min:1',
            'barang_ids.*' => 'exists:barangs,id',
            'deposit_tipe' => 'required|in:uang,ktp',
            'deposit_ktp' => 'required_if:deposit_tipe,ktp|nullable|string|max:50',
            'dp' => 'required|numeric|min:0',
        ]);

        DB::beginTransaction();

        try {
            // 1. SIMPAN PELANGGAN
            $pelanggan = PelangganCustomer::create([
                'nama' => $request->nama_pelanggan,
                'no_telepon' => $request->no_telepon,
                'alamat' => $request->alamat,
            ]);

            // 2. AMBIL DATA BARANG
            $barangs = Barang::whereIn('id', $request->barang_ids)->get();
            $totalHarga = $barangs->sum('harga_sewa');

            // 3. VALIDASI DP
            if ($request->dp > $totalHarga) {
                return back()->withErrors(['dp' => 'DP tidak boleh melebihi total harga'])->withInput();
            }

            // 4. HITUNG TANGGAL KEMBALI
            $tanggalKembali = date('Y-m-d', strtotime($request->tanggal_pengambilan . ' +3 days'));

            // 5. BUAT TRANSAKSI - HANYA FIELD YANG ADA DI TABEL
            $transaksi = Transaksi::create([
                'kode_transaksi' => 'TRX-' . date('Ymd') . '-' . str_pad(rand(1, 999), 3, '0', STR_PAD_LEFT),
                'user_id' => Auth::id(),
                'pelanggan_id' => $pelanggan->id,
                'tgl_sewa' => $request->tanggal_pengambilan,
                'tgl_harus_kembali' => $tanggalKembali,
                'total_harga' => $totalHarga,
                'dp' => $request->dp,
                'sisa_pembayaran' => $totalHarga - $request->dp,
                'deposit_tipe' => $request->deposit_tipe,
                'deposit_ktp' => $request->deposit_tipe == 'ktp' ? $request->deposit_ktp : null,
                'status' => 'proses',
                'status_deposit' => 'ditahan',
                // HAPUS semua field pembayaran tambahan
            ]);

            // 6. SIMPAN DETAIL TRANSAKSI
            foreach ($barangs as $barang) {
                DetailTransaksi::create([
                    'transaksi_id' => $transaksi->id,
                    'barang_id' => $barang->id,
                    'harga_sewa' => $barang->harga_sewa,
                    'status_kembali' => 'belum',
                ]);

                $barang->update(['status' => 'disewa']);
            }

            DB::commit();

            return redirect()->route('pelayan.transaksi.show', $transaksi->id)
                ->with('success', 'Transaksi berhasil dibuat. Status: PROSES');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage())->withInput();
        }
    }

    public function index()
    {
        $transaksis = Transaksi::with('pelanggan')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($transaksi) {
                return [
                    'id' => $transaksi->id,
                    'kode_transaksi' => $transaksi->kode_transaksi,
                    'pelanggan' => $transaksi->pelanggan->nama ?? 'Walk-in',
                    'tgl_sewa' => $transaksi->tgl_sewa->format('d/m/Y'),
                    'tgl_harus_kembali' => $transaksi->tgl_harus_kembali->format('d/m/Y'),
                    'total_harga' => $transaksi->total_harga,
                    'status' => $transaksi->status,
                ];
            });

        return Inertia::render('Pelayan/Transaksi/Index', [
            'transaksis' => $transaksis
        ]);
    }

    public function show($id)
    {
        $transaksi = Transaksi::with(['pelanggan', 'detailTransaksis.barang.kategori'])
            ->findOrFail($id);

        return Inertia::render('Pelayan/Transaksi/Show', [
            'transaksi' => [
                'id' => $transaksi->id,
                'kode_transaksi' => $transaksi->kode_transaksi,
                'pelanggan' => [
                    'nama' => $transaksi->pelanggan->nama,
                    'no_telepon' => $transaksi->pelanggan->no_telepon,
                    'alamat' => $transaksi->pelanggan->alamat,
                ],
                'tgl_sewa' => $transaksi->tgl_sewa->format('Y-m-d'),
                'tgl_harus_kembali' => $transaksi->tgl_harus_kembali->format('Y-m-d'),
                'tgl_kembali' => $transaksi->tgl_kembali?->format('Y-m-d'),
                'total_harga' => $transaksi->total_harga,
                'dp' => $transaksi->dp,
                'sisa_pembayaran' => $transaksi->sisa_pembayaran,
                'denda' => $transaksi->denda,
                'deposit_tipe' => $transaksi->deposit_tipe,
                'deposit_ktp' => $transaksi->deposit_ktp,
                'status' => $transaksi->status,
                'created_at' => $transaksi->created_at->format('Y-m-d H:i:s'),
                'detail_transaksis' => $transaksi->detailTransaksis->map(function ($detail) {
                    return [
                        'id' => $detail->id,
                        'barang' => [
                            'nama_barang' => $detail->barang->nama_barang,
                            'ukuran' => $detail->barang->ukuran,
                            'kategori' => $detail->barang->kategori,
                        ],
                        'harga_sewa' => $detail->harga_sewa,
                        'status_kembali' => $detail->status_kembali,
                    ];
                }),
            ]
        ]);
    }

    public function ambilBarang($id)
    {
        $transaksi = Transaksi::findOrFail($id);

        if ($transaksi->status !== 'proses') {
            return back()->with('error', 'Hanya transaksi dengan status PROSES yang dapat diambil');
        }

        $transaksi->update(['status' => 'sewa']);

        return redirect()->route('pelayan.transaksi.show', $transaksi->id)
            ->with('success', 'Status berubah menjadi SEWA. Barang sudah diambil pelanggan.');
    }

    public function batal($id)
    {
        $transaksi = Transaksi::findOrFail($id);

        if ($transaksi->status !== 'proses') {
            return back()->with('error', 'Transaksi tidak dapat dibatalkan karena sudah dalam status ' . $transaksi->status);
        }

        DB::beginTransaction();

        try {
            foreach ($transaksi->detailTransaksis as $detail) {
                Barang::where('id', $detail->barang_id)
                    ->update(['status' => 'tersedia']);
            }

            $transaksi->update(['status' => 'batal']);

            DB::commit();

            return redirect()->route('pelayan.transaksi.index')
                ->with('success', 'Transaksi berhasil dibatalkan. DP tidak dikembalikan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Terjadi kesalahan');
        }
    }
}
