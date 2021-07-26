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
            'etudiant_cin' => 'AE009898',
            'statut' => 'cree',
            'date_creationDossier_envoiAuServiceDiplome' => '2021-06-20'
        ]);

        Diplome::create([
            'demande_id' => '2',
            'etudiant_cin' => 'AE345668',
            'statut' => 'cree',
            'date_creationDossier_envoiAuServiceDiplome' => '2020-05-26'
        ]);

        Diplome::create([
            'demande_id' => '3',
            'etudiant_cin' => 'AE345668',
            'statut' => 'cree',
            'date_creationDossier_envoiAuServiceDiplome' => now()
        ]);
    }
}
