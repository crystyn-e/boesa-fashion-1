<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminContactController extends Controller
{
    // Menampilkan daftar pesan masuk (dan menandai semua sebagai sudah dibaca)
    public function index()
    {
        // Tandai SEMUA pesan yang belum dibaca menjadi sudah dibaca
        Contact::where('is_read', '0')->update(['is_read' => '1']);

        $contacts = Contact::orderBy('created_at', 'desc')->get();

        $mappedContacts = $contacts->map(function ($contact) {
            return [
                'id' => $contact->id,
                'nama_lengkap' => $contact->name,
                'email' => $contact->email,
                'no_telepon' => $contact->phone,
                'pesan' => $contact->message,
                'is_read' => $contact->is_read == '1',
                'created_at' => $contact->created_at,
            ];
        });

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $mappedContacts
        ]);
    }

    // Mendapatkan jumlah pesan belum dibaca
    public function unreadCount()
    {
        $count = Contact::where('is_read', '0')->count();
        return response()->json(['count' => $count]);
    }

    // Menampilkan detail pesan (menandai satu pesan sebagai sudah dibaca)
    public function show($id)
    {
        $contact = Contact::findOrFail($id);

        if ($contact->is_read == '0') {
            $contact->update(['is_read' => '1']);
        }

        $mappedContact = [
            'id' => $contact->id,
            'nama_lengkap' => $contact->name,
            'email' => $contact->email,
            'no_telepon' => $contact->phone,
            'pesan' => $contact->message,
            'is_read' => true,
            'created_at' => $contact->created_at,
        ];

        return Inertia::render('Admin/Contacts/Show', [
            'contact' => $mappedContact
        ]);
    }

    public function markAsRead($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->update(['is_read' => '1']);

        return redirect()->back()->with('success', 'Pesan ditandai sudah dibaca');
    }

    public function destroy($id)
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return redirect()->route('admin.contacts.index')->with('success', 'Pesan berhasil dihapus');
    }
}
