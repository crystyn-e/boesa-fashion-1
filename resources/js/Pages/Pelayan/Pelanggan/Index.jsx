import PelayanLayout from "@/Layouts/PelayanLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    MagnifyingGlassIcon,
    UserPlusIcon,
    EyeIcon,
    PhoneIcon,
    IdentificationIcon,
} from "@heroicons/react/24/outline";

export default function PelangganIndex({ pelanggans }) {
    const [searchTerm, setSearchTerm] = useState("");

    const search = (e) => {
        e.preventDefault();
        router.get(
            "/pelayan/pelanggan",
            { search: searchTerm },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <PelayanLayout title="Data Pelanggan">
            <div className="py-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Data Pelanggan
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Daftar pelanggan yang pernah melakukan transaksi
                        </p>
                    </div>
                    <Link
                        href="/pelayan/pelanggan/create"
                        className="px-4 py-2 bg-[#C5A059] text-[#0A192F] rounded-lg font-medium hover:bg-[#D4AF37] transition-colors flex items-center"
                    >
                        <UserPlusIcon className="w-5 h-5 mr-2" />
                        Tambah Pelanggan
                    </Link>
                </div>

                {/* Search */}
                <form onSubmit={search} className="mb-6">
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari berdasarkan nama, no telepon, atau NIK..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cari
                        </button>
                    </div>
                </form>

                {/* Table */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        No
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Nama
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        No. Telepon
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        NIK
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Alamat
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Total Transaksi
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {pelanggans.data.map((pelanggan, index) => (
                                    <tr
                                        key={pelanggan.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {pelanggans.from + index}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {pelanggan.nama}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600 flex items-center">
                                                <PhoneIcon className="w-4 h-4 mr-1 text-gray-400" />
                                                {pelanggan.no_telepon || "-"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600 flex items-center">
                                                <IdentificationIcon className="w-4 h-4 mr-1 text-gray-400" />
                                                {pelanggan.nik || "-"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {pelanggan.alamat || "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {pelanggan.total_transaksi}x
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <Link
                                                href={`/pelayan/pelanggan/${pelanggan.id}`}
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

                    {/* Pagination */}
                    {pelanggans.links && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    Menampilkan {pelanggans.from} -{" "}
                                    {pelanggans.to} dari {pelanggans.total} data
                                </div>
                                <div className="flex space-x-2">
                                    {pelanggans.links.map((link, index) => (
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
            </div>
        </PelayanLayout>
    );
}
