<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('institutes', function (Blueprint $table) {
            $table->text('institute_desc', 500)->nullable()->after('institute_pic_name');
        });
    }

    public function down(): void
    {
        Schema::table('institutes', function (Blueprint $table) {
            $table->dropColumn('institute_desc');
        });
    }
};
