<?php

namespace App\Http\Controllers\Pelayan;

use App\Http\Controllers\Controller;
use App\Models\Transaksi;
use App\Models\Barang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $transaksiHariIni = Transaksi::whereDate('created_at', today())->count();

        $pengembalianHariIni = Transaksi::whereDate('tgl_harus_kembali', today())
            ->where('status', 'sewa')
            ->count();

        $barangTersedia = Barang::where('status', 'tersedia')->count();
        $barangDisewa = Barang::where('status', 'disewa')->count();

        $recentTransactions = Transaksi::with('pelanggan')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($transaksi) {
                return [
                    'id' => $transaksi->id,
                    'kode' => $transaksi->kode_transaksi,
                    'pelanggan' => $transaksi->pelanggan->nama ?? 'Walk-in',
                    'total' => $transaksi->total_harga,
                    'status' => $transaksi->status,
                ];
            });

        $dueReturns = Transaksi::with('pelanggan')
            ->whereDate('tgl_harus_kembali', today())
            ->where('status', 'sewa')
            ->take(5)
            ->get()
            ->map(function ($transaksi) {
                return [
                    'id' => $transaksi->id,
                    'kode' => $transaksi->kode_transaksi,
                    'pelanggan' => $transaksi->pelanggan->nama ?? 'Walk-in',
                    'tglKembali' => $transaksi->tgl_harus_kembali->format('d M Y'),
                    'denda' => 0, // Akan dihitung saat pengembalian
                ];
            });

        $stats = [
            'transaksiHariIni' => $transaksiHariIni,
            'pengembalianHariIni' => $pengembalianHariIni,
            'barangTersedia' => $barangTersedia,
            'barangDisewa' => $barangDisewa,
            'recentTransactions' => $recentTransactions,
            'dueReturns' => $dueReturns,
        ];

        return Inertia::render('Pelayan/Dashboard', [
            'stats' => $stats
        ]);
    }
}
