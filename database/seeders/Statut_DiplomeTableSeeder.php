<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Statut_DiplomeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('statut_diplome')->insert([
            'statut' => 'Créé et envoyé au service diplômes',
        ]);
        DB::table('statut_diplome')->insert([
            'statut' => 'Réédité',
        ]);
        DB::table('statut_diplome')->insert([
            'statut' => 'Imprimé et envoyé au décanat',
        ]);
        DB::table('statut_diplome')->insert([
            'statut' => 'Signé et renvoyé au service de diplômes',
        ]);
        DB::table('statut_diplome')->insert([
            'statut' => 'Envoyé à la présidence',
        ]);
        DB::table('statut_diplome')->insert([
            'statut' => 'Reçu par bureau d\'ordre et envoyé au guichet de retrait',
        ]);
        DB::table('statut_diplome')->insert([
            'statut' => 'Diplôme prêt à retirer (étudiant notifié)',
        ]);
        DB::table('statut_diplome')->insert([
            'statut' => 'Diplôme retiré et dossier archivé',
        ]);
    }
}