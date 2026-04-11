import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function KategoriEdit({ kategori }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_kategori: kategori.nama_kategori,
        deskripsi: kategori.deskripsi || "",
        icon: kategori.icon || "",
        urutan: kategori.urutan || 0,
        is_active: kategori.is_active,
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/kategori/${kategori.id}`);
    };

    return (
        <AdminLayout title="Edit Kategori">
            <div className="py-6">
                {/* Back Button */}
                <Link
                    href="/admin/kategori"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-[#C5A059] mb-6"
                >
                    <ArrowLeftIcon className="w-4 h-4 mr-1" />
                    Kembali ke Daftar Kategori
                </Link>

                {/* Form Card */}
                <div className="bg-white shadow-xl rounded-xl border border-gray-200 p-6 max-w-2xl">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Edit Kategori
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Edit kategori: {kategori.nama_kategori}
                        </p>
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
                            />
                        </div>

                        {/* Status Aktif */}
                        <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData("is_active", e.target.checked)
                                }
                                className="h-4 w-4 text-[#C5A059] focus:ring-[#C5A059] border-gray-300 rounded"
                            />
                            <label className="ml-2 block text-sm text-gray-900">
                                Aktif (kategori akan ditampilkan)
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
                                className="px-6 py-2 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#0A192F] rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                            >
                                {processing
                                    ? "Menyimpan..."
                                    : "Update Kategori"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
