<?php

namespace Database\Seeders;

use App\Models\Formulaire;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Crypt;

class FormulaireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Formulaire::create([
            'type_formulaire' => 'DEUG',
            'filiere' =>'Droit arabe',
            'lien' =>Str::random(50),
        ]);
        Formulaire::create([
            'type_formulaire' => 'Licence',
            'filiere' =>'Droit arabe',
            'lien' =>Str::random(50),
        ]);
        Formulaire::create([
            'type_formulaire' => 'DEUG',
            'filiere' =>'Droit français',
            'lien' =>Str::random(50),
        ]);
        Formulaire::create([
            'type_formulaire' => 'licence',
            'filiere' =>'Droit français',
            'lien' =>Str::random(50),
        ]);
        Formulaire::create([
            'type_formulaire' => 'DEUG',
            'filiere' =>'Economie',
            'lien' =>Str::random(50),
        ]);
        Formulaire::create([
            'type_formulaire' => 'licence',
            'filiere' =>'Economie',
            'lien' =>Str::random(50),
        ]);
    }
}
