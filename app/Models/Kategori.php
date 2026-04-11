<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Kategori extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_kategori',
        'slug',
        'deskripsi',
        'icon',
        'urutan',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'urutan' => 'integer'
    ];

    // Auto generate slug
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($kategori) {
            $kategori->slug = Str::slug($kategori->nama_kategori);
        });
        static::updating(function ($kategori) {
            $kategori->slug = Str::slug($kategori->nama_kategori);
        });
    }

    // Relasi ke barang
    public function barangs()
    {
        return $this->hasMany(Barang::class);
    }

    // Scope aktif
    public function scopeAktif($query)
    {
        return $query->where('is_active', true);
    }

    // Scope urut berdasarkan urutan
    public function scopeUrut($query)
    {
        return $query->orderBy('urutan')->orderBy('nama_kategori');
    }
}
