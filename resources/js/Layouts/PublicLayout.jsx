import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    Bars3Icon,
    XMarkIcon,
    ShoppingBagIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

export default function PublicLayout({ children }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navigation = [
        { name: "BERANDA", href: "/" },
        { name: "KOLEKSI", href: "/koleksi" },
        { name: "TENTANG", href: "/tentang" },
        { name: "KONTAK", href: "/kontak" },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar Putih */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
                    isScrolled
                        ? "bg-white/80 backdrop-blur-md shadow-lg py-3"
                        : "bg-white shadow-md py-5"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center space-x-3 group"
                        >
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#C5A059] to-[#D4AF37] rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-500">
                                    <span className="text-white font-black text-xl">
                                        BF
                                    </span>
                                </div>
                                <div className="absolute -inset-1 bg-[#C5A059] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg tracking-wider text-gray-800">
                                    BOESA
                                </span>
                                <span className="text-[10px] tracking-widest text-[#C5A059]">
                                    FASHION
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#C5A059] rounded-lg hover:bg-gray-50 transition-all duration-300"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="hidden md:flex items-center space-x-3">
                            <Link
                                href="/koleksi"
                                className="p-2 text-gray-600 hover:text-[#C5A059] rounded-lg hover:bg-gray-50 transition-all duration-300"
                            >
                                <ShoppingBagIcon className="w-5 h-5" />
                            </Link>

                            {/* TOMBOL GOLD (NAVY & GOLD) - PREMIUM */}
                            <Link
                                href="/login"
                                className="px-6 py-2.5 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-white rounded-lg font-medium text-sm shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center space-x-2">
                                    <UserIcon className="w-4 h-4" />
                                    <span>MASUK</span>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-600 hover:text-[#C5A059] rounded-lg hover:bg-gray-50 transition-all duration-300"
                        >
                            {isMenuOpen ? (
                                <XMarkIcon className="w-6 h-6" />
                            ) : (
                                <Bars3Icon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200 mt-3">
                        <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-4 py-3 text-gray-700 hover:text-[#C5A059] hover:bg-gray-50 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="pt-2 mt-2 border-t border-gray-200">
                                <Link
                                    href="/login"
                                    className="block px-4 py-3 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-white rounded-lg font-medium text-center shadow-md hover:shadow-lg transition-all duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Masuk
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Spacer */}
            <div className="h-20"></div>

            {/* Main Content */}
            <main>{children}</main>
        </div>
    );
}
