<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Inertia\Inertia; // <-- TAMBAHKAN INI

class HomeController extends Controller
{
    public function index()
    {
        $barangTerbaru = Barang::with('kategori')
            ->where('status', 'tersedia')
            ->latest()
            ->take(8)
            ->get();

        $kategoris = Kategori::where('is_active', true)->get();

        // UBAH INI: dari view() menjadi Inertia::render()
        return Inertia::render('Home', [
            'barangTerbaru' => $barangTerbaru,
            'kategoris' => $kategoris
        ]);
    }

    public function tentang()
    {
        return Inertia::render('Tentang'); // Buat Tentang.jsx nanti
    }

    public function kontak()
    {
        return Inertia::render('Kontak'); // Buat Kontak.jsx nanti
    }
}
