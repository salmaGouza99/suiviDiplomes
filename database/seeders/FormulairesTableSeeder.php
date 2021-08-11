<?php

namespace Database\Seeders;

use App\Models\Formulaire;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Crypt;

class FormulairesTableSeeder extends Seeder
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
            'lien' => 'https://forms.gle/VwdDr2EbcJXtL3Ni6',
            'api_id' => 'k66wmrh4rkfrh'
            //'api_id' =>'tuqovq24un3kx'
        ]);
        Formulaire::create([
            'type_formulaire' => 'Licence',
            'lien' => 'https://forms.gle/VdXwWqeNHuFT5YA9A',
            'api_id' => 'upxtu5n2f2asi'
            //'api_id' => 'dzpxm1gtt89z1'
        ]);
      
    }
}
