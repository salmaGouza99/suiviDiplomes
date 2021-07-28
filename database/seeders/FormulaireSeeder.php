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
            'lien' =>Str::random(50),
            'api_id' =>'tuqovq24un3kx'
        ]);
        Formulaire::create([
            'type_formulaire' => 'Licence',
            'lien' =>Str::random(50),
            'api_id' => 'dzpxm1gtt89z1'
        ]);
      
    }
}
