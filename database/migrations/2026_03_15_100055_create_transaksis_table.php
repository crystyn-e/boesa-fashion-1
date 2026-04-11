<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('transaksis', function (Blueprint $table) {
            $table->id();
            $table->string('kode_transaksi', 20)->unique();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('pelanggan_id')->nullable()->constrained('pelanggan_customers')->nullOnDelete();
            $table->date('tgl_sewa');
            $table->date('tgl_harus_kembali');
            $table->date('tgl_kembali')->nullable();
            $table->decimal('total_harga', 12, 2);
            $table->decimal('dp', 12, 2);
            $table->decimal('sisa_pembayaran', 12, 2);
            $table->enum('deposit_tipe', ['uang', 'ktp']);
            $table->decimal('deposit_nominal', 12, 2)->nullable();
            $table->string('deposit_ktp', 50)->nullable();
            $table->enum('status_deposit', ['ditahan', 'dikembalikan'])->default('ditahan');
            $table->enum('status', ['pending', 'proses', 'sewa', 'selesai', 'batal'])->default('pending');
            $table->decimal('denda', 12, 2)->default(0);
            $table->integer('hari_terlambat')->default(0);
            $table->text('keterangan')->nullable();
            $table->string('bukti_bayar')->nullable();
            $table->timestamps();

            // Indexes
            $table->index('kode_transaksi');
            $table->index('status');
            $table->index('tgl_sewa');
            $table->index('tgl_harus_kembali');
            $table->index('user_id');
            $table->index('pelanggan_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('transaksis');
    }
};
