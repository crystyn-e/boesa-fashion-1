import PublicLayout from "../Layouts/PublicLayout";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import {
    ShoppingBagIcon,
    PhoneIcon,
    ArrowRightIcon,
    StarIcon,
    TruckIcon,
    ShieldCheckIcon,
    HeartIcon,
    ClockIcon,
    EnvelopeIcon,
    MapPinIcon,
    XMarkIcon,
    UserGroupIcon,
    GlobeAltIcon,
    CameraIcon,
} from "@heroicons/react/24/outline";
import { ClockIcon as ClockIconSolid } from "@heroicons/react/24/solid";

export default function Home({
    featuredProducts: initialProducts,
    categories: initialCategories,
}) {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    // Gunakan data dari database, fallback ke dummy data jika kosong
    const featuredProducts =
        initialProducts?.length > 0
            ? initialProducts
            : [
                  {
                      id: 1,
                      name: "Jas Tuxedo Black Premium",
                      category: "Jas Pria",
                      price: 250000,
                      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop",
                      badge: "NEW",
                  },
                  {
                      id: 2,
                      name: "Gaun Putri Ivory",
                      category: "Gaun Wanita",
                      price: 350000,
                      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop",
                      badge: "HOT",
                  },
                  {
                      id: 3,
                      name: "Sepatu Oxford Brown",
                      category: "Sepatu Formal",
                      price: 125000,
                      image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=600&h=800&fit=crop",
                      badge: null,
                  },
                  {
                      id: 4,
                      name: "Set Perhiasan Mutiara",
                      category: "Aksesoris",
                      price: 150000,
                      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=800&fit=crop",
                      badge: "PREMIUM",
                  },
                  {
                      id: 5,
                      name: "Kostum Adat Jawa",
                      category: "Kostum Tradisional",
                      price: 300000,
                      image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=600&h=800&fit=crop",
                      badge: null,
                  },
                  {
                      id: 6,
                      name: "Dasi Sutra Italian",
                      category: "Aksesoris Pria",
                      price: 50000,
                      image: "https://images.unsplash.com/photo-1589756823695-278bc923f962?w=600&h=800&fit=crop",
                      badge: "SALE",
                  },
              ];

    const categories =
        initialCategories?.length > 0
            ? initialCategories
            : [
                  {
                      name: "Jas",
                      icon: "👔",
                      count: 45,
                  },
                  {
                      name: "Gaun",
                      icon: "👗",
                      count: 38,
                  },
                  {
                      name: "Sepatu",
                      icon: "👞",
                      count: 52,
                  },
                  {
                      name: "Aksesoris",
                      icon: "💍",
                      count: 67,
                  },
                  {
                      name: "Kostum",
                      icon: "🎭",
                      count: 23,
                  },
                  {
                      name: "Dasi",
                      icon: "🎀",
                      count: 41,
                  },
              ];

    const testimonials = [
        {
            name: "Sarah Wijaya",
            role: "Pengantin",
            text: "Gaun pengantin saya sempurna! Kualitas premium dan staf sangat membantu. Proses sewa mudah dan cepat.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108777-766fd1f3f529?w=100&h=100&fit=crop",
        },
        {
            name: "Andi Pratama",
            role: "Freelancer",
            text: "Sudah 3x sewa jas di Boesa, selalu puas. Jas rapi, wangi, dan harga terjangkau. Recommended!",
            rating: 5,
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        },
        {
            name: "Dewi Lestari",
            role: "Bridesmaid",
            text: "Pelayanan ramah, koleksi lengkap. Gaun yang saya sewa kualitasnya seperti baru. Pasti akan sewa lagi!",
            rating: 5,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        },
    ];

    const features = [
        { icon: TruckIcon, title: "Gratis Antar", desc: "Area Jabodetabek" },
        {
            icon: ShieldCheckIcon,
            title: "Kualitas Premium",
            desc: "Laundry profesional",
        },
        { icon: HeartIcon, title: "DP 50%", desc: "Sisa bayar saat kembali" },
        { icon: ClockIcon, title: "Sewa 3 Hari", desc: "Bisa perpanjang" },
    ];

    const stats = [
        { number: "1000+", label: "Pelanggan Puas", icon: UserGroupIcon },
        { number: "500+", label: "Koleksi Item", icon: CameraIcon },
        { number: "50+", label: "Kategori", icon: GlobeAltIcon },
        { number: "24/7", label: "Customer Service", icon: ClockIconSolid },
    ];

    const openContactModal = () => {
        setIsContactModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeContactModal = () => {
        setIsContactModalOpen(false);
        document.body.style.overflow = "unset";
    };

    return (
        <PublicLayout>
            <div className="space-y-16 md:space-y-24">
                {/* ========== HERO SECTION ========== */}
                <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0A192F] via-[#1E2F4A] to-[#0A192F]">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200')] bg-cover bg-center opacity-5"></div>
                        <div className="absolute top-20 left-20 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C5A059]/5 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Left Content */}
                            <div className="space-y-8 text-white">
                                {/* Logo Section */}
                                <div className="flex items-center space-x-3">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#C5A059] to-[#D4AF37] rounded-2xl flex items-center justify-center shadow-2xl">
                                        <span className="text-[#0A192F] font-black text-3xl">
                                            BF
                                        </span>
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-light tracking-wider">
                                            BOESA
                                        </h2>
                                        <h3 className="text-xl font-light tracking-wider text-[#C5A059]">
                                            FASHION
                                        </h3>
                                    </div>
                                </div>

                                {/* Badge */}
                                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                    <span className="w-2 h-2 bg-[#C5A059] rounded-full animate-pulse"></span>
                                    <span className="text-sm font-medium text-white/90">
                                        ✨ Premium Quality - Laundry
                                        Professional
                                    </span>
                                </div>

                                {/* Main Heading */}
                                <div>
                                    <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                                        Tampil
                                        <span className="relative ml-3">
                                            <span className="relative z-10 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-transparent bg-clip-text">
                                                Mewah
                                            </span>
                                            <span className="absolute bottom-2 left-0 w-full h-3 bg-[#C5A059]/30 -z-10 blur-sm"></span>
                                        </span>
                                        <br />
                                        Tanpa Beban
                                    </h1>
                                    <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                                        Sewa jas, gaun, dan aksesoris
                                        berkualitas premium. Koleksi lengkap
                                        untuk pernikahan, wisuda, pesta, dan
                                        acara spesial Anda.
                                    </p>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <Link
                                        href="/koleksi"
                                        className="group relative px-8 py-4 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#0A192F] rounded-xl font-medium overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                    >
                                        <span className="relative z-10 flex items-center space-x-3">
                                            <ShoppingBagIcon className="w-5 h-5" />
                                            <span>Lihat Koleksi</span>
                                            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                        </span>
                                    </Link>
                                    <button
                                        onClick={openContactModal}
                                        className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-medium border-2 border-white/20 hover:border-[#C5A059] transition-all duration-300 flex items-center space-x-2"
                                    >
                                        <PhoneIcon className="w-5 h-5" />
                                        <span>Hubungi Kami</span>
                                    </button>
                                </div>

                                {/* Features Grid */}
                                <div className="grid grid-cols-2 gap-4 pt-8">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start space-x-3"
                                        >
                                            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                                <feature.icon className="w-5 h-5 text-[#C5A059]" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white">
                                                    {feature.title}
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    {feature.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Content - Featured Gallery */}
                            <div className="relative">
                                <div className="grid grid-cols-2 gap-4">
                                    {featuredProducts
                                        .slice(0, 4)
                                        .map((product, index) => (
                                            <div
                                                key={product.id}
                                                className={`group relative bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-500 ${
                                                    index === 0
                                                        ? "row-span-2"
                                                        : ""
                                                }`}
                                            >
                                                <div className="relative aspect-[3/4] overflow-hidden">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-60"></div>
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                                        <p className="font-semibold text-sm">
                                                            {product.name}
                                                        </p>
                                                        <p className="text-xs text-gray-300">
                                                            {product.category}
                                                        </p>
                                                        <p className="text-sm font-bold mt-1 text-[#C5A059]">
                                                            Rp{" "}
                                                            {product.price.toLocaleString()}
                                                        </p>
                                                    </div>
                                                    {product.badge && (
                                                        <div
                                                            className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full shadow-lg ${
                                                                product.badge ===
                                                                "NEW"
                                                                    ? "bg-[#C5A059] text-[#0A192F]"
                                                                    : product.badge ===
                                                                        "HOT"
                                                                      ? "bg-[#D62828] text-white"
                                                                      : product.badge ===
                                                                          "PREMIUM"
                                                                        ? "bg-[#C5A059] text-[#0A192F]"
                                                                        : "bg-[#F77F00] text-white"
                                                            }`}
                                                        >
                                                            {product.badge}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#C5A059]/20 rounded-full blur-2xl animate-pulse"></div>
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#C5A059]/20 rounded-full blur-2xl animate-pulse delay-700"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== BRANDS / TRUSTED COMPANIES ========== */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold text-[#C5A059] uppercase tracking-wide">
                            Dipercaya Oleh
                        </p>
                        <h2 className="text-3xl font-bold text-[#0A192F] mt-2">
                            Mitra & Klien Terpercaya
                        </h2>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                                key={i}
                                className="w-24 h-12 bg-gray-200 rounded-lg animate-pulse"
                            ></div>
                        ))}
                    </div>
                </section>

                {/* ========== CATEGORIES SECTION ========== */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold text-[#C5A059] uppercase tracking-wide">
                            Koleksi Kami
                        </p>
                        <h2 className="text-3xl font-bold text-[#0A192F] mt-2">
                            Jelajahi Berbagai Kategori
                        </h2>
                        <p className="text-lg text-gray-600 mt-4">
                            Temukan gaya sempurna untuk setiap momen spesial
                            Anda
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((cat, idx) => (
                            <Link
                                key={idx}
                                href={`/koleksi?kategori=${cat.name}`}
                                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A059] to-[#D4AF37] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                <div className="p-6 text-center">
                                    <span className="text-4xl mb-3 block transform group-hover:scale-110 transition-transform duration-300">
                                        {cat.icon}
                                    </span>
                                    <h3 className="font-semibold text-gray-800 group-hover:text-[#C5A059] transition-colors">
                                        {cat.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {cat.count} item
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ========== FEATURED PRODUCTS ========== */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold text-[#C5A059] uppercase tracking-wide">
                            Koleksi Unggulan
                        </p>
                        <h2 className="text-3xl font-bold text-[#0A192F] mt-2">
                            Paling Populer Bulan Ini
                        </h2>
                        <p className="text-lg text-gray-600 mt-4">
                            Item yang paling banyak disewa oleh pelanggan kami
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        <Link
                                            href={`/koleksi/${product.id}`}
                                            className="px-4 py-2 bg-[#C5A059] text-[#0A192F] rounded-full font-medium text-sm hover:bg-[#D4AF37] transition-colors duration-300 shadow-lg"
                                        >
                                            Lihat Detail
                                        </Link>
                                    </div>
                                    {product.badge && (
                                        <div
                                            className={`absolute top-4 right-4 px-3 py-1 text-xs font-bold text-white rounded-full ${
                                                product.badge === "NEW"
                                                    ? "bg-[#C5A059] text-[#0A192F]"
                                                    : product.badge === "HOT"
                                                      ? "bg-[#D62828]"
                                                      : product.badge ===
                                                          "PREMIUM"
                                                        ? "bg-[#C5A059] text-[#0A192F]"
                                                        : "bg-[#F77F00]"
                                            }`}
                                        >
                                            {product.badge}
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <Link href={`/koleksi/${product.id}`}>
                                        <h3 className="text-lg font-semibold text-gray-800 hover:text-[#C5A059] transition-colors">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {product.category}
                                    </p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="text-xl font-bold text-[#C5A059]">
                                            Rp {product.price.toLocaleString()}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            /3 hari
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/koleksi"
                            className="inline-flex items-center px-6 py-3 bg-[#C5A059] text-[#0A192F] rounded-full hover:bg-[#D4AF37] transition shadow-lg group font-medium"
                        >
                            Lihat Semua Koleksi
                            <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </section>

                {/* ========== STATS SECTION ========== */}
                <section className="bg-[#0A192F] py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="text-center text-white"
                                >
                                    <div className="flex justify-center mb-3">
                                        <stat.icon className="w-8 h-8 text-[#C5A059]" />
                                    </div>
                                    <div className="text-3xl font-bold mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ========== TESTIMONIALS SECTION ========== */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold text-[#C5A059] uppercase tracking-wide">
                            Testimonial
                        </p>
                        <h2 className="text-3xl font-bold text-[#0A192F] mt-2">
                            Apa Kata Pelanggan Kami
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="flex items-center space-x-1 text-[#C5A059] mb-4">
                                    {[...Array(testimonial.rating)].map(
                                        (_, i) => (
                                            <StarIcon
                                                key={i}
                                                className="w-5 h-5 fill-current"
                                            />
                                        ),
                                    )}
                                </div>
                                <p className="text-gray-600 mb-4 italic">
                                    "{testimonial.text}"
                                </p>
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ========== CTA SECTION ========== */}
                <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    <div className="bg-gradient-to-r from-[#0A192F] to-[#1E2F4A] rounded-3xl p-12 text-center text-white shadow-2xl border border-[#C5A059]/20">
                        <h2 className="text-3xl font-bold mb-4">
                            Siap Tampil Memukau?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Kunjungi showroom kami dan konsultasikan kebutuhan
                            fashion Anda
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/kontak"
                                className="px-8 py-4 bg-[#C5A059] text-[#0A192F] rounded-full font-semibold hover:bg-[#D4AF37] transition transform hover:scale-105 shadow-lg"
                            >
                                Hubungi Kami
                            </Link>
                            <Link
                                href="/koleksi"
                                className="px-8 py-4 bg-transparent border-2 border-[#C5A059] text-[#C5A059] rounded-full font-semibold hover:bg-[#C5A059] hover:text-[#0A192F] transition transform hover:scale-105"
                            >
                                Lihat Koleksi
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ========== CONTACT MODAL ========== */}
                {isContactModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                            onClick={closeContactModal}
                        ></div>
                        <div className="relative min-h-screen flex items-center justify-center p-4">
                            <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden">
                                <button
                                    onClick={closeContactModal}
                                    className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-[#C5A059] hover:text-white transition-all duration-300"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>

                                <div className="bg-gradient-to-r from-[#0A192F] to-[#1E2F4A] p-8 text-white">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-12 h-12 bg-[#C5A059] rounded-xl flex items-center justify-center">
                                            <span className="text-xl font-bold text-[#0A192F]">
                                                BF
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-light">
                                                BOESA
                                            </h3>
                                            <h4 className="text-lg font-light text-[#C5A059]">
                                                FASHION
                                            </h4>
                                        </div>
                                    </div>
                                    <h2 className="text-3xl font-bold mb-2">
                                        Hubungi Kami
                                    </h2>
                                    <p className="text-gray-300">
                                        Tim customer service kami siap membantu
                                        Anda 24/7
                                    </p>
                                </div>

                                <div className="p-8">
                                    <div className="grid md:grid-cols-2 gap-4 mb-8">
                                        <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-200">
                                            <div className="p-3 bg-[#C5A059]/10 rounded-lg">
                                                <PhoneIcon className="w-5 h-5 text-[#C5A059]" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    Telepon
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    +62 812 3456 7890
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Senin - Jumat, 08:00 - 20:00
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-200">
                                            <div className="p-3 bg-[#C5A059]/10 rounded-lg">
                                                <EnvelopeIcon className="w-5 h-5 text-[#C5A059]" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    Email
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    info@boesafashion.com
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    cs@boesafashion.com
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-200">
                                            <div className="p-3 bg-[#25D366]/10 rounded-lg">
                                                <svg
                                                    className="w-5 h-5 text-[#25D366]"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    WhatsApp
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    +62 812 0000 0000
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Fast response via chat
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300 border border-gray-200">
                                            <div className="p-3 bg-[#C5A059]/10 rounded-lg">
                                                <MapPinIcon className="w-5 h-5 text-[#C5A059]" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    Showroom
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    Jl. Fashion No. 123
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Jakarta 12345
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                                            Kirim Pesan Cepat
                                        </h3>
                                        <form className="space-y-4">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="Nama Lengkap"
                                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-colors"
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                    className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-colors"
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="No. Telepon"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-colors"
                                            />
                                            <textarea
                                                placeholder="Pesan Anda"
                                                rows="4"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-colors"
                                            ></textarea>
                                            <button
                                                type="submit"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    alert(
                                                        "Pesan Anda telah terkirim! Tim kami akan segera merespon.",
                                                    );
                                                    closeContactModal();
                                                }}
                                                className="w-full px-6 py-4 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#0A192F] rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                                            >
                                                Kirim Pesan
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
