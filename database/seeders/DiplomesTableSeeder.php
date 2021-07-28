<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Diplome;

class DiplomesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Diplome::create([
            'demande_id' => '1',
            'etudiant_cin' => 'IJ345668',
            'statut' => 'créé et envoyé au service diplomes',
            'date_creationDossier_envoiAuServiceDiplome' => '2021-06-20'
        ]);


    }
}
