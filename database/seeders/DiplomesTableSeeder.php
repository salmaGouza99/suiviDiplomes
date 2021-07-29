<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Diplome;

class DiplomesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Diplome::create([
            'demande_id' =>'1',
            'etudiant_cin' => 'AE12300',
            'statut' => 'créé et envoyé au service diplomes',
            'date_creationDossier_envoiAuServiceDiplome' => '2021-06-20'
        ]);
        Diplome::create([
            'demande_id' =>'2',
            'etudiant_cin' => 'AE12301',
            'statut' => 'créé et envoyé au service diplomes',
            'date_creationDossier_envoiAuServiceDiplome' => '2021-06-20'
        ]);
        Diplome::create([
            'demande_id' =>'3',
            'etudiant_cin' => 'AE12302',
            'statut' => 'créé et envoyé au service diplomes',
            'date_creationDossier_envoiAuServiceDiplome' => '2021-06-20'
        ]);
        Diplome::create([
            'demande_id' =>'4',
            'etudiant_cin' => 'AE12303',
            'statut' => 'créé et envoyé au service diplomes',
            'date_creationDossier_envoiAuServiceDiplome' => '2021-06-20'
        ]);
        Diplome::create([
           'demande_id' =>'5',
            'etudiant_cin' => 'AE12389',
            'statut' => 'créé et envoyé au service diplomes',
            'date_creationDossier_envoiAuServiceDiplome' => '2021-06-20'
        ]);
        Diplome::create([
           'demande_id' =>'6',
            'etudiant_cin' => 'AE12390',
            'statut' => 'créé et envoyé au service diplomes',
            'date_creationDossier_envoiAuServiceDiplome' => '2021-06-20'
        ]);
        Diplome::create([
           'demande_id' =>'7',
            'etudiant_cin' => 'AE12391',
            'statut' => 'créé et envoyé au service diplomes',
            'date_creationDossier_envoiAuServiceDiplome' => '2021-06-20'
        ]);

        Diplome::create([
           'demande_id' =>'8',
            'etudiant_cin' => 'AE12392',
            'statut' => 'créé et envoyé au service diplomes',
            'date_creationDossier_envoiAuServiceDiplome' => '2021-06-20'
        ]);
        Diplome::create([
            'demande_id' =>'9',
             'etudiant_cin' => 'AE12300',
             'statut' => 'créé et envoyé au service diplomes',
             'date_creationDossier_envoiAuServiceDiplome' => '2021-06-20'
         ]);
         Diplome::create([
            'demande_id' =>'10',
             'etudiant_cin' => 'AE12301',
             'statut' => 'créé et envoyé au service diplomes',
             'date_creationDossier_envoiAuServiceDiplome' => '2021-06-20'
         ]);


    }
}
