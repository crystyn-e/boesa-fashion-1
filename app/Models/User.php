<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Transaksi; // <-- DITAMBAHKAN

/**
 * @property int $id
 * @property string $username
 * @property string $email
 * @property string $password
 * @property string $nama_lengkap
 * @property string|null $no_telepon
 * @property string|null $alamat
 * @property string $role
 * @property bool $is_active
 * @property string|null $remember_token
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'username',
        'email',
        'password',
        'nama_lengkap',
        'no_telepon',
        'alamat',
        'role',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the transaksis for the user.
     */
    public function transaksis()
    {
        return $this->hasMany(Transaksi::class, 'user_id');
    }

    /**
     * Scope a query to only include active users.
     */
    public function scopeAktif($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include users with specific role.
     */
    public function scopeRole($query, $role)
    {
        return $query->where('role', $role);
    }

    /**
     * Check if user is admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user is staf.
     */
    public function isStaf(): bool
    {
        return $this->role === 'staf';
    }

    /**
     * Get the user's full name.
     */
    public function getFullNameAttribute(): string
    {
        return $this->nama_lengkap;
    }

    /**
     * Get the user's role in Indonesian.
     */
    public function getRoleNameAttribute(): string
    {
        return $this->role === 'admin' ? 'Administrator' : 'Staf';
    }

    /**
     * Get the user's status badge class.
     */
    public function getStatusBadgeAttribute(): string
    {
        return $this->is_active
            ? '<span class="badge bg-success">Aktif</span>'
            : '<span class="badge bg-danger">Tidak Aktif</span>';
    }
}
