<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Demande;
use App\Models\Diplome;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;


class DashboardController extends Controller
{
    /**
     * statistiques de l'annee courante
     *
     * @return \Illuminate\Http\Response 
     */
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
            ]
        ]);
    }

    /**
     * Dashboard By Type
     *
     * @param string $type
     * @return \Illuminate\Http\Response 
     */
    public function dashboardByType($type){

        $nbrDemandes = Demande::where('type_demande', $type)->get()->count();
        $nbrDemandesTraites = Demande::where('type_demande', $type)
            ->where('traite', '!=', '0')->get()->count();

        $nbrDiplomesPrets = Demande::where('type_demande',$type)
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '7');
        })
            ->get()->count();

        $nbrDiplomesNonPrets = Demande::where('type_demande',$type)
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '1')
            ->orWhere('statut_id', '2')
            ->orWhere('statut_id', '3')
            ->orWhere('statut_id', '4')
            ->orWhere('statut_id', '5')
            ->orWhere('statut_id', '6');
        })
            ->get()->count();
        $nbrDiplomesRetires = Demande::where('type_demande',$type)
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '8');
        })
            ->get()->count();

        $nbrDiplomesReedites = Demande::where('type_demande',$type)
        ->whereHas('diplome', function ($query)  {
            $query->where('type_erreur', '!=', null)
            ->where('date_reedition', '!=', null);
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
     * statistiques par intervalle de temps (pour DEUG ou Licence)
     *
     * @param date $date_debut
     * @param date $date_fin
     * @param string $type
     * @return \Illuminate\Http\Response 
     */
    public function filtredDashboard($date_debut = '', $date_fin = '', $type = '')
    {
        //statistique par intervalle de temps (pour DEUG ou Licence)
        if ($date_debut == '' && $date_fin == '' && $type == '') {
            $nbrDemandes = Demande::get()->count();

            $nbrDemandesTraites = Demande::where('traite', '!=', '0')
                                ->get()->count();

            $nbrDiplomesPrets = Diplome::where('statut_id', '7')
                                ->get()->count();

            $nbrDiplomesNonPrets = Diplome::where('statut_id', '1')
                ->orWhere('statut_id', '2')
                ->orWhere('statut_id', '3')
                ->orWhere('statut_id', '4')
                ->orWhere('statut_id', '5')
                ->orWhere('statut_id', '6')
                ->get()->count();

            $nbrDiplomesRetires = Diplome::where('statut_id', '8')
                                    ->get()->count();

            $nbrDiplomesReedites = Diplome::where('type_erreur', '!=', null)
                                    ->where('date_reedition', '!=', null)
                                    ->get()->count();

        }else {
                $nbrDemandes = Demande::where('type_demande', $type)
                    ->whereBetween('date_demande', [$date_debut, $date_fin])
                    ->get()->count();

                $nbrDemandesTraites = Demande::where('type_demande', $type)
                    ->whereBetween('date_demande', [$date_debut, $date_fin])
                    ->where('traite', '!=', '0')
                    ->get()->count();

                $nbrDiplomesPrets = DB::table('demandes as dm')
                    ->join('diplomes as d', 'dm.id', '=', 'd.demande_id')
                    ->where('dm.type_demande', $type)
                    ->whereBetween('dm.date_demande', [$date_debut, $date_fin])
                    ->where('d.statut_id', '7')
                    ->get()->count();

                $nbrDiplomesNonPrets = DB::table('demandes as dm')
                    ->join('diplomes as d', 'dm.id', '=', 'd.demande_id')
                    ->where('dm.type_demande', $type)
                    ->whereBetween('dm.date_demande', [$date_debut, $date_fin])
                    ->where('d.date_notificationEtudiant',null)
                    ->get()->count();

                $nbrDiplomesRetires = DB::table('demandes as dm')
                    ->join('diplomes as d', 'dm.id', '=', 'd.demande_id')
                    ->where('dm.type_demande', $type)
                    ->whereBetween('dm.date_demande', [$date_debut, $date_fin])
                    ->where('d.statut_id', '8')
                    ->get()->count();

                $nbrDiplomesReedites = DB::table('demandes as dm')
                    ->join('diplomes as d', 'dm.id', '=', 'd.demande_id')
                    ->where('dm.type_demande', $type)
                    ->whereBetween('dm.date_demande', [$date_debut, $date_fin])
                    ->where('d.type_erreur', '!=', null)
                    ->where('d.date_reedition', '!=', null)
                    ->get()->count();
            }
        
        return response()->json([
            'results' => [
                'demandes_recus' => $nbrDemandes,
                'demandes_traitees' => $nbrDemandesTraites,
                'diplomes_non_prets' => $nbrDiplomesNonPrets,
                'diplomes_reedites' => $nbrDiplomesReedites,
                'diplomes_prets' => $nbrDiplomesPrets,
                'diplomes_retirees' => $nbrDiplomesRetires,
            ]
        ]);
    }

    /**
     * statistiques actuelles
     *
     * @return \Illuminate\Http\Response 
     */
    public function currents()
    {
        ////DEUG
        $nbrDemandesDeug = Demande::where('type_demande', 'DEUG')
            ->where('traite', '0')->get()->count();

        $nbrDiplomesDeugCrees = Demande::where('type_demande',"DEUG")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '1');
        })
            ->get()->count();

        $nbrDiplomesDeugReedites = Demande::where('type_demande',"DEUG")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '2');
        })
            ->get()->count();
        $nbrDiplomesDeugImprimes = Demande::where('type_demande',"DEUG")
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
        $nbrDiplomesDeugRecus = Demande::where('type_demande',"DEUG")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '6');
        })
            ->get()->count();
        $nbrDiplomesDeugPrets = Demande::where('type_demande',"DEUG")
        ->whereHas('diplome', function ($query)  {
                $query->where('statut_id', '7');
            })
                ->get()->count();
        $nbrDiplomesDeugRetires = Demande::where('type_demande',"DEUG")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '8');
        })
            ->get()->count();

        ////Licence
        $nbrDemandesLicence = Demande::where('type_demande', 'Licence')
            ->where('traite', '0')->get()->count();

        $nbrDiplomesLicenceCrees = Demande::where('type_demande',"Licence")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '1');
        })
            ->get()->count();

        $nbrDiplomesLicenceReedites = Demande::where('type_demande',"Licence")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '2');
        })
            ->get()->count();
        $nbrDiplomesLicenceImprimes = Demande::where('type_demande',"Licence")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '3');
        })
            ->get()->count();
        $nbrDiplomesLicenceSignes = Demande::where('type_demande',"Licence")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '4');
        })
            ->get()->count();
        $nbrDiplomesLicencePresidence = Demande::where('type_demande',"Licence")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '5');
        })
            ->get()->count();
        $nbrDiplomesLicenceRecus = Demande::where('type_demande',"Licence")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '6');
        })
            ->get()->count();
        $nbrDiplomesLicencePrets = Demande::where('type_demande',"Licence")
        ->whereHas('diplome', function ($query)  {
                $query->where('statut_id', '7');
            })
                ->get()->count();
        $nbrDiplomesLicenceRetires = Demande::where('type_demande',"Licence")
        ->whereHas('diplome', function ($query)  {
            $query->where('statut_id', '8');
        })
            ->get()->count();


        return response()->json([
            'results' => [
                ///////////////DEUG///////////////
                'nbrDemandesDeug' => $nbrDemandesDeug,
                'nbrDiplomesDeugCrees' => $nbrDiplomesDeugCrees,
                'nbrDiplomesDeugReedites' => $nbrDiplomesDeugReedites,
                'nbrDiplomesDeugImprimes' => $nbrDiplomesDeugImprimes,
                'nbrDiplomesDeugSignes' => $nbrDiplomesDeugSignes,
                'nbrDiplomesDeugPresidence' => $nbrDiplomesDeugPresidence,
                'nbrDiplomesDeugRecus' => $nbrDiplomesDeugRecus,
                'nbrDiplomesDeugPrets' => $nbrDiplomesDeugPrets,
                'nbrDiplomesDeugRetires' => $nbrDiplomesDeugRetires,
                //////////////////Licence//////////////////////
                'nbrDemandeslicence' => $nbrDemandesLicence,
                'nbrDiplomesLicenceCrees' => $nbrDiplomesLicenceCrees,
                'nbrDiplomesLicenceReedites' => $nbrDiplomesLicenceReedites,
                'nbrDiplomesLicenceImprimes' => $nbrDiplomesLicenceImprimes,
                'nbrDiplomesLicenceSignes' => $nbrDiplomesLicenceSignes,
                'nbrDiplomesLicencePresidence' => $nbrDiplomesLicencePresidence,
                'nbrDiplomesLicenceRecus' => $nbrDiplomesLicenceRecus,
                'nbrDiplomesLicencePrets' => $nbrDiplomesLicencePrets,
                'nbrDiplomesLicenceRetires' => $nbrDiplomesLicenceRetires,
            ]
        ]);
    }
}
