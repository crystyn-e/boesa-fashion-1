import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";

export default function LaporanTransaksi({ transaksis = [], filters = {} }) {
    const [startDate, setStartDate] = useState(filters.start_date || "");
    const [endDate, setEndDate] = useState(filters.end_date || "");
    const [status, setStatus] = useState(filters.status || "");

    const applyFilters = () => {
        router.get(
            "/admin/laporan/transaksi",
            {
                start_date: startDate,
                end_date: endDate,
                status: status,
            },
            { preserveState: true },
        );
    };

    const exportExcel = () => {
        window.open(
            `/admin/laporan/export-transaksi?start_date=${startDate}&end_date=${endDate}&status=${status}`,
            "_blank",
        );
    };

    const resetFilters = () => {
        setStartDate("");
        setEndDate("");
        setStatus("");
        router.get("/admin/laporan/transaksi", {}, { preserveState: true });
    };

    let filtered = [...transaksis];
    if (startDate) filtered = filtered.filter((t) => t.tgl_sewa >= startDate);
    if (endDate) filtered = filtered.filter((t) => t.tgl_sewa <= endDate);
    if (status) filtered = filtered.filter((t) => t.status === status);

    const total = filtered.reduce((sum, t) => sum + (t.total_harga || 0), 0);
    const totalDenda = filtered.reduce((sum, t) => sum + (t.denda || 0), 0);

    return (
        <AdminLayout title="Laporan Transaksi">
            <div className="p-6">
                <Link
                    href="/admin/laporan"
                    className="text-[#C5A059] hover:underline mb-4 inline-block"
                >
                    ← Kembali
                </Link>

                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Laporan Transaksi
                        </h1>
                        <p className="text-gray-500">
                            Filter dan export data transaksi
                        </p>
                    </div>
                    <button
                        onClick={exportExcel}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                        📥 Export Excel
                    </button>
                </div>

                {/* Filter */}
                <div className="bg-white rounded-xl shadow p-5 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border rounded-lg px-3 py-2"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border rounded-lg px-3 py-2"
                        />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded-lg px-3 py-2"
                        >
                            <option value="">Semua Status</option>
                            <option value="proses">Proses</option>
                            <option value="sewa">Disewa</option>
                            <option value="selesai">Selesai</option>
                            <option value="batal">Batal</option>
                        </select>
                        <div className="flex gap-2">
                            <button
                                onClick={applyFilters}
                                className="bg-[#C5A059] text-[#0A192F] px-4 py-2 rounded-lg"
                            >
                                Filter
                            </button>
                            <button
                                onClick={resetFilters}
                                className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow p-5 text-center">
                        <p className="text-gray-500">Total Transaksi</p>
                        <p className="text-2xl font-bold">{filtered.length}</p>
                    </div>
                    <div className="bg-gradient-to-r from-[#0A192F] to-[#1E2F4A] rounded-xl p-5 text-center text-white">
                        <p className="text-sm opacity-80">Total Pendapatan</p>
                        <p className="text-2xl font-bold">
                            Rp {total.toLocaleString()}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-5 text-center">
                        <p className="text-gray-500">Total Denda</p>
                        <p className="text-2xl font-bold text-red-600">
                            Rp {totalDenda.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-[#0A192F] to-[#1E2F4A] text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left">No</th>
                                    <th className="px-4 py-3 text-left">
                                        Kode
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Pelanggan
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Tgl Sewa
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Tgl Kembali
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Total
                                    </th>
                                    <th className="px-4 py-3 text-left">DP</th>
                                    <th className="px-4 py-3 text-left">
                                        Denda
                                    </th>
                                    <th className="px-4 py-3 text-left">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((t, i) => (
                                    <tr
                                        key={t.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3">{i + 1}</td>
                                        <td className="px-4 py-3 text-[#C5A059] font-mono">
                                            {t.kode_transaksi}
                                        </td>
                                        <td className="px-4 py-3">
                                            {t.pelanggan}
                                        </td>
                                        <td className="px-4 py-3">
                                            {t.tgl_sewa}
                                        </td>
                                        <td className="px-4 py-3">
                                            {t.tgl_kembali || "-"}
                                        </td>
                                        <td className="px-4 py-3">
                                            Rp{" "}
                                            {parseInt(
                                                t.total_harga,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            Rp {parseInt(t.dp).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-red-600">
                                            Rp{" "}
                                            {parseInt(t.denda).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${
                                                    t.status === "selesai"
                                                        ? "bg-green-100 text-green-700"
                                                        : t.status === "sewa"
                                                          ? "bg-blue-100 text-blue-700"
                                                          : t.status ===
                                                              "proses"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {t.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
