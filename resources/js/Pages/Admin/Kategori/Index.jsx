import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    PlusIcon,
    PencilIcon,
    TrashIcon,
    TagIcon,
    ArrowUpIcon,
    ArrowDownIcon,
} from "@heroicons/react/24/outline";

export default function KategoriIndex({ kategoris }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredKategoris = kategoris.filter((kategori) =>
        kategori.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const destroy = (kategori) => {
        if (
            confirm(`Yakin ingin menghapus kategori ${kategori.nama_kategori}?`)
        ) {
            router.delete(`/admin/kategori/${kategori.id}`);
        }
    };

    const toggleActive = (kategori) => {
        router.put(`/admin/kategori/${kategori.id}`, {
            is_active: !kategori.is_active,
        });
    };

    return (
        <AdminLayout title="Manajemen Kategori">
            <div className="py-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Manajemen Kategori
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Kelola kategori untuk jas, gaun, sepatu, aksesoris,
                            dan lainnya
                        </p>
                    </div>
                    <Link
                        href="/admin/kategori/create"
                        className="mt-4 sm:mt-0 inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#0A192F] rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Tambah Kategori Baru
                    </Link>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Cari kategori..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
                    />
                </div>

                {/* Grid Kategori */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredKategoris.map((kategori) => (
                        <div
                            key={kategori.id}
                            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            <div
                                className={`h-2 ${
                                    kategori.nama_kategori === "Jas"
                                        ? "bg-blue-500"
                                        : kategori.nama_kategori === "Gaun"
                                          ? "bg-pink-500"
                                          : kategori.nama_kategori === "Sepatu"
                                            ? "bg-amber-500"
                                            : kategori.nama_kategori ===
                                                "Aksesoris"
                                              ? "bg-purple-500"
                                              : kategori.nama_kategori ===
                                                  "Kostum"
                                                ? "bg-green-500"
                                                : "bg-[#C5A059]"
                                }`}
                            ></div>
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <TagIcon className="w-6 h-6 text-[#C5A059]" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">
                                                {kategori.nama_kategori}
                                            </h3>
                                            <p className="text-xs text-gray-500">
                                                {kategori.barangs_count || 0}{" "}
                                                barang
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full ${
                                            kategori.is_active
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {kategori.is_active
                                            ? "Aktif"
                                            : "Nonaktif"}
                                    </span>
                                </div>

                                {kategori.deskripsi && (
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                        {kategori.deskripsi}
                                    </p>
                                )}

                                <div className="flex items-center space-x-2 text-xs text-gray-500 mb-4">
                                    <span>Urutan: {kategori.urutan}</span>
                                    {kategori.icon && (
                                        <>
                                            <span>•</span>
                                            <span>Icon: {kategori.icon}</span>
                                        </>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100">
                                    <button
                                        onClick={() =>
                                            router.get(
                                                `/admin/kategori/${kategori.id}/edit`,
                                            )
                                        }
                                        className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <PencilIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => toggleActive(kategori)}
                                        className={`p-2 rounded-lg transition-colors ${
                                            kategori.is_active
                                                ? "text-red-600 hover:text-red-900 hover:bg-red-50"
                                                : "text-green-600 hover:text-green-900 hover:bg-green-50"
                                        }`}
                                        title={
                                            kategori.is_active
                                                ? "Nonaktifkan"
                                                : "Aktifkan"
                                        }
                                    >
                                        {kategori.is_active ? (
                                            <span className="text-sm font-medium">
                                                Nonaktif
                                            </span>
                                        ) : (
                                            <span className="text-sm font-medium">
                                                Aktif
                                            </span>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => destroy(kategori)}
                                        className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Hapus"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredKategoris.length === 0 && (
                    <div className="text-center py-12">
                        <TagIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                            Tidak ada kategori
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {searchTerm
                                ? "Coba dengan kata kunci lain"
                                : "Belum ada kategori yang ditambahkan"}
                        </p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
