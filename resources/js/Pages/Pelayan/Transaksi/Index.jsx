import PelayanLayout from "@/Layouts/PelayanLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { MagnifyingGlassIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function TransaksiIndex({ transaksis }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTransaksis = transaksis.filter((t) =>
        t.kode_transaksi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.pelanggan?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status) => {
        switch(status) {
            case 'proses':
                return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Proses</span>;
            case 'sewa':
                return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Sewa</span>;
            case 'selesai':
                return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Selesai</span>;
            case 'batal':
                return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Batal</span>;
            default:
                return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>;
        }
    };

    return (
        <PelayanLayout title="Daftar Sewa">
            <div className="py-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Daftar Transaksi Sewa</h2>
                    <Link
                        href="/pelayan/transaksi/create"
                        className="px-4 py-2 bg-[#C5A059] text-[#0A192F] rounded-lg font-medium hover:bg-[#D4AF37] transition-colors"
                    >
                        + Transaksi Baru
                    </Link>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari berdasarkan kode atau nama pelanggan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Tabel Transaksi */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kode</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pelanggan</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tgl Sewa</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tgl Kembali</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredTransaksis.map((transaksi, index) => (
                                    <tr key={transaksi.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#C5A059]">
                                            {transaksi.kode_transaksi}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {transaksi.pelanggan}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {transaksi.tgl_sewa}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {transaksi.tgl_harus_kembali}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                                            Rp {parseInt(transaksi.total_harga).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(transaksi.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <Link
                                                href={`/pelayan/transaksi/${transaksi.id}`}
                                                className="text-[#C5A059] hover:text-[#D4AF37] font-medium flex items-center"
                                            >
                                                <EyeIcon className="w-4 h-4 mr-1" />
                                                Detail
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredTransaksis.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            Tidak ada transaksi ditemukan
                        </div>
                    )}
                </div>
            </div>
        </PelayanLayout>
    );
}