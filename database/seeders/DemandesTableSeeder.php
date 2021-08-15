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
            'etudiant_cin' => 'AB222222',
            'type_demande' => 'DEUG',
            'date_demande' => '2021-06-01',     
        ]);
        Demande::create([
            'etudiant_cin' => 'AB222222',
            'type_demande' => 'licence',
            'date_demande' => '2021-06-01',     
        ]);
        Demande::create([
            'etudiant_cin' => 'AB345668',
            'type_demande' => 'licence',
            'date_demande' => '2021-06-01',     
        ]);
        Demande::create([
            'etudiant_cin' => 'WA11111111',
            'type_demande' => 'DEUG',
            'date_demande' => '2021-06-01',     
        ]);
        Demande::create([
            'etudiant_cin' => 'WA11111111',
            'type_demande' => 'licence',
            'date_demande' => '2021-06-01',     
        ]);

        /* foreach(Formulaire::all() as $form)
        {
            $sheetdb = new SheetDB($form->api_id);
                foreach ($sheetdb->get() as $row)
                {
                    
                    if(sizeof(Demande::where('etudiant_cin',$row->cin)
                        ->where('type_demande',$row->type_demande)->get())==0)
                    {
                        Demande::create([
                                'etudiant_cin' => $row->cin,
                                'type_demande' => $row->type_demande,
                                'date_demande' =>Carbon::createFromFormat('d/m/Y H:i:s', $row->Horodateur)->format('Y-m-d'),
                        ]);
                    }
                   
                } 
        } */
            
    }
}
