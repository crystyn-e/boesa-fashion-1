import PelayanLayout from "@/Layouts/PelayanLayout";
import { Link } from "@inertiajs/react";
import {
    ShoppingCartIcon,
    ArrowPathIcon,
    CubeIcon,
    ClockIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard({ stats }) {
    const statCards = [
        {
            name: "Transaksi Hari Ini",
            value: stats?.transaksiHariIni || 0,
            icon: ShoppingCartIcon,
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
        },
        {
            name: "Pengembalian Hari Ini",
            value: stats?.pengembalianHariIni || 0,
            icon: ArrowPathIcon,
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
        },
        {
            name: "Barang Tersedia",
            value: stats?.barangTersedia || 0,
            icon: CubeIcon,
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
        },
        {
            name: "Barang Disewa",
            value: stats?.barangDisewa || 0,
            icon: ClockIcon,
            bgColor: "bg-orange-50",
            iconColor: "text-orange-600",
        },
    ];

    const recentTransactions = stats?.recentTransactions || [
        {
            id: 1,
            kode: "TRX-001",
            pelanggan: "Budi Santoso",
            total: 350000,
            status: "sewa",
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
            status: "proses",
        },
    ];

    const dueReturns = stats?.dueReturns || [
        {
            id: 1,
            kode: "TRX-001",
            pelanggan: "Budi Santoso",
            tglKembali: "2024-03-20",
            denda: 0,
        },
        {
            id: 2,
            kode: "TRX-002",
            pelanggan: "Siti Aminah",
            tglKembali: "2024-03-20",
            denda: 0,
        },
    ];

    return (
        <PelayanLayout title="Dashboard Pelayan">
            <div className="py-6">
                {/* Welcome Section */}
                <div className="mb-8 bg-gradient-to-r from-[#0A192F] to-[#1E2F4A] rounded-2xl p-6 text-white shadow-xl">
                    <h2 className="text-2xl font-bold mb-2">
                        Selamat Datang, Pelayan! 👋
                    </h2>
                    <p className="text-gray-300">
                        Layani pelanggan dengan cepat dan ramah. Pantau
                        transaksi dan pengembalian di sini.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
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
                                </div>
                                <h3 className="text-sm font-medium text-gray-500 truncate">
                                    {item.name}
                                </h3>
                                <p className="mt-1 text-2xl font-semibold text-gray-900">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Link
                        href="/pelayan/transaksi/create"
                        className="bg-gradient-to-r from-[#C5A059] to-[#D4AF37] rounded-xl p-6 text-[#0A192F] shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-2">
                                    Transaksi Baru
                                </h3>
                                <p className="text-sm opacity-90">
                                    Klik untuk melayani pelanggan baru
                                </p>
                            </div>
                            <ShoppingCartIcon className="w-12 h-12 opacity-80" />
                        </div>
                    </Link>

                    <Link
                        href="/pelayan/pengembalian"
                        className="bg-[#0A192F] rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold mb-2">
                                    Pengembalian
                                </h3>
                                <p className="text-sm text-gray-300">
                                    Proses pengembalian barang
                                </p>
                            </div>
                            <ArrowPathIcon className="w-12 h-12 opacity-80" />
                        </div>
                    </Link>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                                href="/pelayan/transaksi"
                                className="text-sm font-medium text-[#C5A059] hover:text-[#D4AF37] transition-colors"
                            >
                                Lihat Semua Transaksi →
                            </Link>
                        </div>
                    </div>

                    {/* Due Returns */}
                    <div className="bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Harus Kembali Hari Ini
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {dueReturns.map((item) => (
                                <div
                                    key={item.id}
                                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-[#C5A059]">
                                                {item.kode}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {item.pelanggan}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500">
                                                {item.tglKembali}
                                            </p>
                                            {item.denda > 0 && (
                                                <p className="text-xs text-red-600">
                                                    Denda: Rp {item.denda}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                            <Link
                                href="/pelayan/pengembalian"
                                className="text-sm font-medium text-[#C5A059] hover:text-[#D4AF37] transition-colors"
                            >
                                Proses Pengembalian →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Info Box */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                        <UserGroupIcon className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                        <div>
                            <h4 className="text-sm font-semibold text-blue-800">
                                Informasi Pelayanan
                            </h4>
                            <p className="text-sm text-blue-700 mt-1">
                                • Sewa maksimal 3 hari • DP minimal 50% •
                                Deposit bisa uang atau KTP
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PelayanLayout>
    );
}
