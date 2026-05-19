import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    HomeIcon,
    UsersIcon,
    TagIcon,
    CubeIcon,
    DocumentTextIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    EnvelopeIcon,
} from "@heroicons/react/24/outline";

// Gunakan placeholder online
const logoSrc = "/images/logo-boesafashion.jpg";

export default function AdminLayout({ children, title }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState("");
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, [window.location.pathname]);

    const fetchUnreadCount = async () => {
        try {
            const response = await fetch("/admin/contacts/unread-count");
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            setUnreadCount(data.count || 0);
        } catch (error) {
            console.error("Error fetching unread count:", error);
        }
    };

    useEffect(() => {
        fetchUnreadCount();
        const interval = setInterval(fetchUnreadCount, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetchUnreadCount();
    }, [currentPath]);

    const navigation = [
        { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
        { name: "Manajemen Staf", href: "/admin/users", icon: UsersIcon },
        { name: "Manajemen Barang", href: "/admin/barang", icon: CubeIcon },
        { name: "Kategori", href: "/admin/kategori", icon: TagIcon },
        { name: "Pesan Masuk", href: "/admin/contacts", icon: EnvelopeIcon },
        { name: "Laporan", href: "/admin/laporan", icon: DocumentTextIcon },
    ];

    const isActive = (href) => currentPath === href;

    const handleNavigate = (href) => {
        window.location.href = href;
    };

    const handleLogout = () => {
        router.post("/logout");
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Sidebar Desktop */}
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                <div className="flex flex-col flex-1 min-h-0 bg-[#0A192F] shadow-xl">
                    <div className="flex items-center h-16 px-4 border-b border-[#C5A059]/20">
                        <div className="flex items-center space-x-2">
                            <img
                                src={logoSrc}
                                alt="BOESA FASHION"
                                className="w-8 h-8 rounded-lg object-cover"
                            />
                            <span className="text-white font-bold text-lg tracking-wide">
                                BOESA ADMIN
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <nav className="flex-1 px-2 space-y-1">
                            {navigation.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.href);
                                const isContactMenu =
                                    item.href === "/admin/contacts";

                                return (
                                    <button
                                        key={item.name}
                                        onClick={() =>
                                            handleNavigate(item.href)
                                        }
                                        className={`group flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                                            active
                                                ? "bg-[#C5A059] text-[#0A192F]"
                                                : "text-white/70 hover:text-white hover:bg-white/10"
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <Icon
                                                className="mr-3 h-5 w-5 transition-colors"
                                                style={
                                                    active
                                                        ? { color: "#0A192F" }
                                                        : { color: "#C5A059" }
                                                }
                                            />
                                            {item.name}
                                        </div>
                                        {isContactMenu && unreadCount > 0 && (
                                            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-[#0A192F] bg-[#C5A059] rounded-full">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </nav>

                        <div className="px-2 mt-auto pt-4 border-t border-[#C5A059]/20">
                            <button
                                onClick={handleLogout}
                                className="group flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
                            >
                                <ArrowLeftOnRectangleIcon
                                    className="mr-3 h-5 w-5"
                                    style={{ color: "#C5A059" }}
                                />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 shadow-md bg-[#0A192F]">
                <div className="flex items-center justify-between h-16 px-4">
                    <div className="flex items-center space-x-2">
                        <img
                            src={logoSrc}
                            alt="BOESA FASHION"
                            className="w-8 h-8 rounded-lg object-cover"
                        />
                        <span className="font-bold text-white tracking-wide">
                            BOESA ADMIN
                        </span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 text-white/70 rounded-lg hover:bg-white/10 transition-all"
                    >
                        {isSidebarOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {isSidebarOpen && (
                <div className="md:hidden fixed inset-0 z-40 pt-16 overflow-y-auto bg-[#0A192F]">
                    <nav className="px-4 py-4 space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isContactMenu =
                                item.href === "/admin/contacts";

                            return (
                                <button
                                    key={item.name}
                                    onClick={() => {
                                        setIsSidebarOpen(false);
                                        handleNavigate(item.href);
                                    }}
                                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <div className="flex items-center">
                                        <Icon
                                            className="mr-3 h-5 w-5"
                                            style={{ color: "#C5A059" }}
                                        />
                                        {item.name}
                                    </div>
                                    {isContactMenu && unreadCount > 0 && (
                                        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-[#0A192F] bg-[#C5A059] rounded-full">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                        <div className="pt-4 mt-4 border-t border-[#C5A059]/20">
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <ArrowLeftOnRectangleIcon
                                    className="mr-3 h-5 w-5"
                                    style={{ color: "#C5A059" }}
                                />
                                Logout
                            </button>
                        </div>
                    </nav>
                </div>
            )}

            {/* Main Content */}
            <div className="md:pl-64">
                <div className="bg-white border-b border-gray-200">
                    <div className="py-6 px-4 sm:px-6 md:px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-semibold text-gray-800">
                                    {title}
                                </h1>
                                <div className="w-16 h-0.5 bg-[#C5A059] rounded-full mt-2"></div>
                            </div>
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        handleNavigate("/admin/contacts")
                                    }
                                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all relative"
                                >
                                    <EnvelopeIcon className="w-5 h-5 text-gray-600" />
                                    {unreadCount > 0 && (
                                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                                            {unreadCount > 9
                                                ? "9+"
                                                : unreadCount}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-6 px-4 sm:px-6 md:px-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
