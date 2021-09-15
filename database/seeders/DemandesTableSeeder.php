<?php

namespace Database\Seeders;

use Carbon\Carbon;
use SheetDB\SheetDB;
use App\Models\Demande;
use App\Models\Etudiant;
use App\Models\Formulaire;
use Illuminate\Database\Seeder;

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
            'etudiant_cin' => 'AB345668',
            'type_demande' => 'DEUG',
            'date_demande' => '2021-06-01',     
        ]);
        Demande::create([
            'etudiant_cin' => 'AB345668',
            'type_demande' => 'Licence',
            'date_demande' => '2020-05-17',     
        ]);
        Demande::create([
            'etudiant_cin' => 'AB222222',
            'type_demande' => 'DEUG',
            'date_demande' => '2020-05-22',     
        ]);
        Demande::create([
            'etudiant_cin' => 'AB222222',
            'type_demande' => 'Licence',
            'date_demande' => '2021-07-03',     
        ]);
        Demande::create([
            'etudiant_cin' => 'WA111111',
            'type_demande' => 'DEUG',
            'date_demande' => '2020-06-01',     
        ]);
        Demande::create([
            'etudiant_cin' => 'WA111111',
            'type_demande' => 'Licence',
            'date_demande' => '2021-07-23',     
        ]);
        Demande::create([
            'etudiant_cin' => 'AE4355789',
            'type_demande' => 'DEUG',
            'date_demande' => '2021-07-23',     
        ]);
    }
}
