import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function KategoriCreate() {
    const { data, setData, post, processing, errors } = useForm({
        nama_kategori: "",
        deskripsi: "",
        icon: "",
        urutan: 0,
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post("/admin/kategori");
    };

    return (
        <AdminLayout title="Tambah Kategori Baru">
            <div className="py-6">
                {/* Back Button - Warna emas */}
                <Link
                    href="/admin/kategori"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-[#C5A059] transition-colors mb-6"
                >
                    <ArrowLeftIcon className="w-4 h-4 mr-1" />
                    Kembali ke Daftar Kategori
                </Link>

                {/* Form Card - Putih solid */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 max-w-2xl">
                    {/* Header dengan garis emas */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Tambah Kategori Baru
                        </h2>
                        <div className="w-16 h-0.5 bg-[#C5A059] rounded-full"></div>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Nama Kategori */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nama Kategori{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.nama_kategori}
                                onChange={(e) =>
                                    setData("nama_kategori", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all duration-300"
                                placeholder="Contoh: Jas, Gaun, Sepatu"
                            />
                            {errors.nama_kategori && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.nama_kategori}
                                </p>
                            )}
                        </div>

                        {/* Icon */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Icon (Font Awesome)
                            </label>
                            <input
                                type="text"
                                value={data.icon}
                                onChange={(e) =>
                                    setData("icon", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all duration-300"
                                placeholder="Contoh: fa-solid fa-user-tie"
                            />
                        </div>

                        {/* Urutan */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Urutan Tampil
                            </label>
                            <input
                                type="number"
                                value={data.urutan}
                                onChange={(e) =>
                                    setData("urutan", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all duration-300"
                                min="0"
                            />
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Deskripsi
                            </label>
                            <textarea
                                value={data.deskripsi}
                                onChange={(e) =>
                                    setData("deskripsi", e.target.value)
                                }
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059] transition-all duration-300"
                                placeholder="Deskripsi kategori..."
                            />
                        </div>

                        {/* Preview Section - Navy solid */}
                        <div className="bg-[#0A192F] rounded-lg p-4 text-white">
                            <h3 className="text-sm font-medium mb-2">
                                Preview Tampilan:
                            </h3>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-[#C5A059] rounded-lg flex items-center justify-center shadow-md">
                                    <span className="text-[#0A192F] font-bold text-lg">
                                        {data.nama_kategori
                                            ? data.nama_kategori.charAt(0)
                                            : "?"}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium">
                                        {data.nama_kategori || "Nama Kategori"}
                                    </p>
                                    <p className="text-xs text-[#C5A059]">
                                        {data.is_active
                                            ? "Aktif"
                                            : "Tidak Aktif"}{" "}
                                        • Urutan: {data.urutan}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Status Aktif */}
                        <div className="flex items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData("is_active", e.target.checked)
                                }
                                className="h-4 w-4 text-[#C5A059] focus:ring-[#C5A059] border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-700">
                                Aktif (kategori akan ditampilkan di halaman
                                publik)
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                            <Link
                                href="/admin/kategori"
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-[#0A192F] text-white rounded-lg font-medium hover:bg-[#1E2F4A] transition-all duration-300 disabled:opacity-50"
                            >
                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Kategori"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
