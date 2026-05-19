<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        // Debug: log data yang masuk
        Log::info('Contact data received:', $request->all());

        // Validasi dengan field yang benar dari form
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:100',
            'email' => 'required|email|max:100',
            'no_telepon' => 'nullable|string|max:15',
            'pesan' => 'required|string|min:5',
        ]);

        try {
            // Simpan ke database (mapping ke kolom Oracle)
            $contact = Contact::create([
                'name' => $validated['nama_lengkap'],
                'email' => $validated['email'],
                'phone' => $validated['no_telepon'],
                'message' => $validated['pesan'],
                'is_read' => '0',
            ]);

            Log::info('Contact saved successfully, ID: ' . $contact->id);

            return redirect()->back()->with('success', 'Pesan Anda telah terkirim! Terima kasih.');
        } catch (\Exception $e) {
            // Log error detail
            Log::error('Contact save error: ' . $e->getMessage());
            Log::error('Error trace: ' . $e->getTraceAsString());

            return redirect()->back()->with('error', 'Gagal menyimpan pesan: ' . $e->getMessage())->withInput();
        }
    }
}
