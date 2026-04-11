import PelayanLayout from "@/Layouts/PelayanLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import {
    MagnifyingGlassIcon,
    ArrowPathIcon,
    ClockIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function PengembalianIndex({ sewaAktif }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSewa = sewaAktif.filter(
        (item) =>
            item.kode_transaksi
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            item.pelanggan.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <PelayanLayout title="Pengembalian Barang">
            <div className="py-6">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Pengembalian Barang
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Proses pengembalian barang yang sedang disewa
                    </p>
                </div>

                {/* Info Box */}
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                        <ClockIcon className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                        <div>
                            <h4 className="text-sm font-semibold text-blue-800">
                                Ketentuan Pengembalian
                            </h4>
                            <p className="text-sm text-blue-700 mt-1">
                                • Denda keterlambatan Rp 50.000 per hari •
                                Deposit akan dikembalikan setelah semua barang
                                dikembalikan
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative">
                        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari berdasarkan kode transaksi atau nama pelanggan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Daftar Transaksi Aktif */}
                <div className="space-y-4">
                    {filteredSewa.map((sewa) => (
                        <div
                            key={sewa.id}
                            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all"
                        >
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-bold text-[#C5A059]">
                                            {sewa.kode_transaksi}
                                        </h3>
                                        {sewa.hari_terlambat > 0 ? (
                                            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium flex items-center">
                                                <ExclamationTriangleIcon className="w-3 h-3 mr-1" />
                                                Terlambat {sewa.hari_terlambat}{" "}
                                                hari
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium flex items-center">
                                                <CheckCircleIcon className="w-3 h-3 mr-1" />
                                                Tepat Waktu
                                            </span>
                                        )}
                                        {sewa.semua_kembali && (
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                Sudah Kembali
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-gray-700 font-medium mb-2">
                                        {sewa.pelanggan}
                                    </p>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Tanggal Sewa
                                            </p>
                                            <p className="text-sm font-medium">
                                                {sewa.tgl_sewa}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Harus Kembali
                                            </p>
                                            <p
                                                className={`text-sm font-medium ${sewa.hari_terlambat > 0 ? "text-red-600" : ""}`}
                                            >
                                                {sewa.tgl_harus_kembali}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Total
                                            </p>
                                            <p className="text-sm font-medium">
                                                Rp{" "}
                                                {sewa.total_harga.toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Denda
                                            </p>
                                            <p className="text-sm font-bold text-red-600">
                                                Rp {sewa.denda.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress Barang */}
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-500 mb-1">
                                            Status Barang:{" "}
                                            {
                                                sewa.barang.filter(
                                                    (b) =>
                                                        b.status_kembali ===
                                                        "sudah",
                                                ).length
                                            }
                                            /{sewa.jumlah_barang} kembali
                                        </p>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-[#C5A059] h-2 rounded-full"
                                                style={{
                                                    width: `${(sewa.barang.filter((b) => b.status_kembali === "sudah").length / sewa.jumlah_barang) * 100}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 md:mt-0 md:ml-6">
                                    <Link
                                        href={`/pelayan/pengembalian/${sewa.id}`}
                                        className="inline-flex items-center px-4 py-2 bg-[#C5A059] text-[#0A192F] rounded-lg font-medium hover:bg-[#D4AF37] transition-colors"
                                    >
                                        <ArrowPathIcon className="w-4 h-4 mr-2" />
                                        Proses Pengembalian
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredSewa.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-200">
                            <ArrowPathIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500">
                                Tidak ada transaksi yang sedang berlangsung
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </PelayanLayout>
    );
}
