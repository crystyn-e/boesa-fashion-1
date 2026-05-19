<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Barang;
use App\Models\Transaksi;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // ========== 1. DATA STAF ==========
        $totalStaf = User::where('role', 'staf')->count();

        $stafTerbaru = User::where('role', 'staf')
            ->latest('created_at')
            ->take(5)
            ->get()
            ->map(function ($staf) {
                return [
                    'id' => $staf->id,
                    'nama' => $staf->nama_lengkap,
                    'username' => $staf->username,
                    'email' => $staf->email ?? '-',
                ];
            });

        // ========== 2. DATA BARANG ==========
        $totalBarang = Barang::count();
        $totalTersedia = Barang::where('status', 'tersedia')->count();
        $totalDisewa = Barang::where('status', 'disewa')->count();

        // ========== 3. DATA PESAN MASUK (REAL DARI DATABASE) ==========
        $totalPesanMasuk = Contact::count();  // REAL, bukan dummy
        $pesanBelumDibaca = Contact::where('is_read', false)->count();  // REAL

        // ========== 4. DATA TRANSAKSI ==========
        $transaksiHariIni = Transaksi::whereDate('created_at', today())->count();

        $transaksiBulanIni = Transaksi::whereRaw('EXTRACT(MONTH FROM created_at) = ?', [now()->month])
            ->whereRaw('EXTRACT(YEAR FROM created_at) = ?', [now()->year])
            ->count();

        $pendapatanBulanIni = Transaksi::whereRaw('EXTRACT(MONTH FROM created_at) = ?', [now()->month])
            ->whereRaw('EXTRACT(YEAR FROM created_at) = ?', [now()->year])
            ->where('status', 'selesai')
            ->sum('total_harga');

        $recentTransactions = Transaksi::with('pelanggan')
            ->latest('created_at')
            ->take(5)
            ->get()
            ->map(function ($transaksi) {
                return [
                    'id' => $transaksi->id,
                    'kode' => $transaksi->kode_transaksi,
                    'pelanggan' => $transaksi->pelanggan->nama_lengkap ?? 'Walk-in Customer',
                    'total' => (int) $transaksi->total_harga,
                    'status' => strtolower($transaksi->status),
                ];
            });

        // ========== 5. HITUNG PERUBAHAN PENDAPATAN ==========
        $bulanLaluPendapatan = now()->subMonth();
        $pendapatanBulanLalu = Transaksi::whereRaw('EXTRACT(MONTH FROM created_at) = ?', [$bulanLaluPendapatan->month])
            ->whereRaw('EXTRACT(YEAR FROM created_at) = ?', [$bulanLaluPendapatan->year])
            ->where('status', 'selesai')
            ->sum('total_harga');

        $persenPendapatan = $pendapatanBulanLalu > 0
            ? round((($pendapatanBulanIni - $pendapatanBulanLalu) / $pendapatanBulanLalu) * 100)
            : ($pendapatanBulanIni > 0 ? 100 : 0);

        $pendapatanChange = $persenPendapatan >= 0
            ? "+{$persenPendapatan}% dari bulan lalu"
            : "{$persenPendapatan}% dari bulan lalu";

        // ========== 6. KUMPULKAN STATS (TANPA DUMMY UNTUK PESAN) ==========
        $stats = [
            // Data utama (REAL)
            'totalStaf' => $totalStaf,
            'totalBarang' => $totalBarang,
            'tersedia' => $totalTersedia,
            'disewa' => $totalDisewa,
            'transaksiHariIni' => $transaksiHariIni,
            'transaksiBulanIni' => $transaksiBulanIni,
            'pendapatanBulanIni' => (int) $pendapatanBulanIni,
            'pendapatanBulanIniChange' => $pendapatanChange,

            // DATA PESAN MASUK (REAL, BUKAN DUMMY)
            'totalPesanMasuk' => $totalPesanMasuk,        // ← REAL dari database
            'pesanBelumDibaca' => $pesanBelumDibaca,      // ← REAL dari database
            'pesanMasukChange' => null,                   // ← tidak pakai dummy

            // Data untuk tabel (REAL)
            'stafTerbaru' => $stafTerbaru,
            'recentTransactions' => $recentTransactions,

            // Statistik lain (jika ingin dihilangkan, bisa null)
            'totalStafChange' => null,
            'totalBarangChange' => null,
            'tersediaChange' => null,
            'disewaChange' => null,
            'transaksiHariIniChange' => null,
            'transaksiBulanIniChange' => null,
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }
}
