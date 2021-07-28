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
            'etudiant_cin' => 'IJ345668',
            'type_demande' => 'deug',
            'date_demande' => '2021-06-01',
            
        ]);

            
    }
}
