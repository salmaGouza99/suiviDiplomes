<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDiplomesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('diplomes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->String('etudiant_cin')->unique();
            $table->foreign('etudiant_cin')->references('cin')->on('etudiants')->onDelete('cascade');
            $table->unsignedBigInteger('demande_id')->unique();
            $table->foreign('demande_id')->references('id')->on('demandes')->onDelete('cascade');
            $table->string('type_diplome');
            $table->string('statut');
            $table->date('date_creationDossier_envoiAuServiceDiplome');
            $table->date('date_impression_envoiAuDecanat')->nullable();
            $table->date('date_singature_renvoiAuServiceDiplome')->nullable();
            $table->date('date_generationBorodeaux_envoiApresidence')->nullable();
            $table->date('date_receptionParBureauOrdre_envoiAuGuichetRetrait')->nullable();
            $table->date('date_notificationetudiant')->nullable();
            $table->date('date_retraitDiplome_archiveDossier')->nullable();
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
        Schema::dropIfExists('diplomes');
    }
}
