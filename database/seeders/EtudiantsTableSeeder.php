<?php

namespace Database\Seeders;

use Carbon\Carbon;
use SheetDB\SheetDB;
use App\Models\Demande;
use App\Models\Etudiant;
use App\Models\Formulaire;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

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
            'cin' => 'AB345668',
            'apogee' => '17008877',
            'cne' => 'J1209776',
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
        Etudiant::create([
            'cin' => 'AB222222',
            'apogee' => '11111177',
            'cne' => 'J11119776',
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
        Etudiant::create([
            'cin' => 'WA11111111',
            'apogee' => '0000444222',
            'cne' => '1113334567',
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
         Etudiant::create([
            'cin' => 'IJ345655',
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
        
        /* foreach(Formulaire::all() as $form)
        {
            $sheetdb = new SheetDB($form->api_id);
                foreach ($sheetdb->get() as $row)
                {
                    // $etudiantExistant=Etudiant::where('cin',$row->cin)->get();
                    // $demandeExistante=Demande::where('etudiant_cin',$row->cin)
                    //         ->where('type_demande',$row->type_demande)->get();

                    if(sizeof(Etudiant::where('cin',$row->cin)->get())==0)
                    {
                        Etudiant::create([
                            'cin' => $row->cin,
                            'apogee' => $row->apogee,
                            'cne' => $row->cne,
                            'nom' => Str::upper($row->nom),
                            'prenom' => $row->prenom,
                            'nom_arabe' => $row->nom_arabe,
                            'prenom_arabe' => $row->prenom_arabe,
                            'filiere' => $row->filiere,
                            'option' => $row->option,
                            'nationalite' =>$row->nationalite,
                            'date_naiss' => Carbon::createFromFormat('d/m/Y', $row->date_de_naissance)->format('Y-m-d'),
                            'lieu_naiss' => $row->lieu_de_naissance,
                            'email_inst' => $row->email_intitutionnel,
                        ]);
                    }
                }

      
        } */
    }
}