import AdminLayout from "@/Layouts/AdminLayout";

export default function Index({ contacts }) {
    console.log("Contacts data:", contacts);

    return (
        <AdminLayout title="Pesan Masuk">
            <div className="py-6 px-4">
                <h1 className="text-2xl font-bold mb-4">Pesan Masuk</h1>

                {contacts && contacts.length > 0 ? (
                    <div className="space-y-4">
                        {contacts.map((contact) => (
                            <div
                                key={contact.id}
                                className="border p-4 rounded-lg shadow"
                            >
                                <h3 className="font-bold">
                                    {contact.nama_lengkap}
                                </h3>
                                <p className="text-gray-600">{contact.email}</p>
                                <p className="mt-2">{contact.pesan}</p>
                                <p className="text-xs text-gray-400 mt-2">
                                    {new Date(
                                        contact.created_at,
                                    ).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Belum ada pesan masuk</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
