<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        // Cek apakah user aktif
        if (!$user->is_active) {
            Auth::logout();
            return redirect()->route('login')
                ->withErrors(['username' => 'Akun Anda tidak aktif. Hubungi admin.']);
        }

        // Cek role
        if ($user->role !== $role) {
            abort(403, 'Unauthorized access.');
        }

        return $next($request);
    }
}
