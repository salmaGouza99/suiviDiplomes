<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Demande;

class DemandesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Demande::create([
            'etudiant_cin' => 'AE009898',
            'type_demande' => 'diplome de deug',
            'date_demande' => '2021-06-01',
            'diplome_cree' => 1
        ]);

        Demande::create([
            'etudiant_cin' => 'AE345668',
            'type_demande' => 'diplome de deug',
            'date_demande' => '2020-05-13',
            'diplome_cree' => 1
        ]);

        Demande::create([
            'etudiant_cin' => 'AE345668',
            'type_demande' => 'diplome de licence',
            'date_demande' => '2021-06-22',
            'diplome_cree' => 0
        ]);
            
    }
}
