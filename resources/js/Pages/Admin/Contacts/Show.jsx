import AdminLayout from "@/Layouts/AdminLayout";
import { Link } from "@inertiajs/react";
import {
    ArrowLeftIcon,
    TrashIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function Show({ contact, flash }) {
    return (
        <AdminLayout title={`Pesan dari ${contact.nama_lengkap}`}>
            <div className="py-6 px-4">
                <Link
                    href="/admin/contacts"
                    className="flex items-center gap-2 text-blue-600 mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Kembali
                </Link>

                <div className="bg-white shadow rounded-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">Detail Pesan</h1>
                    <p>
                        <strong>Nama:</strong> {contact.nama_lengkap}
                    </p>
                    <p>
                        <strong>Email:</strong> {contact.email}
                    </p>
                    <p>
                        <strong>Telepon:</strong> {contact.no_telepon || "-"}
                    </p>
                    <p>
                        <strong>Pesan:</strong>
                    </p>
                    <p className="bg-gray-50 p-4 rounded mt-2">
                        {contact.pesan}
                    </p>
                    <p className="text-gray-400 text-sm mt-4">
                        Dikirim: {new Date(contact.created_at).toLocaleString()}
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
}
