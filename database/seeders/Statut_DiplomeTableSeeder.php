<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Statut_DiplomeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('statut_diplome')->insert([
            'statut' => 'créé et envoyé au service diplômes',
        ]);
        DB::table('statut_diplome')->insert([
            'statut' => 'réédité',
        ]);
        DB::table('statut_diplome')->insert([
            'statut' => 'imprimé et envoyé au décanat',
        ]);
        DB::table('statut_diplome')->insert([
            'statut' => 'signé et renvoyé au service de diplômes',
        ]);
        DB::table('statut_diplome')->insert([
            'statut' => 'envoyé à la présidence',
        ]);
        DB::table('statut_diplome')->insert([
            'statut' => 'recu et envoyé au ghuichet de retrait',
        ]);
        DB::table('statut_diplome')->insert([
            'statut' => 'diplôme retiré et dossier archivé',
        ]);
    }
}
