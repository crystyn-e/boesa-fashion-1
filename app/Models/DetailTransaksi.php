<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailTransaksi extends Model
{
    use HasFactory;

    protected $table = 'detail_transaksis';

    protected $fillable = [
        'transaksi_id',
        'barang_id',
        'harga_sewa',
        'ukuran',
        'status_kembali',
        'tgl_kembali_aktual',
        'kondisi'
    ];

    protected $casts = [
        'tgl_kembali_aktual' => 'date',
        'harga_sewa' => 'decimal:2'
    ];

    // Relasi ke transaksi
    public function transaksi()
    {
        return $this->belongsTo(Transaksi::class);
    }

    // Relasi ke barang
    public function barang()
    {
        return $this->belongsTo(Barang::class);
    }

    // Scope yang belum kembali
    public function scopeBelumKembali($query)
    {
        return $query->where('status_kembali', 'belum');
    }

    // Scope yang sudah kembali
    public function scopeSudahKembali($query)
    {
        return $query->where('status_kembali', 'sudah');
    }
}
