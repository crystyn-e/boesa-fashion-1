import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import {
    UsersIcon,
    CubeIcon,
    TagIcon,
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
    ClockIcon,
    CalendarIcon,
    ShoppingCartIcon,
    DocumentTextIcon,
    EnvelopeIcon,
} from "@heroicons/react/24/outline";

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

export default function Dashboard({ stats }) {
    // Data statistik dengan format yang benar
    const statCards = [
        {
            name: "Total Staf",
            value: stats?.totalStaf ?? 0,
            icon: UsersIcon,
            change: stats?.totalStafChange ?? null,
            changeType: "increase",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            link: "/admin/users",
        },
        {
            name: "Pesan Masuk",
            value: stats?.totalPesanMasuk ?? 0,
            icon: EnvelopeIcon,
            change: stats?.pesanMasukChange ?? null,
            changeType: stats?.pesanMasukChange?.startsWith("-")
                ? "decrease"
                : "increase",
            bgColor: "bg-rose-50",
            iconColor: "text-rose-600",
            link: "/admin/contacts",
            badge: stats?.pesanBelumDibaca > 0 ? stats.pesanBelumDibaca : null,
        },
        {
            name: "Total Barang",
            value: stats?.totalBarang ?? 0,
            icon: CubeIcon,
            change: stats?.totalBarangChange ?? null,
            changeType: "increase",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            link: "/admin/barang",
        },
        {
            name: "Tersedia",
            value: stats?.tersedia ?? 0,
            icon: TagIcon,
            change: stats?.tersediaChange ?? null,
            changeType: "increase",
            bgColor: "bg-emerald-50",
            iconColor: "text-emerald-600",
            link: "/admin/barang?status=tersedia",
        },
        {
            name: "Disewa",
            value: stats?.disewa ?? 0,
            icon: ClockIcon,
            change: stats?.disewaChange ?? null,
            changeType: stats?.disewaChange?.startsWith("-")
                ? "decrease"
                : "increase",
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600",
            link: "/admin/barang?status=disewa",
        },
        {
            name: "Transaksi Hari Ini",
            value: stats?.transaksiHariIni ?? 0,
            icon: ShoppingCartIcon,
            change: stats?.transaksiHariIniChange ?? null,
            changeType: "increase",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
            link: "/admin/laporan/transaksi",
        },
        {
            name: "Transaksi Bulan Ini",
            value: stats?.transaksiBulanIni ?? 0,
            icon: CalendarIcon,
            change: stats?.transaksiBulanIniChange ?? null,
            changeType: "increase",
            bgColor: "bg-indigo-50",
            iconColor: "text-indigo-600",
            link: "/admin/laporan/transaksi",
        },
    ];

    // Data transaksi terbaru - dari props
    const recentTransactions = stats?.recentTransactions ?? [];

    // Data staf terbaru - dari props
    const recentStaff = stats?.stafTerbaru ?? [];

    // Komponen untuk card (agar bisa diklik)
    const StatCard = ({ item }) => {
        const CardContent = (
            <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                    <div className={`p-3 ${item.bgColor} rounded-lg relative`}>
                        <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                        {item.badge && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {item.badge}
                            </span>
                        )}
                    </div>
                    {item.change && (
                        <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                item.changeType === "increase"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {item.change}
                        </span>
                    )}
                </div>
                <h3 className="text-sm font-medium text-gray-500 truncate">
                    {item.name}
                </h3>
                <p className="mt-1 text-2xl font-semibold text-gray-900">
                    {formatAngka(item.value)}
                </p>
            </div>
        );

        if (item.link) {
            return (
                <Link href={item.link} className="block">
                    <div className="bg-white overflow-hidden shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-[#C5A059] cursor-pointer">
                        {CardContent}
                    </div>
                </Link>
            );
        }

        return (
            <div className="bg-white overflow-hidden shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                {CardContent}
            </div>
        );
    };

    return (
        <AdminLayout title="Dashboard Admin">
            <div className="py-6">
                {/* Welcome Section - Navy solid */}
                <div className="mb-8 bg-[#0A192F] rounded-2xl p-6 text-white shadow-md">
                    <h2 className="text-2xl font-bold mb-2">
                        Selamat Datang, Admin! 👋
                    </h2>
                    <p className="text-gray-300">
                        Kelola sistem Boesa Fashion dengan mudah melalui
                        dashboard ini. Pantau transaksi, kelola staf, dan lihat
                        laporan secara real-time.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
                    {statCards.map((item, index) => (
                        <StatCard key={index} item={item} />
                    ))}
                </div>

                {/* Pendapatan Card - format Rupiah */}
                <div className="mb-8 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] rounded-2xl p-6 text-white shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium opacity-90">
                                Pendapatan Bulan Ini
                            </p>
                            <p className="text-3xl font-bold mt-1">
                                {formatRupiah(stats?.pendapatanBulanIni ?? 0)}
                            </p>
                            {stats?.pendapatanBulanIniChange && (
                                <p className="text-sm mt-2 opacity-80">
                                    <ArrowTrendingUpIcon className="inline h-4 w-4 mr-1" />
                                    {stats.pendapatanBulanIniChange}
                                </p>
                            )}
                        </div>
                        <div className="p-4 bg-white/20 rounded-full">
                            <CurrencyDollarIcon className="h-8 w-8" />
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Recent Transactions */}
                    <div className="bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Transaksi Terbaru
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {recentTransactions.length > 0 ? (
                                recentTransactions.map((transaction) => (
                                    <div
                                        key={transaction.id}
                                        className="px-6 py-4 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-[#C5A059]">
                                                    {transaction.kode}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {transaction.pelanggan}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {formatRupiah(
                                                        transaction.total ?? 0,
                                                    )}
                                                </p>
                                                <span
                                                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                                                        transaction.status ===
                                                            "selesai" ||
                                                        transaction.status ===
                                                            "SELESAI"
                                                            ? "bg-green-100 text-green-800"
                                                            : transaction.status ===
                                                                    "sewa" ||
                                                                transaction.status ===
                                                                    "DISEWA" ||
                                                                transaction.status ===
                                                                    "Disew"
                                                              ? "bg-blue-100 text-blue-800"
                                                              : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                                >
                                                    {(
                                                        transaction.status || ""
                                                    ).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-8 text-center text-gray-500">
                                    Belum ada transaksi
                                </div>
                            )}
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <Link
                                href="/admin/laporan/transaksi"
                                className="text-sm font-medium text-[#C5A059] hover:text-[#D4AF37] transition-colors"
                            >
                                Lihat Semua Transaksi →
                            </Link>
                        </div>
                    </div>

                    {/* Recent Staff */}
                    <div className="bg-white shadow-md rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Staf Terbaru
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {recentStaff.length > 0 ? (
                                recentStaff.map((staff) => (
                                    <div
                                        key={staff.id}
                                        className="px-6 py-4 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {staff.nama}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    @{staff.username}
                                                </p>
                                            </div>
                                            <span className="text-xs text-gray-400">
                                                {staff.email}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-8 text-center text-gray-500">
                                    Belum ada staf
                                </div>
                            )}
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <Link
                                href="/admin/users"
                                className="text-sm font-medium text-[#C5A059] hover:text-[#D4AF37] transition-colors"
                            >
                                Kelola Semua Staf →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                    <Link
                        href="/admin/barang/create"
                        className="relative block w-full rounded-xl border-2 border-dashed border-gray-300 p-6 text-center hover:border-[#C5A059] transition-colors group bg-white shadow-sm hover:shadow-md"
                    >
                        <CubeIcon className="mx-auto h-8 w-8 text-gray-400 group-hover:text-[#C5A059]" />
                        <span className="mt-2 block text-sm font-semibold text-gray-900 group-hover:text-[#C5A059]">
                            Tambah Barang Baru
                        </span>
                    </Link>

                    <Link
                        href="/admin/users/create"
                        className="relative block w-full rounded-xl border-2 border-dashed border-gray-300 p-6 text-center hover:border-[#C5A059] transition-colors group bg-white shadow-sm hover:shadow-md"
                    >
                        <UsersIcon className="mx-auto h-8 w-8 text-gray-400 group-hover:text-[#C5A059]" />
                        <span className="mt-2 block text-sm font-semibold text-gray-900 group-hover:text-[#C5A059]">
                            Tambah Staf Baru
                        </span>
                    </Link>

                    <Link
                        href="/admin/contacts"
                        className="relative block w-full rounded-xl border-2 border-dashed border-gray-300 p-6 text-center hover:border-[#C5A059] transition-colors group bg-white shadow-sm hover:shadow-md"
                    >
                        <EnvelopeIcon className="mx-auto h-8 w-8 text-gray-400 group-hover:text-[#C5A059]" />
                        <span className="mt-2 block text-sm font-semibold text-gray-900 group-hover:text-[#C5A059]">
                            Lihat Pesan Masuk
                        </span>
                    </Link>

                    <Link
                        href="/admin/laporan"
                        className="relative block w-full rounded-xl border-2 border-dashed border-gray-300 p-6 text-center hover:border-[#C5A059] transition-colors group bg-white shadow-sm hover:shadow-md"
                    >
                        <DocumentTextIcon className="mx-auto h-8 w-8 text-gray-400 group-hover:text-[#C5A059]" />
                        <span className="mt-2 block text-sm font-semibold text-gray-900 group-hover:text-[#C5A059]">
                            Lihat Laporan
                        </span>
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
