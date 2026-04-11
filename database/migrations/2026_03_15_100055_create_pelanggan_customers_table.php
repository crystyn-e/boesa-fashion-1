<?php
// database/migrations/2024_01_01_000004_create_pelanggan_customers_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pelanggan_customers', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 100);
            $table->string('no_telepon', 15)->nullable();
            $table->string('nik', 20)->nullable(); // Untuk deposit KTP
            $table->text('alamat')->nullable();
            $table->integer('total_transaksi')->default(0);
            $table->timestamps();

            $table->index('nama');
            $table->index('no_telepon');
            $table->index('nik');
        });
    }

    public function down()
    {
        Schema::dropIfExists('pelanggan_customers');
    }
};
