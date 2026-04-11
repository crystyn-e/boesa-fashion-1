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
} from "@heroicons/react/24/outline";

export default function Dashboard({ stats }) {
    // Data statistik dengan format yang benar
    const statCards = [
        {
            name: "Total Staf",
            value: stats?.totalStaf || 0,
            icon: UsersIcon,
            change: "+2",
            changeType: "increase",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
        },
        {
            name: "Total Barang",
            value: stats?.totalBarang || 0,
            icon: CubeIcon,
            change: "+12",
            changeType: "increase",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
        },
        {
            name: "Tersedia",
            value: stats?.tersedia || 0,
            icon: TagIcon,
            change: "+5",
            changeType: "increase",
            bgColor: "bg-emerald-50",
            iconColor: "text-emerald-600",
        },
        {
            name: "Disewa",
            value: stats?.disewa || 0,
            icon: ClockIcon,
            change: "-2",
            changeType: "decrease",
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600",
        },
        {
            name: "Transaksi Hari Ini",
            value: stats?.transaksiHariIni || 0,
            icon: ShoppingCartIcon,
            change: "+3",
            changeType: "increase",
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
        },
        {
            name: "Transaksi Bulan Ini",
            value: stats?.transaksiBulanIni || 0,
            icon: CalendarIcon,
            change: "+15%",
            changeType: "increase",
            bgColor: "bg-indigo-50",
            iconColor: "text-indigo-600",
        },
    ];

    // Data transaksi terbaru (dari props atau dummy)
    const recentTransactions = stats?.recentTransactions || [
        {
            id: 1,
            kode: "TRX-001",
            pelanggan: "Budi Santoso",
            total: 350000,
            status: "selesai",
        },
        {
            id: 2,
            kode: "TRX-002",
            pelanggan: "Siti Aminah",
            total: 275000,
            status: "sewa",
        },
        {
            id: 3,
            kode: "TRX-003",
            pelanggan: "Ahmad Fauzi",
            total: 425000,
            status: "sewa",
        },
        {
            id: 4,
            kode: "TRX-004",
            pelanggan: "Dewi Lestari",
            total: 180000,
            status: "proses",
        },
        {
            id: 5,
            kode: "TRX-005",
            pelanggan: "Rizki Pratama",
            total: 520000,
            status: "selesai",
        },
    ];

    // Data staf terbaru
    const recentStaff = stats?.stafTerbaru || [
        {
            id: 1,
            nama: "Andini Putri",
            username: "andini",
            email: "andini@boesa.com",
        },
        {
            id: 2,
            nama: "Budi Santoso",
            username: "budi",
            email: "budi@boesa.com",
        },
        {
            id: 3,
            nama: "Citra Dewi",
            username: "citra",
            email: "citra@boesa.com",
        },
    ];

    return (
        <AdminLayout title="Dashboard Admin">
            <div className="py-6">
                {/* Welcome Section */}
                <div className="mb-8 bg-gradient-to-r from-[#0A192F] to-[#1E2F4A] rounded-2xl p-6 text-white shadow-xl">
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
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
                    {statCards.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <div
                                        className={`p-3 ${item.bgColor} rounded-lg`}
                                    >
                                        <item.icon
                                            className={`h-6 w-6 ${item.iconColor}`}
                                        />
                                    </div>
                                    <span
                                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                            item.changeType === "increase"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {item.change}
                                    </span>
                                </div>
                                <h3 className="text-sm font-medium text-gray-500 truncate">
                                    {item.name}
                                </h3>
                                <p className="mt-1 text-2xl font-semibold text-gray-900">
                                    {item.value.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pendapatan Card */}
                <div className="mb-8 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] rounded-2xl p-6 text-[#0A192F] shadow-xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium opacity-90">
                                Pendapatan Bulan Ini
                            </p>
                            <p className="text-3xl font-bold mt-1">
                                Rp{" "}
                                {(
                                    stats?.pendapatanBulanIni || 12500000
                                ).toLocaleString()}
                            </p>
                            <p className="text-sm mt-2 opacity-80">
                                <ArrowTrendingUpIcon className="inline h-4 w-4 mr-1" />
                                +8% dari bulan lalu
                            </p>
                        </div>
                        <div className="p-4 bg-white/20 rounded-full">
                            <CurrencyDollarIcon className="h-8 w-8" />
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Recent Transactions */}
                    <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Transaksi Terbaru
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {recentTransactions.map((transaction) => (
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
                                                Rp{" "}
                                                {transaction.total.toLocaleString()}
                                            </p>
                                            <span
                                                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                                                    transaction.status ===
                                                    "selesai"
                                                        ? "bg-green-100 text-green-800"
                                                        : transaction.status ===
                                                            "sewa"
                                                          ? "bg-blue-100 text-blue-800"
                                                          : "bg-yellow-100 text-yellow-800"
                                                }`}
                                            >
                                                {transaction.status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                    <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Staf Terbaru
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {recentStaff.map((staff) => (
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
                            ))}
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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

// Import untuk ikon DocumentTextIcon
import { DocumentTextIcon } from "@heroicons/react/24/outline";
