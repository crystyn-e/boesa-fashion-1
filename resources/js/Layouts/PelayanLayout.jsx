import { Link } from "@inertiajs/react";
import { useState } from "react";
import {
    HomeIcon,
    ShoppingCartIcon,
    ArrowPathIcon,
    UserGroupIcon,
    CubeIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

export default function PelayanLayout({ children, title }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navigation = [
        { name: "Dashboard", href: "/pelayan/dashboard", icon: HomeIcon },
        {
            name: "Transaksi Baru",
            href: "/pelayan/transaksi/create",
            icon: ShoppingCartIcon,
        },
        { name: "Daftar Sewa", href: "/pelayan/transaksi", icon: CubeIcon },
        {
            name: "Pengembalian",
            href: "/pelayan/pengembalian",
            icon: ArrowPathIcon,
        },
        {
            name: "Data Pelanggan",
            href: "/pelayan/pelanggan",
            icon: UserGroupIcon,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar untuk desktop */}
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                <div className="flex flex-col flex-1 min-h-0 bg-[#0A192F]">
                    <div className="flex items-center h-16 px-4 bg-[#0A192F] border-b border-[#C5A059]/20">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] rounded-lg flex items-center justify-center">
                                <span className="text-[#0A192F] font-bold">
                                    BF
                                </span>
                            </div>
                            <span className="text-white font-bold text-lg">
                                BOESA STAF
                            </span>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <nav className="flex-1 px-2 space-y-1">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="group flex items-center px-4 py-3 text-sm font-medium rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                                    >
                                        <Icon className="mr-3 h-5 w-5 text-[#C5A059]" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                        <div className="px-2 mt-auto pt-4 border-t border-[#C5A059]/20">
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="group flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                            >
                                <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-[#C5A059]" />
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <div className="flex items-center justify-between h-16 px-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] rounded-lg flex items-center justify-center">
                            <span className="text-[#0A192F] font-bold">BF</span>
                        </div>
                        <span className="font-bold text-[#0A192F]">
                            BOESA STAF
                        </span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 text-gray-600 hover:text-[#C5A059] rounded-lg hover:bg-gray-100"
                    >
                        {isSidebarOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile sidebar */}
            {isSidebarOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-[#0A192F] pt-16">
                    <nav className="px-4 py-4 space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center px-4 py-3 text-sm font-medium rounded-lg text-white/80 hover:text-white hover:bg-white/10"
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <Icon className="mr-3 h-5 w-5 text-[#C5A059]" />
                                    {item.name}
                                </Link>
                            );
                        })}
                        <div className="pt-4 mt-4 border-t border-[#C5A059]/20">
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-white/80 hover:text-white hover:bg-white/10"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-[#C5A059]" />
                                Logout
                            </Link>
                        </div>
                    </nav>
                </div>
            )}

            {/* Main content */}
            <div className="md:pl-64">
                <div className="py-6">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {title}
                        </h1>
                    </div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
