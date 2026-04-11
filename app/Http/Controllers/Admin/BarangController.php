<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Barang;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BarangController extends Controller
{
    public function index()
    {
        $barangs = Barang::with('kategori')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(fn($barang) => [
                'id' => $barang->id,
                'kode_barang' => $barang->kode_barang,
                'nama_barang' => $barang->nama_barang,
                'slug' => $barang->slug,
                'kategori' => $barang->kategori ? [
                    'id' => $barang->kategori->id,
                    'nama_kategori' => $barang->kategori->nama_kategori,
                ] : null,
                'ukuran' => $barang->ukuran,
                'warna' => $barang->warna,
                'harga_sewa' => $barang->harga_sewa,
                'stok' => $barang->stok,
                'status' => $barang->status,
                'gambar' => $barang->gambar_utama,
            ]);

        $kategoris = Kategori::where('is_active', true)->get();

        return Inertia::render('Admin/Barang/Index', [
            'barangs' => $barangs,
            'kategoris' => $kategoris
        ]);
    }

    public function create()
    {
        $kategoris = Kategori::where('is_active', true)->get();

        return Inertia::render('Admin/Barang/Create', [
            'kategoris' => $kategoris
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'kode_barang' => 'required|string|max:20|unique:barangs',
            'nama_barang' => 'required|string|max:100',
            'kategori_id' => 'required|exists:kategoris,id',
            'ukuran' => 'nullable|string|max:50',
            'warna' => 'nullable|string|max:30',
            'harga_sewa' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            'deskripsi' => 'nullable|string',
            'status' => 'required|in:tersedia,disewa,maintenance',
            'gambar_utama' => 'nullable|image|max:2048',
        ]);

        $data = $request->except('gambar_utama');
        $data['slug'] = Str::slug($request->nama_barang);

        if ($request->hasFile('gambar_utama')) {
            $path = $request->file('gambar_utama')->store('barang', 'public');
            $data['gambar_utama'] = $path;
        }

        Barang::create($data);

        return redirect()->route('admin.barang.index')
            ->with('success', 'Barang berhasil ditambahkan');
    }

    // ... method lainnya (edit, update, destroy)
}
