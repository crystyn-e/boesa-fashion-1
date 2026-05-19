<?php

namespace Database\Seeders;

use App\Models\Contact;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    public function run(): void
    {
        Contact::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '08123456789',
            'message' => 'Saya tertarik dengan koleksi jas untuk pernikahan bulan depan. Apakah ada diskon untuk pemesanan minimal 5 jas?',
            'is_read' => false,
        ]);

        Contact::create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'phone' => '08987654321',
            'message' => 'Apakah bisa sewa untuk acara wisuda? Saya butuh 3 gaun untuk minggu depan.',
            'is_read' => true,
        ]);
    }
}
