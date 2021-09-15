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
            'filiere' => 'القانون باللغة العربية',
            'option' => 'قانون الأعمال',
            'nationalite' => 'مغربي',
            'date_naiss' => '1999-07-08',
            'lieu_naiss' => 'الرباط',
            'email_inst' => 'Ahmed.elmadani@um5.ac.ma'
        ]);
        Etudiant::create([
            'cin' => 'AB222222',
            'apogee' => '1507644',
            'cne' => 'J11119776',
            'nom' => 'ELIDRISSI',
            'prenom' => 'Maha',
            'nom_arabe' => 'الادريسي',
            'prenom_arabe' => 'مها',
            'filiere' => 'Droit en français',
            'option' => 'Droit Privé',
            'nationalite' => 'Marocaine',
            'date_naiss' => '1996-05-22',
            'lieu_naiss' => 'مراكش',
            'email_inst' => 'Maha.elidrissi@um5.ac.ma'
        ]);
        Etudiant::create([
            'cin' => 'WA111111',
            'apogee' => '1702355',
            'cne' => 'J5432299',
            'nom' => 'FAOUZI',
            'prenom' => 'Amal',
            'nom_arabe' => 'فوزي',
            'prenom_arabe' => 'أمال',
            'filiere' => 'Sciences Economiques et Gestion',
            'option' => 'Finance Comptabilité',
            'nationalite' => 'Marocaine',
            'date_naiss' => '1998-01-11',
            'lieu_naiss' => 'سلا',
            'email_inst' => 'Amal.faouzi@um5.ac.ma'
        ]);
        Etudiant::create([
            'cin' => 'AE4355789',
            'apogee' => '15008877',
            'cne' => 'J1309776',
            'nom' => 'JOADANI',
            'prenom' => 'Mustafa',
            'nom_arabe' => 'جعداني',
            'prenom_arabe' => 'مصطفى',
            'filiere' => 'القانون باللغة العربية',
            'nationalite' => 'مغربي',
            'date_naiss' => '1999-12-08',
            'lieu_naiss' => 'الرباط',
            'email_inst' => 'Mustafa.joadani@um5.ac.ma'
        ]);
    }
}