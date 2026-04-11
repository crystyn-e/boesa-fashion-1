<?php
// database/migrations/2024_01_01_000001_create_users_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username', 50)->unique();
            $table->string('password');
            $table->string('email', 100)->nullable()->unique();
            $table->string('nama_lengkap', 100);
            $table->string('no_telepon', 15)->nullable();
            $table->text('alamat')->nullable();
            $table->enum('role', ['admin', 'staf'])->default('staf'); // Hanya admin & staf
            $table->boolean('is_active')->default(true);
            $table->rememberToken();
            $table->timestamps();

            // Indexes
            $table->index('role');
            $table->index('username');
            $table->index('is_active');
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};
