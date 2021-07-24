<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEtudiantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('etudiants', function (Blueprint $table) {
            $table->string('cin');
            $table->primary('cin');
            $table->string('apogee');
            $table->string('cne');
            $table->string('nom');
            $table->string('prenom');
            $table->string('nom_arabe');
            $table->string('prenom_arabe');
            $table->string('filiere');
            $table->string('option');
            $table->string('nationalite');
            $table->date('date_naiss');
            $table->string('lieu_naiss');
            $table->string('email_inst');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('etudiants');
    }
}
