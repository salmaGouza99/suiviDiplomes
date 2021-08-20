<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Demande;
use App\Models\Diplome;
use Illuminate\Http\Request;


class DashboardController extends Controller
{
    public function currentYear()
    {
        //statistique de l'annee courante
        $currentYear = Carbon::now()->year;
        $demandesRecues = Demande::whereYear('date_demande', $currentYear)
            ->get()->count();
        $demandeTraites = Demande::whereYear('date_demande', $currentYear)->where('traite', '!=', '0')
            ->get()->count();
        $diplomesRetires = Diplome::whereYear('date_retraitDiplome_archiveDossier', Carbon::now()->year)
            ->get()->count();
        $diplomesReedites = Diplome::whereYear('date_reedition', Carbon::now()->year)
        ->get()->count();


        return response()->json([
            'results' => [
            'demandes_recues' => $demandesRecues,
            'demandes_traites' => $demandeTraites,
            'diplomes_retires' => $diplomesRetires,
            'diplomes_reedites' => $diplomesReedites,
            // 'total' => $demandesRecues + $demandeTraites + $diplomesRetires +$diplomesReedites
            ]
        ]);
    }

/**
 * Undocumented function
 *
 * @param [type] $type
 * @return void
 */
    public function dashboardByType($type){

        $nbrDemandes = Demande::where('type_demande', $type)->get()->count();
        $nbrDemandesTraites = Demande::where('type_demande', $type)
            ->where('traite', '!=', '0')->get()->count();

        $nbrDiplomesPrets = Demande::where('type_demande',$type)
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '6');
        })
            ->get()->count();

        $nbrDiplomesNonPrets = Demande::where('type_demande',$type)
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '1')
            ->orWhere('statut_id', '3')
            ->orWhere('statut_id', '4')
            ->orWhere('statut_id', '5');
        })
            ->get()->count();
        $nbrDiplomesRetires = Demande::where('type_demande',$type)
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '7');
        })
            ->get()->count();

        $nbrDiplomesReedites = Demande::where('type_demande',$type)
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '2');
        })
            ->get()->count();
            return response()->json([
                'results' => [
                    'demandes_recus' => $nbrDemandes,
                    'demandes_traitees' => $nbrDemandesTraites,
                    'diplomes_non_prets' => $nbrDiplomesNonPrets,
                    'diplomes_prets' => $nbrDiplomesPrets,
                    'diplomes_reedites' => $nbrDiplomesReedites,
                    'diplomes_retirees' => $nbrDiplomesRetires,
                ]
            ]);
    }

    /**
     * statistique par intervalle de temps (par DEUG ou Licence)
     *
     * @param date $date_debut
     * @param date $date_fin
     * @param string $type
     * @return void
     */
    public function filtredDashboard($date_debut = '', $date_fin = '', $type = '')
    {
        //statistique par intervalle de temps (par DEUG ou Licence)
        if ($date_debut == '' && $date_fin == '' && $type == '') {
            $nbrDemandes = Demande::get()->count();

            $nbrDemandesTraites = Demande::where('traite', '!=', '0')->get()->count();

            $nbrDiplomesPrets = Diplome::where('statut_id', '6')
                ->get()->count();

            $nbrDiplomesNonPrets = Diplome::where('statut_id', '1')
                ->orWhere('statut_id', '3')
                ->orWhere('statut_id', '4')
                ->orWhere('statut_id', '5')
                ->get()->count();

            $nbrDiplomesRetires = Diplome::where('statut_id', '7')->get()->count();

            $nbrDiplomesReedites = Diplome::where('statut_id', '2')->get()->count();

        }else {
                $nbrDemandes = Demande::where('type_demande', $type)
                    ->whereBetween('date_demande', [$date_debut, $date_fin])->get()->count();

                $nbrDemandesTraites = Demande::where('type_demande', $type)
                    ->whereBetween('date_demande', [$date_debut, $date_fin])
                    ->where('traite', '!=', '0')->get()->count();

                $nbrDiplomesPrets = Diplome::with(['demande' => function ($query) use($type) {
                    $query->where('type_demande', $type);
                }])
                    ->where('date_notificationEtudiant', '!=', null)
                    ->where('date_retraitDiplome_archiveDossier', null)
                    ->whereBetween('date_notificationEtudiant', [$date_debut, $date_fin])->get()->count();

                $nbrDiplomesNonPrets = Diplome::with(['demande' => function ($query) use($type) {
                    $query->where('type_demande',$type);
                }])
                    ->where('date_notificationEtudiant', null)
                    ->whereBetween('date_creationDossier_envoiAuServiceDiplome', [$date_debut, $date_fin])
                    ->get()->count();

                $nbrDiplomesRetires = Diplome::with(['demande' => function ($query) use($type) {
                    $query->where('type_demande', $type);
                }])
                    ->where('date_retraitDiplome_archiveDossier', '!=', null)
                    ->whereBetween('date_retraitDiplome_archiveDossier', [$date_debut, $date_fin])->get()->count();

                $nbrDiplomesReedites = Diplome::with(['demande' => function ($query) use($type) {
                    $query->where('type_demande', $type);
                }])
                    ->where('type_erreur', '!=', null)->where('date_reedition', '!=', null)
                    ->whereBetween('date_creationDossier_envoiAuServiceDiplome', [$date_debut, $date_fin])->get()->count();
            }
        
        return response()->json([
            'results' => [
                'demandes_recus' => $nbrDemandes,
                'demandes_traitees' => $nbrDemandesTraites,
                'diplomes_non_prets' => $nbrDiplomesNonPrets,
                'diplomes_prets' => $nbrDiplomesPrets,
                'diplomes_reedites' => $nbrDiplomesReedites,
                'diplomes_retirees' => $nbrDiplomesRetires,
            ]


        ]);
    }



    /**
     * Undocumented function
     *
     * @return void
     */
    public function currents()
    {
        
        ////DEUG
        $nbrDemandesDeug = Demande::where('type_demande', 'DEUG')
            ->where('traite', '0')->get()->count();


        $nbrDiplomesDeugCree = Demande::where('type_demande',"DEUG")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '1');
        })
            ->get()->count();

        $nbrDiplomesDeugReedite = Demande::where('type_demande',"DEUG")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '2');
        })
            ->get()->count();
        $nbrDiplomesDeugDecanat = Demande::where('type_demande',"DEUG")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '3');
        })
            ->get()->count();
        $nbrDiplomesDeugSignes = Demande::where('type_demande',"DEUG")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '4');
        })
            ->get()->count();
        $nbrDiplomesDeugPresidence = Demande::where('type_demande',"DEUG")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '5');
        })
            ->get()->count();
        $nbrDiplomesDeugRetrait = Demande::where('type_demande',"DEUG")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '6');
        })
            ->get()->count();
        $nbrDiplomesDeugRetire = Demande::where('type_demande',"DEUG")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '7');
        })
            ->get()->count();



        ////Licence
        $nbrDemandeslicence = Demande::where('type_demande', 'licence')
            ->where('traite', '0')->get()->count();

        $nbrDiplomeslicenceCree = Demande::where('type_demande',"licence")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '1');
        })
            ->get()->count();
        $nbrDiplomeslicenceReedite = Demande::where('type_demande',"licence")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '2');
        })
            ->get()->count();
        $nbrDiplomeslicenceDecanat = Demande::where('type_demande',"licence")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '3');
        })
            ->get()->count();
        $nbrDiplomeslicenceSignes = Demande::where('type_demande',"licence")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '4');
        })
            ->get()->count();
        $nbrDiplomeslicencePresidence = Demande::where('type_demande',"licence")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '5');
        })
            ->get()->count();
        $nbrDiplomeslicenceRetrait = Demande::where('type_demande',"licence")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '6');
        })
            ->get()->count();
        $nbrDiplomeslicenceRetires = Demande::where('type_demande',"licence")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '7');
        })
            ->get()->count();

        return response()->json([
            'results' => [
                ///////////////DEUG///////////////
                'nbrDemandesDeug' => $nbrDemandesDeug,
                'nbrDiplomesDeugCree' => $nbrDiplomesDeugCree,
                'nbrDiplomesDeugReedite' => $nbrDiplomesDeugReedite,
                'nbrDiplomesDeugDecanat' => $nbrDiplomesDeugDecanat,
                'nbrDiplomesDeugSignes' => $nbrDiplomesDeugSignes,
                'nbrDiplomesDeugPresidence' => $nbrDiplomesDeugPresidence,
                'nbrDiplomesDeugRetrait' => $nbrDiplomesDeugRetrait,
                'nbrDiplomesDeugRetire' => $nbrDiplomesDeugRetire,
                //////////////////LIcence//////////////////////
                'nbrDemandeslicence' => $nbrDemandeslicence,
                'nbrDiplomeslicenceCree' => $nbrDiplomeslicenceCree,
                'nbrDiplomeslicenceReedite' => $nbrDiplomeslicenceReedite,
                'nbrDiplomeslicenceDecanat' => $nbrDiplomeslicenceDecanat,
                'nbrDiplomeslicenceSignes' => $nbrDiplomeslicenceSignes,
                'nbrDiplomeslicencePresidence' => $nbrDiplomeslicencePresidence,
                'nbrDiplomeslicenceRetrait' => $nbrDiplomeslicenceRetrait,
                'nbrDiplomeslicenceRetires' => $nbrDiplomeslicenceRetires,



            ]
        ]);
    }
}
