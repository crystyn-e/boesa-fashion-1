<?php

namespace App\Http\Controllers\Pelayan;

use App\Http\Controllers\Controller;
use App\Models\PelangganCustomer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PelangganController extends Controller
{
    public function index(Request $request)
    {
        $query = PelangganCustomer::query();

        if ($request->filled('search')) {
            $query->where('nama', 'LIKE', "%{$request->search}%")
                ->orWhere('no_telepon', 'LIKE', "%{$request->search}%")
                ->orWhere('nik', 'LIKE', "%{$request->search}%");
        }

        $pelanggans = $query->orderBy('nama')
            ->paginate(15)
            ->through(fn($pelanggan) => [
                'id' => $pelanggan->id,
                'nama' => $pelanggan->nama,
                'no_telepon' => $pelanggan->no_telepon,
                'nik' => $pelanggan->nik,
                'alamat' => $pelanggan->alamat,
                'total_transaksi' => $pelanggan->transaksis()->count(),
                'created_at' => $pelanggan->created_at->format('d/m/Y'),
            ]);

        return Inertia::render('Pelayan/Pelanggan/Index', [
            'pelanggans' => $pelanggans
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:100',
            'no_telepon' => 'nullable|string|max:15',
            'nik' => 'nullable|string|max:20',
            'alamat' => 'nullable|string',
        ]);

        $pelanggan = PelangganCustomer::create($request->all());

        // Redirect back dengan flash data
        return redirect()->back()->with([
            'success' => 'Pelanggan berhasil ditambahkan',
            'pelanggan' => [
                'id' => $pelanggan->id,
                'nama' => $pelanggan->nama,
                'no_telepon' => $pelanggan->no_telepon,
            ]
        ]);
    }

    public function show($id)
    {
        $pelanggan = PelangganCustomer::with('transaksis.detailTransaksis.barang')
            ->findOrFail($id);

        return Inertia::render('Pelayan/Pelanggan/Show', [
            'pelanggan' => [
                'id' => $pelanggan->id,
                'nama' => $pelanggan->nama,
                'no_telepon' => $pelanggan->no_telepon,
                'nik' => $pelanggan->nik,
                'alamat' => $pelanggan->alamat,
                'created_at' => $pelanggan->created_at->format('d/m/Y'),
                'total_transaksi' => $pelanggan->transaksis->count(),
                'transaksis' => $pelanggan->transaksis->map(function ($transaksi) {
                    return [
                        'id' => $transaksi->id,
                        'kode_transaksi' => $transaksi->kode_transaksi,
                        'tgl_sewa' => $transaksi->tgl_sewa->format('d/m/Y'),
                        'tgl_kembali' => $transaksi->tgl_kembali?->format('d/m/Y'),
                        'total_harga' => $transaksi->total_harga,
                        'status' => $transaksi->status,
                    ];
                }),
            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        $pelanggan = PelangganCustomer::findOrFail($id);

        $request->validate([
            'nama' => 'required|string|max:100',
            'no_telepon' => 'nullable|string|max:15',
            'nik' => 'nullable|string|max:20',
            'alamat' => 'nullable|string',
        ]);

        $pelanggan->update($request->all());

        return redirect()->route('pelayan.pelanggan.index')
            ->with('success', 'Data pelanggan berhasil diupdate');
    }

    public function search(Request $request)
    {
        $term = $request->get('q');

        $pelanggan = PelangganCustomer::where('nama', 'LIKE', "%{$term}%")
            ->orWhere('no_telepon', 'LIKE', "%{$term}%")
            ->orWhere('nik', 'LIKE', "%{$term}%")
            ->limit(10)
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'nama' => $p->nama,
                'no_telepon' => $p->no_telepon,
                'nik' => $p->nik,
            ]);

        return response()->json($pelanggan);
    }
}
