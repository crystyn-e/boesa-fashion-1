<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;

    protected $fillable = [
        'kode_transaksi',
        'user_id',
        'pelanggan_id',
        'tgl_sewa',
        'tgl_harus_kembali',
        'tgl_kembali',
        'total_harga',
        'dp',
        'sisa_pembayaran',
        'deposit_tipe',
        'deposit_nominal',
        'deposit_ktp',
        'status_deposit',
        'status',
        'denda',
        'hari_terlambat',
        'keterangan',
        'bukti_bayar',
        // Field baru
        'metode_pembayaran',
        'bukti_transfer',
        'status_pembayaran',
        'tanggal_lunas',
        'dikonfirmasi_oleh',
    ];

    protected $casts = [
        'tgl_sewa' => 'date',
        'tgl_harus_kembali' => 'date',
        'tgl_kembali' => 'date',
        'total_harga' => 'decimal:2',
        'dp' => 'decimal:2',
        'sisa_pembayaran' => 'decimal:2',
        'denda' => 'decimal:2',
        'hari_terlambat' => 'integer',
        'tanggal_lunas' => 'datetime',
    ];

    // Relasi ke user (staf yang melayani)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke pelanggan
    public function pelanggan()
    {
        return $this->belongsTo(PelangganCustomer::class);
    }

    // Relasi ke detail transaksi
    public function detailTransaksis()
    {
        return $this->hasMany(DetailTransaksi::class);
    }

    // Relasi ke barang melalui detail
    public function barangs()
    {
        return $this->belongsToMany(Barang::class, 'detail_transaksis')
            ->withPivot('harga_sewa', 'ukuran', 'status_kembali', 'tgl_kembali_aktual')
            ->withTimestamps();
    }

    // Relasi ke user yang mengkonfirmasi transfer
    public function konfirmator()
    {
        return $this->belongsTo(User::class, 'dikonfirmasi_oleh');
    }

    // Scope transaksi aktif
    public function scopeAktif($query)
    {
        return $query->whereIn('status', ['proses', 'sewa']);
    }

    // Scope transaksi hari ini
    public function scopeHariIni($query)
    {
        return $query->whereDate('created_at', today());
    }

    // Scope yang harus kembali hari ini
    public function scopeHarusKembaliHariIni($query)
    {
        return $query->whereDate('tgl_harus_kembali', today())
            ->where('status', 'sewa');
    }

    // Hitung denda otomatis
    public function hitungDenda()
    {
        if ($this->tgl_kembali && $this->tgl_kembali > $this->tgl_harus_kembali) {
            $selisih = $this->tgl_kembali->diffInDays($this->tgl_harus_kembali);
            return $selisih * 50000;
        }
        return 0;
    }

    // Cek apakah semua barang sudah kembali
    public function semuaBarangKembali()
    {
        return $this->detailTransaksis()
            ->where('status_kembali', 'belum')
            ->count() == 0;
    }

    // Cek apakah transaksi sudah lunas
    public function isLunas()
    {
        return $this->status_pembayaran === 'lunas';
    }

    // Cek apakah bisa diambil
    public function bisaDiambil()
    {
        return $this->status === 'proses' && $this->isLunas();
    }
}
