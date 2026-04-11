import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";

export default function LaporanIndex() {
    const menus = [
        {
            title: "Laporan Transaksi",
            desc: "Lihat semua transaksi",
            href: "/admin/laporan/transaksi",
            color: "blue",
        },
        {
            title: "Laporan Barang",
            desc: "Lihat semua barang",
            href: "/admin/laporan/barang",
            color: "purple",
        },
    ];

    return (
        <AdminLayout title="Laporan">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Laporan
                </h1>
                <p className="text-gray-500 mb-6">
                    Pilih jenis laporan yang ingin Anda lihat
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {menus.map((menu, i) => (
                        <Link
                            key={i}
                            href={menu.href}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border border-gray-100"
                        >
                            <div
                                className={`w-12 h-12 rounded-lg bg-${menu.color}-100 flex items-center justify-center mb-4`}
                            >
                                <div
                                    className={`w-6 h-6 rounded-full bg-${menu.color}-500`}
                                ></div>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                {menu.title}
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                {menu.desc}
                            </p>
                            <div className="mt-4 text-[#C5A059] text-sm">
                                Lihat Detail →
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
