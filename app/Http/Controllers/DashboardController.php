<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Demande;
use App\Models\Diplome;
use Illuminate\Http\Request;


class DashboardController extends Controller
{
    public function currentYear(){

        //statistique de l'annee courante
        $currentYear = Carbon::now()->year;
        $demandeNonTraites=Demande::whereYear('date_demande',$currentYear)->where('traite', '0')
            ->get()->count();
        $demandeTraites=Demande::whereYear('date_demande',$currentYear)->where('traite','!=', '0')
            ->get()->count();
        $diplomesRetires=Diplome::with(['demande' => function ($query) {
            $query->whereYear('date_retraitDiplome_archiveDossier',Carbon::now()->year);}])
            ->get()->count();

        

        return response()->json([
            'demandes_non_traites' => $demandeNonTraites,
            'demandes_traites' => $demandeTraites,
            'diplomes_retires' => $diplomesRetires,
        ]);


    }

    public function dashboard($date_debut='', $date_fin=''){
    //statistique par intervalle de temps (par DEUG ou Licence)
    ////DEUG
        $nbrDemandesDeug=Demande::where('type_demande','DEUG')
            ->whereBetween('date_demande', [$date_debut, $date_fin])->get()->count();

        $nbrDemandesTraitesDeug=Demande::where('type_demande','DEUG')
            ->whereBetween('date_demande', [$date_debut, $date_fin])
            ->where('traite','!=', '0')->get()->count();

        $nbrDiplomesPretsDeug=Diplome::with(['demande' => function ($query) {
            $query->where('type_demande', 'DEUG');}])
            ->where('date_notificationEtudiant', '!=',null)
            ->where('date_retraitDiplome_archiveDossier',null)
            ->whereBetween('date_notificationEtudiant',[$date_debut, $date_fin])->get()->count();

        $nbrDiplomesNonPretsDeug=Diplome::with(['demande' => function ($query) {
            $query->where('type_demande', 'DEUG');}])
            ->where('date_notificationEtudiant',null)
            ->whereBetween('date_creationDossier_envoiAuServiceDiplome',[$date_debut, $date_fin])
            ->get()->count();

        $nbrDiplomesRetiresDeug=Diplome::with(['demande' => function ($query) {
            $query->where('type_demande', 'DEUG');}])
            ->where('date_retraitDiplome_archiveDossier', '!=',null)
            ->whereBetween('date_retraitDiplome_archiveDossier',[$date_debut, $date_fin])->get()->count();

        $nbrDiplomesReeditesDeug=Diplome::with(['demande' => function ($query) {
            $query->where('type_demande', 'DEUG');}])
            ->where('type_erreur', '!=',null)->where('date_reedition', '!=',null)
            ->whereBetween('date_creationDossier_envoiAuServiceDiplome',[$date_debut, $date_fin])->get()->count();
        

    ////Licence
        $nbrDemandesLicence=Demande::where('type_demande','licence')
            ->whereBetween('date_demande', [$date_debut, $date_fin])->get()->count();

        $nbrDemandesTraitesLicence=Demande::where('type_demande','licence')
            ->whereBetween('date_demande', [$date_debut, $date_fin])
            ->where('traite','!=', '0')->get()->count();

        $nbrDiplomesPretsLicence=Diplome::with(['demande' => function ($query) {
            $query->where('type_demande', 'licence');}])
            ->where('date_notificationEtudiant', '!=',null)->where('date_retraitDiplome_archiveDossier',null)
            ->whereBetween('date_notificationEtudiant',[$date_debut, $date_fin])->get()->count();

        $nbrDiplomesNonPretsLicence=Diplome::with(['demande' => function ($query) {
            $query->where('type_demande', 'licence');}])
            ->where('date_notificationEtudiant',null)
            ->whereBetween('date_creationDossier_envoiAuServiceDiplome',[$date_debut, $date_fin])
            ->get()->count();

        $nbrDiplomesRetiresLicence=Diplome::with(['demande' => function ($query) {
            $query->where('type_demande', 'licence');}])
            ->where('date_retraitDiplome_archiveDossier', '!=',null)
            ->whereBetween('date_retraitDiplome_archiveDossier',[$date_debut, $date_fin])->get()->count();

        $nbrDiplomesReeditesLicence=Diplome::with(['demande' => function ($query) {
            $query->where('type_demande', 'licence');}])
            ->where('type_erreur', '!=',null)->where('date_reedition', '!=',null)
            ->whereBetween('date_creationDossier_envoiAuServiceDiplome',[$date_debut, $date_fin])->get()->count();
            
           
            

         return response()->json([
            'demandes_deug_recus' => $nbrDemandesDeug,
            'demandes_deug_traitees' => $nbrDemandesTraitesDeug,
            'diplomes_deug_non_prets' =>$nbrDiplomesNonPretsDeug,
            'diplomes_deug_prets' => $nbrDiplomesPretsDeug,
            'diplomes_deug_reedites' => $nbrDiplomesReeditesDeug,
            'diplomes_deug_retirees' => $nbrDiplomesRetiresDeug,
            ////////////////////////////////////////
            'demandes_licence_recus' => $nbrDemandesLicence,
            'demandes_licence_traitees' => $nbrDemandesTraitesLicence,
            'diplomes_licence_non_prets' =>$nbrDiplomesNonPretsLicence,
            'diplomes_licence_prets' => $nbrDiplomesPretsLicence,
            'diplomes_licence_reedites' => $nbrDiplomesReeditesLicence,
            'diplomes_licence_retirees' => $nbrDiplomesRetiresLicence,
   

         ]);
    }

