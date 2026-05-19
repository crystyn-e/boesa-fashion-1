import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline";

export default function BarangShow({ barang }) {
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
        <AdminLayout title={`Detail Barang: ${barang.nama_barang}`}>
            <div className="py-6">
                {/* Back Button - Warna emas */}
                <Link
                    href="/admin/barang"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-[#C5A059] transition-colors mb-6"
                >
                    <ArrowLeftIcon className="w-4 h-4 mr-1" />
                    Kembali ke Daftar Barang
                </Link>

                {/* Detail Card - Putih solid */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* Header - Navy solid */}
                    <div className="bg-[#0A192F] px-6 py-4 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-white">
                            Informasi Barang
                        </h2>
                        <Link
                            href={`/admin/barang/${barang.id}/edit`}
                            className="inline-flex items-center px-4 py-2 bg-[#C5A059] text-[#0A192F] rounded-lg text-sm font-medium hover:bg-[#D4AF37] transition-all duration-300"
                        >
                            <PencilIcon className="w-4 h-4 mr-2" />
                            Edit Barang
                        </Link>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Foto Barang */}
                            <div className="md:col-span-1">
                                <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center border border-gray-200">
                                    {barang.gambar_utama ? (
                                        <img
                                            src={`/storage/${barang.gambar_utama}`}
                                            alt={barang.nama_barang}
                                            className="w-full h-64 object-cover rounded-lg shadow-md"
                                        />
                                    ) : (
                                        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-400">
                                                Tidak ada gambar
                                            </span>
                                        </div>
                                    )}
                                    <p className="text-sm text-gray-500 mt-2">
                                        Foto Barang
                                    </p>
                                </div>
                            </div>

                            {/* Info Barang */}
                            <div className="md:col-span-2">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Kode Barang
                                        </p>
                                        <p className="font-mono font-medium text-gray-800">
                                            {barang.kode_barang}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Nama Barang
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {barang.nama_barang}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Kategori
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {barang.kategori?.nama_kategori ||
                                                "-"}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Ukuran
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {barang.ukuran || "-"}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Warna
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {barang.warna || "-"}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Harga Sewa
                                        </p>
                                        <p className="font-bold text-[#C5A059]">
                                            Rp{" "}
                                            {parseInt(
                                                barang.harga_sewa,
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Stok
                                        </p>
                                        <p className="font-medium text-gray-800">
                                            {barang.stok} pcs
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Status
                                        </p>
                                        {getStatusBadge(barang.status)}
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 col-span-2">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Deskripsi
                                        </p>
                                        <p className="text-gray-700">
                                            {barang.deskripsi ||
                                                "Tidak ada deskripsi"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
