import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white via-white to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
            {/* Logo Section */}
            <div className="text-center mb-8">
                <Link
                    href="/"
                    className="inline-flex items-center space-x-3 group"
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#3D1C24] to-[#5C283A] rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                        <span className="text-white font-bold text-2xl">
                            BF
                        </span>
                    </div>
                    <div className="text-left">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3D1C24] to-amber-600 bg-clip-text text-transparent">
                            BOESA
                        </h1>
                        <p className="text-sm text-amber-600 font-light tracking-wide">
                            FASHION
                        </p>
                    </div>
                </Link>
            </div>

            {/* Card Container */}
            <div className="w-full max-w-md">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-100 overflow-hidden">
                    {/* Top Gradient Bar */}
                    <div className="h-2 bg-gradient-to-r from-[#3D1C24] via-[#5C283A] to-amber-500"></div>

                    {/* Content */}
                    <div className="px-6 py-8 sm:px-10">{children}</div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} Boesa Fashion. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
