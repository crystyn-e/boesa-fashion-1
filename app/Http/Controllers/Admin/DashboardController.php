<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Barang;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Inertia\Inertia; // <-- TAMBAHKAN INI PENTING!

class DashboardController extends Controller
{
    public function index()
    {
        $totalStaf = User::where('role', 'staf')->count();
        $totalBarang = Barang::count();
        $totalTersedia = Barang::where('status', 'tersedia')->count();
        $totalDisewa = Barang::where('status', 'disewa')->count();

        $transaksiHariIni = Transaksi::whereDate('created_at', today())->count();
        $transaksiBulanIni = Transaksi::whereMonth('created_at', now()->month)->count();

        $pendapatanBulanIni = Transaksi::whereMonth('created_at', now()->month)
            ->where('status', 'selesai')
            ->sum('total_harga');

        $stafTerbaru = User::where('role', 'staf')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($staf) {
                return [
                    'id' => $staf->id,
                    'nama' => $staf->nama_lengkap,
                    'username' => $staf->username,
                    'email' => $staf->email,
                ];
            });

        $recentTransactions = Transaksi::with('pelanggan')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($transaksi) {
                return [
                    'id' => $transaksi->id,
                    'kode' => $transaksi->kode_transaksi,
                    'pelanggan' => $transaksi->pelanggan->nama ?? 'Walk-in Customer',
                    'total' => $transaksi->total_harga,
                    'status' => $transaksi->status,
                ];
            });

        $stats = [
            'totalStaf' => $totalStaf,
            'totalBarang' => $totalBarang,
            'tersedia' => $totalTersedia,
            'disewa' => $totalDisewa,
            'transaksiHariIni' => $transaksiHariIni,
            'transaksiBulanIni' => $transaksiBulanIni,
            'pendapatanBulanIni' => $pendapatanBulanIni,
            'stafTerbaru' => $stafTerbaru,
            'recentTransactions' => $recentTransactions,
        ];

        // UBAH INI: dari view() menjadi Inertia::render()
        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }
}
