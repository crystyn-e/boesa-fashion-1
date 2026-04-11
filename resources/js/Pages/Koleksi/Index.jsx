import PublicLayout from "@/Layouts/PublicLayout";
import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

export default function KoleksiIndex({
    barangs = [],
    kategoris = [],
    filters = {},
}) {
    const [searchTerm, setSearchTerm] = useState(filters.search || "");
    const [selectedCategory, setSelectedCategory] = useState(
        filters.kategori || "",
    );
    const [selectedStatus, setSelectedStatus] = useState(filters.status || "");

    // Fungsi untuk menerapkan filter
    const applyFilters = () => {
        router.get(
            "/koleksi",
            {
                search: searchTerm,
                kategori: selectedCategory,
                status: selectedStatus,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true, // Mengganti URL tanpa menambah history
            },
        );
    };

    // Effect untuk search (dengan debounce)
    useEffect(() => {
        const timer = setTimeout(() => {
            applyFilters();
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]); // Trigger ketika searchTerm berubah

    // Effect untuk kategori (langsung)
    useEffect(() => {
        // Jangan trigger saat initial load
        if (selectedCategory !== filters.kategori) {
            applyFilters();
        }
    }, [selectedCategory]); // Trigger ketika selectedCategory berubah

    // Effect untuk status (langsung)
    useEffect(() => {
        // Jangan trigger saat initial load
        if (selectedStatus !== filters.status) {
            applyFilters();
        }
    }, [selectedStatus]); // Trigger ketika selectedStatus berubah

    // Reset filter
    const resetFilters = () => {
        setSearchTerm("");
        setSelectedCategory("");
        setSelectedStatus("");
        // Langsung redirect tanpa state
        router.get(
            "/koleksi",
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    // Handle perubahan input
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    // Fungsi untuk badge status
    const getStatusBadge = (status) => {
        if (!status) return null;

        switch (status) {
            case "tersedia":
                return (
                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full bg-green-500 text-white">
                        Tersedia
                    </span>
                );
            case "disewa":
                return (
                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full bg-orange-500 text-white">
                        Disewa
                    </span>
                );
            case "maintenance":
                return (
                    <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full bg-red-500 text-white">
                        Maintenance
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <PublicLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#0A192F] mb-4">
                        Koleksi Kami
                    </h1>
                    <p className="text-lg text-gray-600">
                        Temukan berbagai pilihan jas, gaun, sepatu, dan
                        aksesoris untuk acara spesial Anda
                    </p>
                </div>

                {/* Filter Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="relative md:col-span-2">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari barang... (otomatis)"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent appearance-none bg-white"
                            >
                                <option value="">Semua Kategori</option>
                                {kategoris &&
                                    kategoris.map((kategori) => (
                                        <option
                                            key={kategori.id}
                                            value={kategori.id}
                                        >
                                            {kategori.nama_kategori}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div className="relative">
                            <select
                                value={selectedStatus}
                                onChange={handleStatusChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent appearance-none bg-white"
                            >
                                <option value="">Semua Status</option>
                                <option value="tersedia">Tersedia</option>
                                <option value="disewa">Disewa</option>
                                <option value="maintenance">Maintenance</option>
                            </select>
                        </div>
                    </div>

                    {/* Reset Filter Button */}
                    {(searchTerm || selectedCategory || selectedStatus) && (
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={resetFilters}
                                className="text-sm text-[#C5A059] hover:text-[#D4AF37] font-medium"
                            >
                                Reset Semua Filter
                            </button>
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <p className="text-sm text-gray-600 mb-4">
                    Menampilkan {barangs?.length || 0} barang
                </p>

                {/* Products Grid */}
                {barangs && barangs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {barangs.map((barang) => (
                            <div
                                key={barang.id}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
                            >
                                <div className="relative overflow-hidden h-64">
                                    <img
                                        src={
                                            barang.gambar ||
                                            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop"
                                        }
                                        alt={barang.nama_barang || "Barang"}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => {
                                            e.target.src =
                                                "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop";
                                        }}
                                    />

                                    {/* Status Badge */}
                                    {barang.status &&
                                        getStatusBadge(barang.status)}

                                    {/* Badge NEW */}
                                    {barang.badge && (
                                        <span className="absolute top-4 right-4 px-3 py-1 text-xs font-bold rounded-full bg-[#C5A059] text-[#0A192F]">
                                            {barang.badge}
                                        </span>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                        {barang.nama_barang || "Tanpa Nama"}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-2">
                                        {barang.kategori || "Umum"}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-[#C5A059]">
                                            Rp{" "}
                                            {barang.harga_sewa
                                                ? parseInt(
                                                      barang.harga_sewa,
                                                  ).toLocaleString()
                                                : "0"}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            /3 hari
                                        </span>
                                    </div>
                                    <div className="mt-4">
                                        <Link
                                            href={`/koleksi/${barang.slug || "#"}`}
                                            className="block w-full text-center px-4 py-2 bg-[#C5A059] text-[#0A192F] rounded-lg font-medium hover:bg-[#D4AF37] transition-colors"
                                        >
                                            Lihat Detail
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-200">
                        <div className="text-6xl mb-4">😕</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            Tidak Ada Barang
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Tidak ada barang yang sesuai dengan filter Anda.
                        </p>
                        <button
                            onClick={resetFilters}
                            className="inline-flex items-center px-6 py-3 bg-[#C5A059] text-[#0A192F] rounded-lg font-medium hover:bg-[#D4AF37] transition-colors"
                        >
                            Reset Filter
                        </button>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
