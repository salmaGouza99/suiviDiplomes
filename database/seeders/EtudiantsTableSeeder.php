<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Etudiant;

class EtudiantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Etudiant::create([
            'cin' => 'IJ345668',
            'apogee' => '15008877',
            'cne' => 'J1309776',
            'nom' => 'ELMADANI',
            'prenom' => 'Ahmed',
            'nom_arabe' => 'المدني',
            'prenom_arabe' => 'احمد',
            'filiere' => 'Droit ',
            'option' => 'Francais',
            'nationalite' => 'Marocain',
            'date_naiss' => '1999-07-08',
            'lieu_naiss' => 'Rabat',
            'email_inst' => 'Ahmed.el@um5.ac.ma'
        ]);

      
    }
}
