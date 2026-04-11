import PelayanLayout from "@/Layouts/PelayanLayout";
import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    ArrowLeftIcon,
    CheckCircleIcon,
    XCircleIcon,
    CurrencyDollarIcon,
    IdentificationIcon,
} from "@heroicons/react/24/outline";

export default function PengembalianShow({ transaksi }) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [notes, setNotes] = useState({});
    const [processing, setProcessing] = useState(false);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    // Hitung keterlambatan
    const hariIni = new Date();
    const tglHarusKembali = new Date(transaksi.tgl_harus_kembali);
    const selisihHari = Math.ceil(
        (hariIni - tglHarusKembali) / (1000 * 60 * 60 * 24),
    );
    const hariTerlambat = selisihHari > 0 ? selisihHari : 0;
    const denda = hariTerlambat * 50000;

    // Toggle pilih barang
    const toggleItem = (detailId) => {
        if (selectedItems.includes(detailId)) {
            setSelectedItems(selectedItems.filter((id) => id !== detailId));
        } else {
            setSelectedItems([...selectedItems, detailId]);
        }
    };

    // Pilih semua barang
    const selectAll = () => {
        if (selectedItems.length === transaksi.detail_transaksis.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(transaksi.detail_transaksis.map((d) => d.id));
        }
    };

    // Proses pengembalian
    const prosesPengembalian = () => {
        if (selectedItems.length === 0) {
            alert("Pilih minimal satu barang yang akan dikembalikan");
            return;
        }

        if (confirm("Yakin ingin memproses pengembalian barang ini?")) {
            setProcessing(true);
            router.post(
                `/pelayan/pengembalian/${transaksi.id}/proses`,
                {
                    detail_ids: selectedItems,
                    kondisi: notes,
                },
                {
                    onFinish: () => setProcessing(false),
                    onError: (errors) => {
                        console.error(errors);
                        alert("Terjadi kesalahan: " + JSON.stringify(errors));
                    },
                },
            );
        }
    };

    // Kembalikan semua
    const kembalikanSemua = () => {
        if (confirm("Yakin ingin mengembalikan semua barang?")) {
            setProcessing(true);
            router.post(
                `/pelayan/pengembalian/${transaksi.id}/semua`,
                {},
                {
                    onFinish: () => setProcessing(false),
                },
            );
        }
    };

    return (
        <PelayanLayout title={`Pengembalian - ${transaksi.kode_transaksi}`}>
            <div className="py-6">
                {/* Back Button */}
                <Link
                    href="/pelayan/pengembalian"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-[#C5A059] mb-6"
                >
                    <ArrowLeftIcon className="w-4 h-4 mr-1" />
                    Kembali ke Daftar Pengembalian
                </Link>

                {/* Info Transaksi */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                {transaksi.kode_transaksi}
                            </h2>
                            <p className="text-gray-600 mt-1">
                                Pelanggan:{" "}
                                {transaksi.pelanggan?.nama || "Walk-in"}
                            </p>
                            <p className="text-sm text-gray-500">
                                No. Telepon:{" "}
                                {transaksi.pelanggan?.no_telepon || "-"}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">
                                Tanggal Sewa
                            </p>
                            <p className="font-medium">
                                {formatDate(transaksi.tgl_sewa)}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Harus Kembali
                            </p>
                            <p
                                className={`font-medium ${
                                    hariTerlambat > 0 ? "text-red-600" : ""
                                }`}
                            >
                                {formatDate(transaksi.tgl_harus_kembali)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Info Denda */}
                {denda > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <CurrencyDollarIcon className="w-5 h-5 text-red-600 mr-2" />
                                <span className="font-semibold text-red-800">
                                    Denda Keterlambatan
                                </span>
                            </div>
                            <div>
                                <span className="text-red-600 font-bold text-xl">
                                    Rp {denda.toLocaleString()}
                                </span>
                                <span className="text-red-600 text-sm ml-2">
                                    ({hariTerlambat} hari)
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Info Deposit */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center">
                        {transaksi.deposit_tipe === "uang" ? (
                            <CurrencyDollarIcon className="w-5 h-5 text-blue-600 mr-2" />
                        ) : (
                            <IdentificationIcon className="w-5 h-5 text-blue-600 mr-2" />
                        )}
                        <span className="font-semibold text-blue-800">
                            Deposit{" "}
                            {transaksi.deposit_tipe === "uang" ? "Uang" : "KTP"}
                            {transaksi.deposit_tipe === "ktp" &&
                                `: ${transaksi.deposit_ktp}`}
                        </span>
                        <span className="ml-auto text-blue-600 text-sm">
                            Akan dikembalikan setelah semua barang dikembalikan
                        </span>
                    </div>
                </div>

                {/* Daftar Barang */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Daftar Barang
                        </h3>
                        <button
                            onClick={selectAll}
                            className="text-sm text-[#C5A059] hover:text-[#D4AF37] font-medium"
                            disabled={processing}
                        >
                            {selectedItems.length ===
                            transaksi.detail_transaksis.length
                                ? "Batal Pilih Semua"
                                : "Pilih Semua"}
                        </button>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {transaksi.detail_transaksis.map((detail) => (
                            <div
                                key={detail.id}
                                className="p-4 hover:bg-gray-50"
                            >
                                <div className="flex items-start space-x-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(
                                            detail.id,
                                        )}
                                        onChange={() => toggleItem(detail.id)}
                                        className="mt-1 h-4 w-4 text-[#C5A059] focus:ring-[#C5A059] border-gray-300 rounded"
                                        disabled={processing}
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-semibold text-gray-900">
                                                {detail.barang.nama_barang}
                                            </h4>
                                            <span className="text-sm font-bold text-[#C5A059]">
                                                Rp{" "}
                                                {parseInt(
                                                    detail.harga_sewa,
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {detail.barang.kategori || "-"} |{" "}
                                            {detail.barang.ukuran || "-"}
                                        </p>

                                        {selectedItems.includes(detail.id) && (
                                            <div className="mt-2">
                                                <textarea
                                                    placeholder="Catatan kondisi barang (opsional)..."
                                                    value={
                                                        notes[detail.id] || ""
                                                    }
                                                    onChange={(e) =>
                                                        setNotes({
                                                            ...notes,
                                                            [detail.id]:
                                                                e.target.value,
                                                        })
                                                    }
                                                    className="w-full text-sm p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                                                    rows="2"
                                                    disabled={processing}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tombol Aksi */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
                    {selectedItems.length > 0 && (
                        <button
                            onClick={prosesPengembalian}
                            disabled={processing}
                            className="px-6 py-3 bg-[#C5A059] text-[#0A192F] rounded-lg font-medium hover:bg-[#D4AF37] transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <CheckCircleIcon className="w-5 h-5 mr-2" />
                            {processing
                                ? "Memproses..."
                                : `Proses Pengembalian (${selectedItems.length} barang)`}
                        </button>
                    )}

                    <button
                        onClick={kembalikanSemua}
                        disabled={processing}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <CheckCircleIcon className="w-5 h-5 mr-2" />
                        {processing
                            ? "Memproses..."
                            : "Kembalikan Semua Barang"}
                    </button>
                </div>
            </div>
        </PelayanLayout>
    );
}
