<?php

namespace App\Http\Controllers\Pelayan;

use App\Http\Controllers\Controller;
use App\Models\Barang;
use App\Models\Kategori;
use Illuminate\Http\Request;

class BarangController extends Controller
{
    public function cekStok(Request $request)
    {
        $query = Barang::with('kategori');

        // Filter by kategori
        if ($request->filled('kategori')) {
            $query->where('kategori_id', $request->kategori);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by search
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nama_barang', 'LIKE', "%{$request->search}%")
                    ->orWhere('kode_barang', 'LIKE', "%{$request->search}%");
            });
        }

        $barangs = $query->orderBy('kode_barang')->paginate(20);
        $kategoris = Kategori::where('is_active', true)->get();

        return view('pelayan.barang.cek-stok', compact('barangs', 'kategoris'));
    }

    public function show($id)
    {
        $barang = Barang::with('kategori', 'detailTransaksis.transaksi.pelanggan')
            ->findOrFail($id);

        return view('pelayan.barang.show', compact('barang'));
    }

    public function tersedia()
    {
        $barangs = Barang::with('kategori')
            ->where('status', 'tersedia')
            ->orderBy('nama_barang')
            ->get();

        return response()->json($barangs);
    }
}
