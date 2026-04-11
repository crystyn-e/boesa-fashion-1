import { Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A192F] to-[#1E2F4A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-[#C5A059]/20">
                <div>
                    <div className="flex justify-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-[#C5A059] to-[#D4AF37] rounded-2xl flex items-center justify-center shadow-xl">
                            <span className="text-[#0A192F] font-black text-3xl">
                                BF
                            </span>
                        </div>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        BOESA FASHION
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-300">
                        Silakan login untuk mengakses dashboard
                    </p>
                </div>

                {status && (
                    <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg">
                        {status}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={submit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={data.username}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300/20 bg-white/10 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
                                placeholder="Username"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300/20 bg-white/10 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent"
                                placeholder="Password"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                className="h-4 w-4 text-[#C5A059] focus:ring-[#C5A059] border-gray-300 rounded"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2 block text-sm text-gray-300"
                            >
                                Ingat saya
                            </label>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-[#0A192F] bg-gradient-to-r from-[#C5A059] to-[#D4AF37] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C5A059] transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                        >
                            {processing ? "Memproses..." : "MASUK"}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <Link
                        href="/"
                        className="text-sm text-gray-300 hover:text-[#C5A059] transition-colors"
                    >
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}
