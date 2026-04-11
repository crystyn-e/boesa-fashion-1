import PelayanLayout from "@/Layouts/PelayanLayout";
import { Link, router } from "@inertiajs/react";
import {
    ArrowLeftIcon,
    PrinterIcon,
    DocumentArrowDownIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function TransaksiShow({ transaksi }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "proses":
                return (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                        Proses (Menunggu Ambil)
                    </span>
                );
            case "sewa":
                return (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        Sedang Disewa
                    </span>
                );
            case "selesai":
                return (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        Selesai
                    </span>
                );
            case "batal":
                return (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                        Batal
                    </span>
                );
            default:
                return null;
        }
    };

    const handleBatalkan = () => {
        if (confirm("Yakin ingin membatalkan transaksi ini? DP akan hangus.")) {
            router.delete(`/pelayan/transaksi/${transaksi.id}/batal`);
        }
    };

    const handleAmbilBarang = () => {
        if (confirm("Konfirmasi bahwa barang sudah diambil pelanggan?")) {
            router.put(`/pelayan/transaksi/${transaksi.id}/ambil`);
        }
    };

    return (
        <PelayanLayout title={`Detail Transaksi - ${transaksi.kode_transaksi}`}>
            <div className="py-6">
                {/* Back Button */}
                <Link
                    href="/pelayan/transaksi"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-[#C5A059] mb-6"
                >
                    <ArrowLeftIcon className="w-4 h-4 mr-1" />
                    Kembali ke Daftar Sewa
                </Link>

                {/* Header Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {transaksi.kode_transaksi}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Dibuat pada {formatDate(transaksi.created_at)}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {getStatusBadge(transaksi.status)}
                            <button
                                onClick={() => window.print()}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                            >
                                <PrinterIcon className="w-4 h-4 mr-2" />
                                Cetak
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Info Pelanggan */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Informasi Pelanggan
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Nama</p>
                                <p className="font-medium">
                                    {transaksi.pelanggan.nama}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    No. Telepon
                                </p>
                                <p className="font-medium">
                                    {transaksi.pelanggan.no_telepon || "-"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Alamat</p>
                                <p className="font-medium">
                                    {transaksi.pelanggan.alamat || "-"}
                                </p>
                            </div>
                            {transaksi.deposit_tipe === "ktp" && (
                                <div>
                                    <p className="text-sm text-gray-500">
                                        No. KTP (Deposit)
                                    </p>
                                    <p className="font-medium">
                                        {transaksi.deposit_ktp}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Info Sewa */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Informasi Sewa
                        </h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Tanggal Sewa
                                </p>
                                <p className="font-medium">
                                    {formatDate(transaksi.tgl_sewa)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Tanggal Harus Kembali
                                </p>
                                <p className="font-medium">
                                    {formatDate(transaksi.tgl_harus_kembali)}
                                </p>
                            </div>
                            {transaksi.tgl_kembali && (
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Tanggal Kembali
                                    </p>
                                    <p className="font-medium">
                                        {formatDate(transaksi.tgl_kembali)}
                                    </p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-gray-500">Deposit</p>
                                <p className="font-medium capitalize">
                                    {transaksi.deposit_tipe === "uang"
                                        ? "Uang"
                                        : "KTP"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Info Pembayaran */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Informasi Pembayaran
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <p className="text-sm text-gray-500">
                                    Total Harga
                                </p>
                                <p className="font-bold">
                                    Rp{" "}
                                    {parseInt(
                                        transaksi.total_harga,
                                    ).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex justify-between text-[#C5A059]">
                                <p className="text-sm">DP</p>
                                <p className="font-bold">
                                    Rp {parseInt(transaksi.dp).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex justify-between border-t border-gray-200 pt-2">
                                <p className="text-sm text-gray-500">Sisa</p>
                                <p className="font-bold">
                                    Rp{" "}
                                    {parseInt(
                                        transaksi.sisa_pembayaran,
                                    ).toLocaleString()}
                                </p>
                            </div>
                            {transaksi.denda > 0 && (
                                <div className="flex justify-between text-red-600">
                                    <p className="text-sm">Denda</p>
                                    <p className="font-bold">
                                        Rp{" "}
                                        {parseInt(
                                            transaksi.denda,
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Daftar Barang */}
                <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Daftar Barang
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                        No
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                        Barang
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                        Kategori
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                        Ukuran
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                        Harga
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                        Status Kembali
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {transaksi.detail_transaksis.map(
                                    (detail, index) => (
                                        <tr key={detail.id}>
                                            <td className="px-4 py-2 text-sm text-gray-500">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-2 text-sm font-medium text-gray-900">
                                                {detail.barang.nama_barang}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-500">
                                                {detail.barang.kategori
                                                    ?.nama_kategori || "-"}
                                            </td>
                                            <td className="px-4 py-2 text-sm text-gray-500">
                                                {detail.barang.ukuran || "-"}
                                            </td>
                                            <td className="px-4 py-2 text-sm font-semibold text-[#C5A059]">
                                                Rp{" "}
                                                {parseInt(
                                                    detail.harga_sewa,
                                                ).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-2 text-sm">
                                                {detail.status_kembali ===
                                                "sudah" ? (
                                                    <span className="flex items-center text-green-600">
                                                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                                                        Sudah Kembali
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center text-yellow-600">
                                                        <XCircleIcon className="w-4 h-4 mr-1" />
                                                        Belum Kembali
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ),
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tombol Aksi Berdasarkan Status */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                    {transaksi.status === "proses" && (
                        <>
                            <button
                                onClick={handleAmbilBarang}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                            >
                                <CheckCircleIcon className="w-5 h-5 mr-2" />
                                Barang Sudah Diambil
                            </button>

                            <button
                                onClick={handleBatalkan}
                                className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                            >
                                <XCircleIcon className="w-5 h-5 mr-2" />
                                Batalkan Transaksi
                            </button>
                        </>
                    )}

                    {transaksi.status === "sewa" && (
                        <Link
                            href={`/pelayan/pengembalian/${transaksi.id}`}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                        >
                            <ArrowPathIcon className="w-5 h-5 mr-2" />
                            Proses Pengembalian
                        </Link>
                    )}

                    {transaksi.status === "selesai" && (
                        <div className="px-6 py-3 bg-green-100 text-green-800 rounded-lg font-medium flex items-center justify-center">
                            <CheckCircleIcon className="w-5 h-5 mr-2" />
                            Transaksi Selesai
                        </div>
                    )}

                    {transaksi.status === "batal" && (
                        <div className="px-6 py-3 bg-red-100 text-red-800 rounded-lg font-medium flex items-center justify-center">
                            <XCircleIcon className="w-5 h-5 mr-2" />
                            Transaksi Dibatalkan
                        </div>
                    )}
                </div>
            </div>
        </PelayanLayout>
    );
}
