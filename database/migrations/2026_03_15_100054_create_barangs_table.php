<?php
// database/migrations/2024_01_01_000003_create_barangs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('barangs', function (Blueprint $table) {
            $table->id();
            $table->string('kode_barang', 20)->unique();
            $table->string('nama_barang', 100);
            $table->string('slug', 120)->unique();
            $table->foreignId('kategori_id')->nullable()->constrained('kategoris')->nullOnDelete();
            $table->string('ukuran', 50)->nullable(); // Bisa diisi "S,M,L,XL" atau "38,39,40"
            $table->string('warna', 30)->nullable();
            $table->decimal('harga_sewa', 12, 2);
            $table->integer('stok')->default(1);
            $table->text('deskripsi')->nullable();
            $table->string('gambar_utama')->nullable();
            $table->json('gambar_lain')->nullable(); // Untuk multiple images
            $table->enum('status', ['tersedia', 'disewa', 'maintenance'])->default('tersedia');
            $table->integer('total_disewa')->default(0); // Counter popularitas
            $table->timestamps();

            // Indexes
            $table->index('kode_barang');
            $table->index('nama_barang');
            $table->index('slug');
            $table->index('status');
            $table->index('kategori_id');
            $table->index('harga_sewa');
        });
    }

    public function down()
    {
        Schema::dropIfExists('barangs');
    }
};
