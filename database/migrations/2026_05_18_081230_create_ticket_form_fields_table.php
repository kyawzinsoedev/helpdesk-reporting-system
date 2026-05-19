<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ticket_form_fields', function (Blueprint $table) {
            $table->id();

            $table->foreignId('ticket_form_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('label');   // "Subject"
            $table->string('name');    // "subject"
            $table->string('type');    // text, textarea, select

            $table->boolean('required')->default(false);

            $table->json('options')->nullable(); // for select

            $table->integer('sort_order')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_form_fields');
    }
};
