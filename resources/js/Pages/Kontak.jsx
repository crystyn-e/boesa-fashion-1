import PublicLayout from "../Layouts/PublicLayout";
import { Link } from "@inertiajs/react";
import {
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    ClockIcon,
} from "@heroicons/react/24/outline";

export default function Kontak() {
    const contactInfo = [
        {
            icon: PhoneIcon,
            title: "Telepon",
            details: ["+62 822-7650-4245"],
            hours: "Senin - Minggu, 08:00 - 19:00",
            link: "tel:6282276504245",
        },
        {
            icon: EnvelopeIcon,
            title: "Email",
            details: ["info@boesafashion.com", "cs@boesafashion.com"],
            hours: "Balas dalam 24 jam",
            link: "mailto:info@boesafashion.com",
        },
        {
            icon: MapPinIcon,
            title: "Showroom",
            details: [
                "Jl. Jend. D.I Panjaitan No.39, Babura",
                "Kec. Medan Baru, Kota Medan",
                "Sumatera Utara 20152",
            ],
            hours: "Buka Setiap Hari, 08:00 - 19:00",
            link: "https://maps.app.goo.gl/Rbmv4tBdzQhtyU3k7",
        },
        {
            icon: ClockIcon,
            title: "Jam Operasional",
            details: ["Senin - Minggu: 08:00 - 19:00"],
            hours: "Buka Setiap Hari",
        },
    ];

    return (
        <PublicLayout>
            <div className="bg-white">
                {/* ========== HERO SECTION ========== */}
                <section className="bg-[#0A192F] py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight">
                            Hubungi{" "}
                            <span className="font-medium text-[#C5A059]">
                                Kami
                            </span>
                        </h1>
                        <div className="w-12 h-px bg-[#C5A059]/50 mx-auto mt-4 mb-6"></div>
                        <p className="text-white/70 max-w-2xl mx-auto text-lg font-light">
                            Kami siap membantu Anda. Hubungi tim customer
                            service kami melalui berbagai kanal berikut.
                        </p>
                    </div>
                </section>

                {/* ========== CONTACT INFO GRID ========== */}
                <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center hover:shadow-md transition hover:border-[#C5A059]/30 group"
                            >
                                <div className="w-12 h-12 bg-[#C5A059]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C5A059] transition">
                                    <info.icon className="w-6 h-6 text-[#C5A059] group-hover:text-white transition" />
                                </div>
                                <h3 className="font-medium text-gray-800 mb-2">
                                    {info.title}
                                </h3>
                                {info.details.map((detail, i) => (
                                    <p
                                        key={i}
                                        className="text-gray-600 text-sm"
                                    >
                                        {detail}
                                    </p>
                                ))}
                                <p className="text-xs text-gray-400 mt-2">
                                    {info.hours}
                                </p>
                                {info.link && (
                                    <a
                                        href={info.link}
                                        target={
                                            info.link.startsWith("http")
                                                ? "_blank"
                                                : "_self"
                                        }
                                        rel="noopener noreferrer"
                                        className="inline-block mt-3 text-xs text-[#C5A059] hover:text-[#D4AF37] transition"
                                    >
                                        {info.title === "Showroom"
                                            ? "Buka di Google Maps →"
                                            : info.title === "Telepon"
                                              ? "Hubungi Sekarang →"
                                              : "Kirim Email →"}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ========== MAP SECTION (FULL WIDTH) ========== */}
                <section className="py-16 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <h2 className="text-xl font-light text-gray-800 mb-4">
                                Lokasi Showroom Kami
                            </h2>
                            <div className="w-12 h-px bg-[#C5A059] mx-auto"></div>
                        </div>
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md">
                            <div className="h-96 w-full">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.9944503236924!2d98.645066!3d3.583731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031313c1f6c6b1d%3A0x4a2f8c3b9d5e6a7f!2sJl.%20Jend.%20D.I%20Panjaitan%20No.39%2C%20Babura%2C%20Kec.%20Medan%20Baru%2C%20Kota%20Medan%2C%20Sumatera%20Utara%2020152!5e0!3m2!1sid!2sid!4v1733820000000!5m2!1sid!2sid"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    title="STUDIO BOESA FASHION Location"
                                ></iframe>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <a
                                href="https://maps.app.goo.gl/Rbmv4tBdzQhtyU3k7"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-[#C5A059] hover:text-[#D4AF37] transition"
                            >
                                <MapPinIcon className="w-4 h-4" />
                                Buka petunjuk arah di Google Maps
                            </a>
                        </div>
                    </div>
                </section>

                {/* ========== SOCIAL MEDIA ========== */}
                <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-xl font-light text-gray-800 mb-6">
                        Ikuti Kami di Media Sosial
                    </h2>
                    <div className="w-12 h-px bg-[#C5A059] mx-auto mb-8"></div>
                    <div className="flex justify-center gap-8">
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center group"
                        >
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#C5A059] transition mx-auto mb-2">
                                <span className="text-xl group-hover:text-white transition">
                                    📷
                                </span>
                            </div>
                            <p className="text-sm font-medium text-gray-700">
                                Instagram
                            </p>
                            <p className="text-xs text-gray-400">
                                @boesafashion
                            </p>
                        </a>
                       
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center group"
                        >
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-[#C5A059] transition mx-auto mb-2">
                                <span className="text-xl group-hover:text-white transition">
                                    🎵
                                </span>
                            </div>
                            <p className="text-sm font-medium text-gray-700">
                                TikTok
                            </p>
                            <p className="text-xs text-gray-400">
                                @boesafashion
                            </p>
                        </a>
                    </div>
                </section>

                {/* ========== WHATSAPP CTA ========== */}
                <section className="py-16 bg-[#0A192F]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-xl font-light text-white mb-3">
                            Butuh Bantuan?
                        </h2>
                        <p className="text-gray-400 text-sm mb-6">
                            Tim customer service kami siap membantu Anda 24/7
                            melalui WhatsApp
                        </p>
                        <a
                            href="https://wa.me/6282276504245"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full text-sm font-medium hover:bg-[#20BD59] transition"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z" />
                            </svg>
                            Chat via WhatsApp
                        </a>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
}
