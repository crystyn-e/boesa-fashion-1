import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";

// Fungsi format Rupiah
const formatRupiah = (angka) => {
    if (angka === null || angka === undefined || isNaN(angka)) {
        return "Rp0";
    }
    const number = typeof angka === "string" ? parseInt(angka) : angka;
    return "Rp" + number.toLocaleString("id-ID");
};

// Fungsi format angka biasa (tanpa Rp)
const formatAngka = (angka) => {
    if (angka === null || angka === undefined || isNaN(angka)) {
        return "0";
    }
    const number = typeof angka === "string" ? parseInt(angka) : angka;
    return number.toLocaleString("id-ID");
};

export default function LaporanIndex({ stats }) {
    const menus = [
        {
            title: "Laporan Transaksi",
            desc: "Lihat dan export data transaksi",
            href: "/admin/laporan/transaksi",
            color: "blue",
        },
        {
            title: "Laporan Barang",
            desc: "Statistik koleksi barang",
            href: "/admin/laporan/barang",
            color: "purple",
        },
    ];

    return (
        <AdminLayout title="Laporan">
            <div className="p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    Laporan
                </h1>
                <p className="text-gray-500 mb-6">
                    Pilih jenis laporan yang ingin Anda lihat
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {/* Total Transaksi Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 text-center">
                        <p className="text-gray-500 text-sm">Total Transaksi</p>
                        <p className="text-2xl font-bold text-gray-800">
                            {formatAngka(stats?.totalTransaksi ?? 0)}
                        </p>
                    </div>

                    {/* Total Pendapatan Card - FORMAT RUPIAH */}
                    <div className="bg-[#0A192F] rounded-lg shadow-sm p-5 text-center text-white">
                        <p className="text-sm opacity-80">Total Pendapatan</p>
                        <p className="text-2xl font-bold">
                            {formatRupiah(stats?.totalPendapatan ?? 0)}
                        </p>
                    </div>

                    {/* Barang Terpopuler Card */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 text-center">
                        <p className="text-gray-500 text-sm">
                            Barang Terpopuler
                        </p>
                        <p className="text-2xl font-bold text-[#C5A059]">
                            {stats?.barangTerpopuler || "-"}
                        </p>
                        {stats?.barangTerpopulerKategori && (
                            <p className="text-xs text-gray-400 mt-1">
                                {stats.barangTerpopulerKategori}
                            </p>
                        )}
                    </div>
                </div>

                {/* Menu Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {menus.map((menu, i) => (
                        <Link
                            key={i}
                            href={menu.href}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 group"
                        >
                            <div
                                className={`w-12 h-12 rounded-lg bg-${menu.color}-100 flex items-center justify-center mb-4`}
                            >
                                <div
                                    className={`w-6 h-6 rounded-full bg-${menu.color}-500`}
                                ></div>
                            </div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                {menu.title}
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                {menu.desc}
                            </p>
                            <div className="mt-4 text-[#C5A059] text-sm font-medium group-hover:translate-x-1 transition-transform">
                                Lihat Detail →
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
