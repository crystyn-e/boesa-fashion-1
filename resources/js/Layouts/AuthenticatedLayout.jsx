import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-white to-amber-50">
            {/* Navbar - Burgundy Gradient */}
            <nav
                className="border-b border-amber-100 shadow-lg"
                style={{
                    background: "linear-gradient(135deg, #3D1C24, #5C283A)",
                }}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        {/* Logo Area */}
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link
                                    href="/"
                                    className="flex items-center space-x-2"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
                                        <span className="text-white font-bold text-sm">
                                            BF
                                        </span>
                                    </div>
                                    <span className="text-white font-bold tracking-wide">
                                        BOESA{" "}
                                        <span className="text-amber-400">
                                            FASHION
                                        </span>
                                    </span>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex sm:items-center">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                    className="text-white/80 hover:text-amber-300 transition-all duration-300"
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        {/* User Dropdown */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-amber-500/30 bg-white/10 backdrop-blur-sm px-3 py-2 text-sm font-medium leading-4 text-white hover:bg-white/20 transition-all duration-300 focus:outline-none"
                                            >
                                                {user.name}
                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content className="bg-white/95 backdrop-blur-sm border border-amber-100 shadow-xl rounded-xl">
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                            className="text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-amber-200 transition duration-150 ease-in-out hover:bg-white/10 hover:text-amber-300 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden bg-gradient-to-b from-[#3D1C24] to-[#5C283A]"
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route("dashboard")}
                            active={route().current("dashboard")}
                            className="text-white/80 hover:text-amber-300 hover:bg-white/10"
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-amber-500/20 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-amber-300">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("profile.edit")}
                                className="text-white/80 hover:text-amber-300 hover:bg-white/10"
                            >
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                                className="text-white/80 hover:text-red-400 hover:bg-white/10"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header Section */}
            {header && (
                <header className="bg-gradient-to-r from-amber-50 via-white to-amber-100 shadow-sm border-b border-amber-200">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-amber-700 rounded-full"></div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#3D1C24] to-amber-600 bg-clip-text text-transparent">
                                {header}
                            </h1>
                        </div>
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-6">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
