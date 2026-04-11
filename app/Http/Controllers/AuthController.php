<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia; // <-- TAMBAHKAN INI

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return Inertia::render('Auth/Login'); // <-- UBAH JADI INI
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required'
        ]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            $user = Auth::user();

            // Cek apakah user aktif
            if (!$user->is_active) {
                Auth::logout();
                return back()->withErrors([
                    'username' => 'Akun Anda tidak aktif. Hubungi admin.',
                ]);
            }

            // Redirect berdasarkan role
            if ($user->role === 'admin') {
                return redirect()->intended('/admin/dashboard');
            } elseif ($user->role === 'staf') {
                return redirect()->intended('/pelayan/dashboard');
            }
        }

        return back()->withErrors([
            'username' => 'Username atau password salah.',
        ])->onlyInput('username');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
