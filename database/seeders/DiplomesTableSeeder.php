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
            'demande_id' => 1,
            'etudiant_cin' => 'AB345668',
            'date_creationDossier_envoiAuServiceDiplome' => '2021-06-20'
        ]);
        Diplome::create([
            'demande_id' => 3,
            'etudiant_cin' => 'AB222222',
            'date_creationDossier_envoiAuServiceDiplome' => '2020-05-30'
        ]);
    }
}
