<?php
// database/migrations/2024_01_01_000006_create_detail_transaksis_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('detail_transaksis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaksi_id')->constrained()->cascadeOnDelete();
            $table->foreignId('barang_id')->constrained()->cascadeOnDelete();
            $table->decimal('harga_sewa', 12, 2); // Harga saat transaksi
            $table->string('ukuran', 50)->nullable(); // Ukuran yang dipilih customer
            $table->enum('status_kembali', ['belum', 'sudah'])->default('belum');
            $table->date('tgl_kembali_aktual')->nullable();
            $table->text('kondisi')->nullable(); // Catatan kondisi barang saat kembali
            $table->timestamps();

            // Unique constraint
            $table->unique(['transaksi_id', 'barang_id'], 'detail_transaksi_unique');

            // Indexes
            $table->index('status_kembali');
            $table->index('transaksi_id');
            $table->index('barang_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('detail_transaksis');
    }
};
