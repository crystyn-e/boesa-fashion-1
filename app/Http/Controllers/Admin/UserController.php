<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia; // <-- TAMBAHKAN INI

class UserController extends Controller
{
    public function index()
    {
        $users = User::where('role', 'staf')
            ->orderBy('nama_lengkap')
            ->paginate(10)
            ->through(fn($user) => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'nama_lengkap' => $user->nama_lengkap,
                'no_telepon' => $user->no_telepon,
                'alamat' => $user->alamat,
                'is_active' => $user->is_active,
                'created_at' => $user->created_at?->format('d M Y'),
            ]);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:50|unique:users',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'nama_lengkap' => 'required|string|max:100',
            'no_telepon' => 'nullable|string|max:15',
            'alamat' => 'nullable|string',
        ]);

        User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'nama_lengkap' => $request->nama_lengkap,
            'no_telepon' => $request->no_telepon,
            'alamat' => $request->alamat,
            'role' => 'staf',
            'is_active' => true,
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'Akun staf berhasil ditambahkan');
    }

    public function edit(User $user)
    {
        // Cegah edit admin
        if ($user->role === 'admin') {
            return redirect()->route('admin.users.index')
                ->with('error', 'Tidak dapat mengedit akun admin');
        }

        return Inertia::render('Admin/Users/Edit', [
            'user' => [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'nama_lengkap' => $user->nama_lengkap,
                'no_telepon' => $user->no_telepon,
                'alamat' => $user->alamat,
                'is_active' => $user->is_active,
            ]
        ]);
    }

    public function update(Request $request, User $user)
    {
        // Cegah update admin
        if ($user->role === 'admin') {
            return redirect()->route('admin.users.index')
                ->with('error', 'Tidak dapat mengupdate akun admin');
        }

        $request->validate([
            'username' => 'required|string|max:50|unique:users,username,' . $user->id,
            'email' => 'required|string|email|max:100|unique:users,email,' . $user->id,
            'nama_lengkap' => 'required|string|max:100',
            'no_telepon' => 'nullable|string|max:15',
            'alamat' => 'nullable|string',
        ]);

        $user->update([
            'username' => $request->username,
            'email' => $request->email,
            'nama_lengkap' => $request->nama_lengkap,
            'no_telepon' => $request->no_telepon,
            'alamat' => $request->alamat,
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'Akun staf berhasil diupdate');
    }

    public function resetPassword(Request $request, User $user)
    {
        // Cegah reset password admin
        if ($user->role === 'admin') {
            return back()->with('error', 'Tidak dapat mereset password admin');
        }

        $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user->update([
            'password' => Hash::make($request->password)
        ]);

        return redirect()->route('admin.users.index')
            ->with('success', 'Password staf berhasil direset');
    }

    public function toggleActive(User $user)
    {
        // Cegah nonaktifkan diri sendiri
      

        // Cegah nonaktifkan admin
        if ($user->role === 'admin') {
            return back()->with('error', 'Tidak dapat menonaktifkan akun admin');
        }

        $user->update([
            'is_active' => !$user->is_active
        ]);

        $status = $user->is_active ? 'diaktifkan' : 'dinonaktifkan';
        return redirect()->route('admin.users.index')
            ->with('success', "Akun staf berhasil {$status}");
    }

    public function destroy(User $user)
    {
        // Cegah hapus admin
        if ($user->role === 'admin') {
            return back()->with('error', 'Tidak dapat menghapus akun admin');
        }

     
        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'Akun staf berhasil dihapus');
    }
}
