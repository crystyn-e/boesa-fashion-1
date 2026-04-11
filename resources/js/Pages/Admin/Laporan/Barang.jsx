import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";

export default function LaporanBarang({ barangs = [] }) {
    const [search, setSearch] = useState("");
    const [kategori, setKategori] = useState("");
    const [status, setStatus] = useState("");

    const kategoris = [
        ...new Set(barangs.map((b) => b.kategori).filter(Boolean)),
    ];

    let filtered = barangs.filter((b) => {
        if (
            search &&
            !b.nama_barang?.toLowerCase().includes(search.toLowerCase())
        )
            return false;
        if (kategori && b.kategori !== kategori) return false;
        if (status && b.status !== status) return false;
        return true;
    });

    const totalPendapatan = filtered.reduce(
        (s, b) => s + (b.total_pendapatan || 0),
        0,
    );
    const totalTersedia = filtered.filter(
        (b) => b.status === "tersedia",
    ).length;
    const totalDisewa = filtered.filter((b) => b.status === "disewa").length;

    return (
        <AdminLayout title="Laporan Barang">
            <div className="p-6">
                <Link
                    href="/admin/laporan"
                    className="text-[#C5A059] hover:underline mb-4 inline-block"
                >
                    ← Kembali
                </Link>

                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Laporan Barang
                </h1>
                <p className="text-gray-500 mb-6">Statistik koleksi barang</p>

                {/* Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow p-5 text-center">
                        <p className="text-gray-500 text-sm">Total Barang</p>
                        <p className="text-2xl font-bold text-gray-800">
                            {filtered.length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-5 text-center">
                        <p className="text-gray-500 text-sm">Tersedia</p>
                        <p className="text-2xl font-bold text-green-600">
                            {totalTersedia}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-5 text-center">
                        <p className="text-gray-500 text-sm">Disewa</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {totalDisewa}
                        </p>
                    </div>
                </div>

                {/* Revenue */}
                <div className="bg-gradient-to-r from-[#0A192F] to-[#1E2F4A] rounded-xl p-5 text-white mb-6">
                    <p className="text-sm opacity-80">
                        Total Pendapatan dari Sewa
                    </p>
                    <p className="text-3xl font-bold">
                        Rp {totalPendapatan.toLocaleString()}
                    </p>
                </div>

                {/* Filter */}
                <div className="bg-white rounded-xl shadow p-5 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Cari barang..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border rounded-lg px-3 py-2"
                        />
                        <select
                            value={kategori}
                            onChange={(e) => setKategori(e.target.value)}
                            className="border rounded-lg px-3 py-2"
                        >
                            <option value="">Semua Kategori</option>
                            {kategoris.map((k) => (
                                <option key={k} value={k}>
                                    {k}
                                </option>
                            ))}
                        </select>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded-lg px-3 py-2"
                        >
                            <option value="">Semua Status</option>
                            <option value="tersedia">Tersedia</option>
                            <option value="disewa">Disewa</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                        <button
                            onClick={() => {
                                setSearch("");
                                setKategori("");
                                setStatus("");
                            }}
                            className="bg-gray-100 rounded-lg px-4 py-2 hover:bg-gray-200"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        No
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        Kode
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        Nama Barang
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        Kategori
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        Harga Sewa
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        Stok
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        Total Disewa
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        Pendapatan
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((b, i) => (
                                    <tr
                                        key={b.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3 text-sm">
                                            {i + 1}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-mono">
                                            {b.kode_barang}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium">
                                            {b.nama_barang}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {b.kategori}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-[#C5A059] font-semibold">
                                            Rp{" "}
                                            {parseInt(
                                                b.harga_sewa || 0,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {b.stok}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-blue-600 font-semibold">
                                            {b.total_disewa || 0}x
                                        </td>
                                        <td className="px-4 py-3 text-sm text-green-600">
                                            Rp{" "}
                                            {(
                                                b.total_pendapatan || 0
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${
                                                    b.status === "tersedia"
                                                        ? "bg-green-100 text-green-700"
                                                        : b.status === "disewa"
                                                          ? "bg-blue-100 text-blue-700"
                                                          : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >
                                                {b.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filtered.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            Tidak ada data
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
