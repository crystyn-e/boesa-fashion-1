import PelayanLayout from "@/Layouts/PelayanLayout";
import { Link, router } from "@inertiajs/react";
import { useRef } from "react";
import {
    ArrowLeftIcon,
    PrinterIcon,
    CheckCircleIcon,
    XCircleIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function TransaksiShow({ transaksi, auth }) {
    const printRef = useRef();

    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const formatDateTime = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat("id-ID").format(angka || 0);
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

    const handlePrint = () => {
        const printContent = printRef.current.innerHTML;
        const originalContent = document.body.innerHTML;

        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
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
                                Dibuat pada{" "}
                                {formatDateTime(transaksi.created_at)}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            {getStatusBadge(transaksi.status)}
                            <button
                                onClick={handlePrint}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                            >
                                <PrinterIcon className="w-4 h-4 mr-2" />
                                Cetak Bon
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
                                    Rp {formatRupiah(transaksi.total_harga)}
                                </p>
                            </div>
                            <div className="flex justify-between text-[#C5A059]">
                                <p className="text-sm">DP</p>
                                <p className="font-bold">
                                    Rp {formatRupiah(transaksi.dp)}
                                </p>
                            </div>
                            <div className="flex justify-between border-t border-gray-200 pt-2">
                                <p className="text-sm text-gray-500">Sisa</p>
                                <p className="font-bold">
                                    Rp {formatRupiah(transaksi.sisa_pembayaran)}
                                </p>
                            </div>
                            {transaksi.denda > 0 && (
                                <div className="flex justify-between text-red-600">
                                    <p className="text-sm">Denda</p>
                                    <p className="font-bold">
                                        Rp {formatRupiah(transaksi.denda)}
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
                                                {formatRupiah(
                                                    detail.harga_sewa,
                                                )}
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

                {/* Tombol Aksi */}
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

                {/* ========== BON SEWA BOESA FASHION (Untuk Print) ========== */}
                <div ref={printRef} className="hidden">
                    <div
                        className="bon-container"
                        style={{
                            width: "80mm",
                            margin: "0 auto",
                            padding: "8px",
                            fontFamily:
                                "'Courier New', 'Lucida Console', monospace",
                            fontSize: "11px",
                            lineHeight: "1.3",
                            color: "#000",
                            backgroundColor: "#fff",
                        }}
                    >
                        {/* Header Bon */}
                        <div
                            className="text-center"
                            style={{
                                borderBottom: "2px dashed #000",
                                paddingBottom: "8px",
                                marginBottom: "8px",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    margin: "0 0 4px 0",
                                }}
                            >
                                BOESA FASHION
                            </h2>
                            <p style={{ fontSize: "9px", margin: "2px 0" }}>
                                Jl. Jend. D.I Panjaitan No.39, Babura
                            </p>
                            <p style={{ fontSize: "9px", margin: "2px 0" }}>
                                Kec. Medan Baru, Kota Medan
                            </p>
                            <p style={{ fontSize: "9px", margin: "2px 0" }}>
                                Sumatera Utara 20152
                            </p>
                            <p style={{ fontSize: "9px", margin: "2px 0" }}>
                                Telp: +62 822-7650-4245
                            </p>
                            <div
                                style={{
                                    borderTop: "1px dashed #000",
                                    marginTop: "6px",
                                    paddingTop: "4px",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                        margin: "0",
                                    }}
                                >
                                    BUKTI SEWA
                                </p>
                            </div>
                        </div>

                        {/* Info Transaksi */}
                        <div
                            style={{
                                marginBottom: "8px",
                                borderBottom: "1px dotted #000",
                                paddingBottom: "6px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>No. Transaksi:</span>
                                <span style={{ fontWeight: "bold" }}>
                                    {transaksi.kode_transaksi}
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>Tanggal:</span>
                                <span>
                                    {formatDateTime(transaksi.created_at)}
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>Status:</span>
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {transaksi.status}
                                </span>
                            </div>
                        </div>

                        {/* Data Pelanggan */}
                        <div
                            style={{
                                marginBottom: "8px",
                                borderBottom: "1px dotted #000",
                                paddingBottom: "6px",
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: "bold",
                                    margin: "0 0 4px 0",
                                }}
                            >
                                DATA PELANGGAN
                            </p>
                            <div>Nama: {transaksi.pelanggan.nama}</div>
                            <div>
                                Telepon: {transaksi.pelanggan.no_telepon || "-"}
                            </div>
                            <div>
                                Alamat: {transaksi.pelanggan.alamat || "-"}
                            </div>
                            {transaksi.deposit_tipe === "ktp" && (
                                <div>No. KTP: {transaksi.deposit_ktp}</div>
                            )}
                        </div>

                        {/* Info Sewa */}
                        <div
                            style={{
                                marginBottom: "8px",
                                borderBottom: "1px dotted #000",
                                paddingBottom: "6px",
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: "bold",
                                    margin: "0 0 4px 0",
                                }}
                            >
                                INFO SEWA
                            </p>
                            <div>
                                Tgl Ambil: {formatDate(transaksi.tgl_sewa)}
                            </div>
                            <div>
                                Tgl Kembali:{" "}
                                {formatDate(transaksi.tgl_harus_kembali)}
                            </div>
                            <div>
                                Deposit:{" "}
                                {transaksi.deposit_tipe === "uang"
                                    ? "UANG"
                                    : "KTP"}
                            </div>
                        </div>

                        {/* Detail Barang */}
                        <div
                            style={{
                                marginBottom: "8px",
                                borderBottom: "1px dotted #000",
                                paddingBottom: "6px",
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: "bold",
                                    margin: "0 0 4px 0",
                                }}
                            >
                                DETAIL BARANG
                            </p>
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                }}
                            >
                                <thead>
                                    <tr
                                        style={{
                                            borderBottom: "1px dotted #000",
                                        }}
                                    >
                                        <th
                                            style={{
                                                textAlign: "left",
                                                padding: "2px 0",
                                            }}
                                        >
                                            Item
                                        </th>
                                        <th
                                            style={{
                                                textAlign: "right",
                                                padding: "2px 0",
                                            }}
                                        >
                                            Harga
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transaksi.detail_transaksis.map(
                                        (detail, idx) => (
                                            <tr key={idx}>
                                                <td
                                                    style={{ padding: "2px 0" }}
                                                >
                                                    {detail.barang.nama_barang}
                                                </td>
                                                <td
                                                    style={{
                                                        textAlign: "right",
                                                        padding: "2px 0",
                                                    }}
                                                >
                                                    Rp{" "}
                                                    {formatRupiah(
                                                        detail.harga_sewa,
                                                    )}
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pembayaran */}
                        <div
                            style={{
                                marginBottom: "8px",
                                borderBottom: "1px dotted #000",
                                paddingBottom: "6px",
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: "bold",
                                    margin: "0 0 4px 0",
                                }}
                            >
                                PEMBAYARAN
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>Total Sewa:</span>
                                <span>
                                    Rp {formatRupiah(transaksi.total_harga)}
                                </span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>DP (Uang Muka):</span>
                                <span>Rp {formatRupiah(transaksi.dp)}</span>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderTop: "1px dotted #000",
                                    marginTop: "4px",
                                    paddingTop: "4px",
                                }}
                            >
                                <span style={{ fontWeight: "bold" }}>
                                    Sisa Pembayaran:
                                </span>
                                <span style={{ fontWeight: "bold" }}>
                                    Rp {formatRupiah(transaksi.sisa_pembayaran)}
                                </span>
                            </div>
                            {transaksi.denda > 0 && (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        color: "red",
                                    }}
                                >
                                    <span>Denda:</span>
                                    <span>
                                        Rp {formatRupiah(transaksi.denda)}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* DILAYANI OLEH */}
                        <div
                            style={{
                                marginBottom: "8px",
                                borderBottom: "1px dotted #000",
                                paddingBottom: "6px",
                            }}
                        >
                            <p
                                style={{
                                    fontWeight: "bold",
                                    margin: "0 0 4px 0",
                                }}
                            >
                                DILAYANI OLEH
                            </p>
                            <div>Nama: {auth?.user?.nama_lengkap || "-"}</div>
                            <div>ID Staff: {auth?.user?.username || "-"}</div>
                        </div>

                        {/* Footer */}
                        <div
                            className="text-center"
                            style={{ marginTop: "8px", paddingTop: "6px" }}
                        >
                            <p style={{ fontSize: "9px", margin: "2px 0" }}>
                                Terima kasih atas kepercayaan Anda
                            </p>
                            <p style={{ fontSize: "9px", margin: "2px 0" }}>
                                Barang yang sudah disewa tidak dapat
                                dikembalikan
                            </p>
                            <p style={{ fontSize: "9px", margin: "2px 0" }}>
                                dan DP tidak dapat ditarik kembali.
                            </p>
                            <div
                                style={{
                                    borderTop: "2px dashed #000",
                                    marginTop: "8px",
                                    paddingTop: "6px",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "10px",
                                        fontWeight: "bold",
                                        margin: "0",
                                    }}
                                >
                                    STUDIO BOESA FASHION
                                </p>
                                <p
                                    style={{
                                        fontSize: "9px",
                                        margin: "2px 0 0 0",
                                    }}
                                >
                                    Fashion Sewa Premium
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PelayanLayout>
    );
}
