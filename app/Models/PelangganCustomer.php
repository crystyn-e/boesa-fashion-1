<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PelangganCustomer extends Model
{
    use HasFactory;

    protected $table = 'pelanggan_customers';

    protected $fillable = [
        'nama',
        'no_telepon',
        'nik',
        'alamat',
        'total_transaksi'
    ];

    protected $casts = [
        'total_transaksi' => 'integer'
    ];

    // Relasi ke transaksi
    public function transaksis()
    {
        return $this->hasMany(Transaksi::class, 'pelanggan_id');
    }

    // Scope pencarian
    public function scopeCari($query, $search)
    {
        return $query->where('nama', 'LIKE', "%{$search}%")
            ->orWhere('no_telepon', 'LIKE', "%{$search}%")
            ->orWhere('nik', 'LIKE', "%{$search}%");
    }

    // Update total transaksi
    public function updateTotalTransaksi()
    {
        $this->total_transaksi = $this->transaksis()->count();
        $this->save();
    }
}
