import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    PlusIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    TrashIcon,
    CubeIcon,
    EyeIcon,
    FunnelIcon,
} from "@heroicons/react/24/outline";

export default function BarangIndex({ barangs, kategoris }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedKategori, setSelectedKategori] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");

    // Filter barang berdasarkan pencarian, kategori, dan status
    const filteredBarangs = barangs.data.filter((barang) => {
        const matchesSearch =
            barang.nama_barang
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            barang.kode_barang.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesKategori = selectedKategori
            ? barang.kategori_id === parseInt(selectedKategori)
            : true;
        const matchesStatus = selectedStatus
            ? barang.status === selectedStatus
            : true;
        return matchesSearch && matchesKategori && matchesStatus;
    });

    // Fungsi untuk hapus barang
    const destroy = (barang) => {
        if (confirm(`Yakin ingin menghapus ${barang.nama_barang}?`)) {
            router.delete(`/admin/barang/${barang.id}`);
        }
    };

    // Status badge
    const getStatusBadge = (status) => {
        switch (status) {
            case "tersedia":
                return (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Tersedia
                    </span>
                );
            case "disewa":
                return (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        Disewa
                    </span>
                );
            case "maintenance":
                return (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                        Maintenance
                    </span>
                );
            default:
                return (
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                        {status}
                    </span>
                );
        }
    };

    return (
        <AdminLayout title="Manajemen Barang">
            <div className="py-6">
                {/* Header dengan Tombol Tambah */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Manajemen Barang
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Kelola semua koleksi jas, gaun, sepatu, aksesoris,
                            dan kostum Boesa Fashion
                        </p>
                    </div>
                    <Link
                        href="/admin/barang/create"
                        className="mt-4 sm:mt-0 inline-flex items-center px-5 py-2.5 bg-[#0A192F] text-white rounded-lg font-medium hover:bg-[#1E2F4A] transition-all duration-300 shadow-sm"
                    >
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Tambah Barang Baru
                    </Link>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex items-center mb-3">
                        <FunnelIcon className="w-5 h-5 text-[#C5A059] mr-2" />
                        <h3 className="font-medium text-gray-700">
                            Filter Barang
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari nama atau kode barang..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all duration-300"
                            />
                        </div>

                        {/* Kategori Filter */}
                        <select
                            value={selectedKategori}
                            onChange={(e) =>
                                setSelectedKategori(e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all duration-300"
                        >
                            <option value="">Semua Kategori</option>
                            {kategoris.map((kategori) => (
                                <option key={kategori.id} value={kategori.id}>
                                    {kategori.nama_kategori}
                                </option>
                            ))}
                        </select>

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all duration-300"
                        >
                            <option value="">Semua Status</option>
                            <option value="tersedia">Tersedia</option>
                            <option value="disewa">Disewa</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Barang
                                </p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {barangs.total || 0}
                                </p>
                            </div>
                            <div className="p-3 bg-gray-100 rounded-xl">
                                <CubeIcon className="w-6 h-6 text-gray-500" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Tersedia
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {
                                        barangs.data.filter(
                                            (b) => b.status === "tersedia",
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-xl">
                                <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Disewa</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {
                                        barangs.data.filter(
                                            (b) => b.status === "disewa",
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-xl">
                                <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Maintenance
                                </p>
                                <p className="text-2xl font-bold text-yellow-600">
                                    {
                                        barangs.data.filter(
                                            (b) => b.status === "maintenance",
                                        ).length
                                    }
                                </p>
                            </div>
                            <div className="p-3 bg-yellow-50 rounded-xl">
                                <div className="w-6 h-6 bg-yellow-600 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabel Barang */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-[#0A192F]">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        No
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Kode
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Foto
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Nama Barang
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Kategori
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Ukuran
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Harga Sewa
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Stok
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredBarangs.length > 0 ? (
                                    filteredBarangs.map((barang, index) => (
                                        <tr
                                            key={barang.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                                    {barang.kode_barang}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {barang.gambar ? (
                                                    <img
                                                        src={`/storage/${barang.gambar}`}
                                                        alt={barang.nama_barang}
                                                        className="w-10 h-10 rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <CubeIcon className="w-5 h-5 text-gray-400" />
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {barang.nama_barang}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {barang.warna || "-"}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                                    {barang.kategori
                                                        ?.nama_kategori || "-"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {barang.ukuran || "-"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-sm font-semibold text-[#C5A059]">
                                                    Rp{" "}
                                                    {parseInt(
                                                        barang.harga_sewa,
                                                    ).toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {barang.stok}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {getStatusBadge(barang.status)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={`/admin/barang/${barang.id}`}
                                                        className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Detail"
                                                    >
                                                        <EyeIcon className="w-5 h-5" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/barang/${barang.id}/edit`}
                                                        className="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <PencilIcon className="w-5 h-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            destroy(barang)
                                                        }
                                                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Hapus"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="10"
                                            className="px-6 py-12 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <CubeIcon className="w-12 h-12 text-gray-300 mb-3" />
                                                <p className="text-lg font-medium">
                                                    Tidak ada barang ditemukan
                                                </p>
                                                <p className="text-sm text-gray-400 mt-1">
                                                    {searchTerm ||
                                                    selectedKategori ||
                                                    selectedStatus
                                                        ? "Coba dengan filter lain"
                                                        : "Belum ada barang yang ditambahkan"}
                                                </p>
                                                {!searchTerm &&
                                                    !selectedKategori &&
                                                    !selectedStatus && (
                                                        <Link
                                                            href="/admin/barang/create"
                                                            className="mt-4 inline-flex items-center px-4 py-2 bg-[#0A192F] text-white rounded-lg font-medium hover:bg-[#1E2F4A] transition-all duration-300"
                                                        >
                                                            <PlusIcon className="w-4 h-4 mr-2" />
                                                            Tambah Barang
                                                            Pertama
                                                        </Link>
                                                    )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {barangs.links && barangs.links.length > 3 && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Menampilkan {barangs.from} - {barangs.to}{" "}
                                    dari {barangs.total} data
                                </div>
                                <div className="flex space-x-2">
                                    {barangs.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || "#"}
                                            className={`px-3 py-1 rounded-md text-sm ${
                                                link.active
                                                    ? "bg-[#0A192F] text-white font-semibold"
                                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
                                            }`}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
