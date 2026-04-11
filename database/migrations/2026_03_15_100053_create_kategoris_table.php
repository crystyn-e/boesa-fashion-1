<?php
// database/migrations/2024_01_01_000002_create_kategoris_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('kategoris', function (Blueprint $table) {
            $table->id();
            $table->string('nama_kategori', 50)->unique();
            $table->string('slug', 60)->unique();
            $table->text('deskripsi')->nullable();
            $table->string('icon')->nullable();
            $table->integer('urutan')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index('nama_kategori');
            $table->index('slug');
            $table->index('is_active');
        });
    }

    public function down()
    {
        Schema::dropIfExists('kategoris');
    }
};
