<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'username' => 'admin',
            'password' => Hash::make('admin123'),
            'email' => 'admin@boesafashion.com',
            'nama_lengkap' => 'Administrator',
            'no_telepon' => '081234567890',
            'role' => 'admin',
            'is_active' => true,
        ]);

        User::create([
            'username' => 'staf.andini',
            'password' => Hash::make('staf123'),
            'email' => 'andini@boesafashion.com',
            'nama_lengkap' => 'Andini Putri',
            'no_telepon' => '081234567891',
            'role' => 'staf',
            'is_active' => true,
        ]);
    }
}
