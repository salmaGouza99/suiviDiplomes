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
            'cin' => 'AE345668',
            'apogee' => '15008877',
            'cne' => 'J1309776',
            'nom' => 'ELMADANI',
            'prenom' => 'Ahmed',
            'nom_arabe' => 'المدني',
            'prenom_arabe' => 'احمد',
            'filiere' => 'Droit francais حقوق فرنسية',
            'option' => 'Francais فرنسية',
            'nationalite' => 'Marocain',
            'date_naiss' => '1999-07-08',
            'lieu_naiss' => 'Rabat',
            'email_inst' => 'Ahmed.el@um5.ac.ma'
        ]);

        Etudiant::create([
            'cin' => 'AE009898',
            'apogee' => '15000433',
            'cne' => 'J133300',
            'nom' => 'ELIDRISSI',
            'prenom' => 'Amal',
            'nom_arabe' => 'الادريسي',
            'prenom_arabe' => 'امال',
            'filiere' => 'Droit arabe حقوق عربية',
            'option' => 'Arabe عربية',
            'nationalite' => 'مغربية',
            'date_naiss' => '1999-06-01',
            'lieu_naiss' => 'الدار البيضاء',
            'email_inst' => 'Amal.el@um5.ac.ma'
        ]);
    }
}