    public function index() {
         ////DEUG
         $nbrDemandesDeug=Demande::where('type_demande','DEUG')
         ->where('traite', '0')->get()->count();


     $nbrDiplomesDeugCree=Diplome::with(['demande' => function ($query) {
        $query->where('type_demande', 'DEUG');}])
        ->where('statut_id', '1')
         ->get()->count();
     $nbrDiplomesDeugReedite=Diplome::with(['demande' => function ($query) {
        $query->where('type_demande', 'DEUG');}])
        ->where('statut_id', '2')
         ->get()->count();
    $nbrDiplomesDeugDecanat=Diplome::with(['demande' => function ($query) {
        $query->where('type_demande', 'DEUG');}])
        ->where('statut_id', '3')
         ->get()->count();
    $nbrDiplomesDeugServiceDip=Diplome::with(['demande' => function ($query) {
        $query->where('type_demande', 'DEUG');}])
        ->where('statut_id', '4')
         ->get()->count();
    $nbrDiplomesDeugPresidence=Diplome::with(['demande' => function ($query) {
        $query->where('type_demande', 'DEUG');}])
        ->where('statut_id', '5')
         ->get()->count();
    $nbrDiplomesDeugRetrait=Diplome::with(['demande' => function ($query) {
        $query->where('type_demande', 'DEUG');}])
        ->where('statut_id', '6')
         ->get()->count();
    $nbrDiplomesDeugRetire=Diplome::with(['demande' => function ($query) {
        $query->where('type_demande', 'DEUG');}])
        ->where('statut_id', '7')
         ->get()->count();

    
        
 ////Licence
 $nbrDemandeslicence=Demande::where('type_demande','licence')
         ->where('traite', '0')->get()->count();

 $nbrDiplomeslicenceCree=Diplome::with(['demande' => function ($query) {
    $query->where('type_demande', 'licence');}])
    ->where('statut_id', '1')
     ->get()->count();
 $nbrDiplomeslicenceReedite=Diplome::with(['demande' => function ($query) {
    $query->where('type_demande', 'licence');}])
    ->where('statut_id', '2')
     ->get()->count();
$nbrDiplomeslicenceDecanat=Diplome::with(['demande' => function ($query) {
    $query->where('type_demande', 'licence');}])
    ->where('statut_id', '3')
     ->get()->count();
$nbrDiplomeslicenceServiceDip=Diplome::with(['demande' => function ($query) {
    $query->where('type_demande', 'licence');}])
    ->where('statut_id', '4')
     ->get()->count();
$nbrDiplomeslicencePresidence=Diplome::with(['demande' => function ($query) {
    $query->where('type_demande', 'licence');}])
    ->where('statut_id', '5')
     ->get()->count();
$nbrDiplomeslicenceRetrait=Diplome::with(['demande' => function ($query) {
    $query->where('type_demande', 'licence');}])
    ->where('statut_id', '6')
     ->get()->count();
$nbrDiplomeslicenceRetires=Diplome::with(['demande' => function ($query) {
    $query->where('type_demande', 'licence');}])
    ->where('statut_id', '7')
     ->get()->count();
         

//BOTH 
    $nbrDemandes=Demande::where('traite', '0')->get()->count();


     $nbrDiplomesCree=Diplome::where('statut_id', '1')
         ->get()->count();
     $nbrDiplomesReedite=Diplome::where('statut_id', '2')
         ->get()->count();
    $nbrDiplomesDecanat=Diplome::where('statut_id', '3')
         ->get()->count();
    $nbrDiplomesServiceDip=Diplome::where('statut_id', '4')
         ->get()->count();
    $nbrDiplomesPresidence=Diplome::where('statut_id', '5')
         ->get()->count();
    $nbrDiplomesRetrait=Diplome::where('statut_id', '6')
         ->get()->count();
    $nbrDiplomesRetire=Diplome::where('statut_id', '7')
         ->get()->count();


      return response()->json([
          ///////////////DEUG///////////////
        'nbrDemandesDeug' => $nbrDemandesDeug,
         'nbrDiplomesDeugCree' => $nbrDiplomesDeugCree,
         'nbrDiplomesDeugReedite' =>$nbrDiplomesDeugReedite,
         'nbrDiplomeslicenceDecanat' => $nbrDiplomeslicenceDecanat,
         'nbrDiplomesDeugServiceDip' => $nbrDiplomesDeugServiceDip,
         'nbrDiplomesDeugPresidence' => $nbrDiplomesDeugPresidence,
         'nbrDiplomesDeugRetrait' => $nbrDiplomesDeugRetrait,
         'nbrDiplomesDeugRetire' => $nbrDiplomesDeugRetire,
         //////////////////LIcence//////////////////////
         'nbrDemandeslicence' => $nbrDemandeslicence,
         'nbrDiplomeslicenceCree' => $nbrDiplomeslicenceCree,
         'nbrDiplomeslicenceReedite' =>$nbrDiplomeslicenceReedite,
         'nbrDiplomeslicenceDecanat' => $nbrDiplomeslicenceDecanat,
         'nbrDiplomeslicenceServiceDip' => $nbrDiplomeslicenceServiceDip,
         'nbrDiplomeslicencePresidence' => $nbrDiplomeslicencePresidence,
         'nbrDiplomeslicenceRetrait' => $nbrDiplomeslicenceRetrait,
         'nbrDiplomeslicenceRetires' => $nbrDiplomeslicenceRetires,
         ////////////////////////BOTH////////////////////////////////////////
         'nbrDemandes' => $nbrDemandes,
         'nbrDiplomesCree' => $nbrDiplomesCree,
         'nbrDiplomesReedite' =>$nbrDiplomesReedite,
         'nbrDiplomesDecanat' => $nbrDiplomesDecanat,
         'nbrDiplomesServiceDip' => $nbrDiplomesServiceDip,
         'nbrDiplomesPresidence' => $nbrDiplomesPresidence,
         'nbrDiplomesRetrait' => $nbrDiplomesRetrait,
         'nbrDiplomesRetire' => $nbrDiplomesRetire,

      ]);


    }
}
