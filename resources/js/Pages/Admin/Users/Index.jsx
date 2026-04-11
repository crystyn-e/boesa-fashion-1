import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    PlusIcon,
    MagnifyingGlassIcon,
    PencilIcon,
    TrashIcon,
    UserIcon,
    CheckCircleIcon,
    XCircleIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";

export default function UsersIndex({ users }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter users berdasarkan pencarian
    const filteredUsers = users.data.filter(
        (user) =>
            user.nama_lengkap
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Fungsi untuk toggle status aktif/nonaktif
    const toggleActive = (user) => {
        if (
            confirm(
                `Yakin ingin ${user.is_active ? "menonaktifkan" : "mengaktifkan"} ${user.nama_lengkap}?`,
            )
        ) {
            router.put(`/admin/users/${user.id}/toggle-active`);
        }
    };

    // Fungsi untuk hapus user
    const destroy = (user) => {
        if (confirm(`Yakin ingin menghapus ${user.nama_lengkap}?`)) {
            router.delete(`/admin/users/${user.id}`);
        }
    };

    return (
        <AdminLayout title="Manajemen Staf">
            <div className="py-6">
                {/* Header dengan Tombol Tambah */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Manajemen Staf
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Kelola semua akun staf yang dapat mengakses sistem
                            Boesa Fashion
                        </p>
                    </div>
                    <Link
                        href="/admin/users/create"
                        className="mt-4 sm:mt-0 inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#0A192F] rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Tambah Staf Baru
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari staf berdasarkan nama, username, atau email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent shadow-sm"
                        />
                    </div>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Total Staf
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {users.total || 0}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <UserIcon className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Staf Aktif
                                </p>
                                <p className="text-2xl font-bold text-green-600">
                                    {
                                        users.data.filter((u) => u.is_active)
                                            .length
                                    }
                                </p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <CheckCircleIcon className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Staf Tidak Aktif
                                </p>
                                <p className="text-2xl font-bold text-red-600">
                                    {
                                        users.data.filter((u) => !u.is_active)
                                            .length
                                    }
                                </p>
                            </div>
                            <div className="p-3 bg-red-50 rounded-lg">
                                <XCircleIcon className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabel Staf */}
                <div className="bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-[#0A192F] to-[#1E2F4A]">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        No
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Nama Lengkap
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Username
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                        No. Telepon
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
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user, index) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] rounded-full flex items-center justify-center shadow-md">
                                                        <span className="text-[#0A192F] font-bold text-sm">
                                                            {user.nama_lengkap.charAt(
                                                                0,
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {user.nama_lengkap}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            Bergabung{" "}
                                                            {user.created_at}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {user.username}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-600">
                                                    {user.email}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {user.no_telepon || "-"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.is_active ? (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                                                        Aktif
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                                                        <XCircleIcon className="w-4 h-4 mr-1" />
                                                        Tidak Aktif
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <Link
                                                        href={`/admin/users/${user.id}/edit`}
                                                        className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <PencilIcon className="w-5 h-5" />
                                                    </Link>

                                                    <button
                                                        onClick={() =>
                                                            toggleActive(user)
                                                        }
                                                        className={`p-2 rounded-lg transition-colors ${
                                                            user.is_active
                                                                ? "text-red-600 hover:text-red-900 hover:bg-red-50"
                                                                : "text-green-600 hover:text-green-900 hover:bg-green-50"
                                                        }`}
                                                        title={
                                                            user.is_active
                                                                ? "Nonaktifkan"
                                                                : "Aktifkan"
                                                        }
                                                    >
                                                        {user.is_active ? (
                                                            <XCircleIcon className="w-5 h-5" />
                                                        ) : (
                                                            <CheckCircleIcon className="w-5 h-5" />
                                                        )}
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            destroy(user)
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
                                            colSpan="7"
                                            className="px-6 py-12 text-center"
                                        >
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <UserIcon className="w-12 h-12 text-gray-300 mb-3" />
                                                <p className="text-lg font-medium">
                                                    Tidak ada staf ditemukan
                                                </p>
                                                <p className="text-sm text-gray-400 mt-1">
                                                    {searchTerm
                                                        ? "Coba dengan kata kunci lain"
                                                        : "Belum ada staf yang ditambahkan"}
                                                </p>
                                                {!searchTerm && (
                                                    <Link
                                                        href="/admin/users/create"
                                                        className="mt-4 inline-flex items-center px-4 py-2 bg-[#C5A059] text-[#0A192F] rounded-lg font-medium hover:bg-[#D4AF37] transition-colors"
                                                    >
                                                        <PlusIcon className="w-4 h-4 mr-2" />
                                                        Tambah Staf Pertama
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
                    {users.links && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Menampilkan {users.from} - {users.to} dari{" "}
                                    {users.total} data
                                </div>
                                <div className="flex space-x-2">
                                    {users.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || "#"}
                                            className={`px-3 py-1 rounded-md text-sm ${
                                                link.active
                                                    ? "bg-[#C5A059] text-[#0A192F] font-semibold"
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

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                        <EyeIcon className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                        <div>
                            <h4 className="text-sm font-semibold text-blue-800">
                                Informasi
                            </h4>
                            <p className="text-sm text-blue-700 mt-1">
                                Hanya admin yang dapat menambah, mengedit, dan
                                menghapus staf. Staf yang dinonaktifkan tidak
                                dapat login ke sistem.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
