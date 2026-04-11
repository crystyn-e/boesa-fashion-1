import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function UsersEdit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        username: user.username,
        email: user.email,
        nama_lengkap: user.nama_lengkap,
        no_telepon: user.no_telepon || "",
        alamat: user.alamat || "",
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    return (
        <AdminLayout title="Edit Staf">
            <div className="py-6">
                <Link
                    href="/admin/users"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-[#C5A059] mb-6"
                >
                    <ArrowLeftIcon className="w-4 h-4 mr-1" />
                    Kembali ke Daftar Staf
                </Link>

                <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 max-w-2xl">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Edit Data Staf
                    </h2>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Nama Lengkap */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nama Lengkap{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.nama_lengkap}
                                onChange={(e) =>
                                    setData("nama_lengkap", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
                            />
                            {errors.nama_lengkap && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.nama_lengkap}
                                </p>
                            )}
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Username <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={data.username}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* No Telepon */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                No. Telepon
                            </label>
                            <input
                                type="text"
                                value={data.no_telepon}
                                onChange={(e) =>
                                    setData("no_telepon", e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
                            />
                            {errors.no_telepon && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.no_telepon}
                                </p>
                            )}
                        </div>

                        {/* Alamat */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Alamat
                            </label>
                            <textarea
                                value={data.alamat}
                                onChange={(e) =>
                                    setData("alamat", e.target.value)
                                }
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
                            />
                            {errors.alamat && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.alamat}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-3">
                            <Link
                                href="/admin/users"
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-[#C5A059] text-[#0A192F] rounded-lg font-medium hover:bg-[#D4AF37] transition-colors disabled:opacity-50"
                            >
                                {processing ? "Menyimpan..." : "Update Staf"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
