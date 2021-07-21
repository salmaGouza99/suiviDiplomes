<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfilSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('profils')->insert([
            'id' => 1,
            'nomProfil' => 'admin',                
        ]);
        DB::table('profils')->insert([
            'id' => 2,
            'nomProfil' => 'guichet_droit_arabe',                
        ]);
        DB::table('profils')->insert([
            'id' => 3,
            'nomProfil' => 'guichet_droit_francais',                
        ]);
        DB::table('profils')->insert([
            'id' => 4,
            'nomProfil' => 'guichet_economie',                
        ]);
        DB::table('profils')->insert([
            'id' => 5,
            'nomProfil' => 'service_diplomes',                
        ]);
        DB::table('profils')->insert([
            'id' => 6,
            'nomProfil' => 'decanat',                
        ]);
        DB::table('profils')->insert([
            'id' => 7,
            'nomProfil' => 'bureau_ordre',                
        ]);
        DB::table('profils')->insert([
            'id' => 8,
            'nomProfil' => 'guichet_retrait',                
        ]);
    }
}
