<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class KategoriController extends Controller
{
    public function index()
    {
        $kategoris = Kategori::withCount('barangs')
            ->orderBy('urutan')
            ->orderBy('nama_kategori')
            ->get()
            ->map(fn($kategori) => [
                'id' => $kategori->id,
                'nama_kategori' => $kategori->nama_kategori,
                'slug' => $kategori->slug,
                'deskripsi' => $kategori->deskripsi,
                'icon' => $kategori->icon,
                'urutan' => $kategori->urutan,
                'is_active' => $kategori->is_active,
                'barangs_count' => $kategori->barangs_count,
            ]);

        return Inertia::render('Admin/Kategori/Index', [
            'kategoris' => $kategoris
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Kategori/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_kategori' => 'required|string|max:50|unique:kategoris',
            'deskripsi' => 'nullable|string',
            'icon' => 'nullable|string|max:50',
            'urutan' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        Kategori::create([
            'nama_kategori' => $request->nama_kategori,
            'slug' => Str::slug($request->nama_kategori),
            'deskripsi' => $request->deskripsi,
            'icon' => $request->icon,
            'urutan' => $request->urutan ?? 0,
            'is_active' => $request->is_active ?? true,
        ]);

        return redirect()->route('admin.kategori.index')
            ->with('success', 'Kategori berhasil ditambahkan');
    }

    public function edit(Kategori $kategori)
    {
        return Inertia::render('Admin/Kategori/Edit', [
            'kategori' => [
                'id' => $kategori->id,
                'nama_kategori' => $kategori->nama_kategori,
                'deskripsi' => $kategori->deskripsi,
                'icon' => $kategori->icon,
                'urutan' => $kategori->urutan,
                'is_active' => $kategori->is_active,
            ]
        ]);
    }

    public function update(Request $request, Kategori $kategori)
    {
        $request->validate([
            'nama_kategori' => 'required|string|max:50|unique:kategoris,nama_kategori,' . $kategori->id,
            'deskripsi' => 'nullable|string',
            'icon' => 'nullable|string|max:50',
            'urutan' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        $kategori->update([
            'nama_kategori' => $request->nama_kategori,
            'slug' => Str::slug($request->nama_kategori),
            'deskripsi' => $request->deskripsi,
            'icon' => $request->icon,
            'urutan' => $request->urutan ?? 0,
            'is_active' => $request->is_active,
        ]);

        return redirect()->route('admin.kategori.index')
            ->with('success', 'Kategori berhasil diupdate');
    }

    public function destroy(Kategori $kategori)
    {
        if ($kategori->barangs()->count() > 0) {
            return back()->with('error', 'Tidak dapat menghapus kategori yang masih memiliki barang');
        }

        $kategori->delete();

        return redirect()->route('admin.kategori.index')
            ->with('success', 'Kategori berhasil dihapus');
    }
}
