<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Etudiant;

class EtudiantController extends Controller
{   

    /**
     * liste des etudiants
     *
     * @return json_response
     */
    public function index()
    {
        $etudiants = array();
        $data = Etudiant::with('demande')->paginate(10);
        foreach ( $data as $etudiant ) 
        {
            $demandes = array();
            foreach ( $etudiant->demande as $demande ) 
            {
                $demandes[] = [
                'Type de demande' => $demande->type_demande,
                'Date' => $demande->date_demande
                ];
            }
    
            $etudiants[] = [
                'Etudiant' => $etudiant->nom.' '.$etudiant->prenom,
                'CIN' => $etudiant->cin,
                'Apogee' => $etudiant->apogee,
                'filiere' => $etudiant->filiere,
                'Demandes' => $demandes
            ];
        }
        return response()->json($etudiants);   
    }


    /**
     * show a specific etudiant
     *
     * @param [string] $cin
     * @return json_response
     */
    public function show($cin)
    {
        $res = Etudiant::with('demande')->where('cin',$cin)->first();
        $demandes = array();
        if ($res)
        {
            foreach ( $res->demande as $demande ) 
            {
                $demandes[] = [
                'Type de demande' => $demande->type_demande,
                'Date' => $demande->date_demande
                ];
            }

            return response()->json([
                'Etudiant' => $res->nom.' '.$res->prenom.', '.$res->nom_arabe.' '.$res->prenom_arabe,
                'CIN' => $res->cin,
                'Apogee' => $res->apogee,
                'CNE' => $res->cne,
                'Filiere' => $res->filiere,
                'Option' => $res->option,
                'Nationalite' => $res->nationalite,
                'Dade de naissance' => $res->date_naiss,
                'Lieu de naissance' => $res->lieu_naiss,
                'Demandes' => $demandes
            ]);
        }
        return response()->json('Not found!',404);
    }

    /**
     * update infos d'un etudiant
     *
     * @param Request $request
     * @param [string] $cin
     * @return json_Response
     */
    public function update(Request $request, $cin)
    {
        $res = Etudiant::with('demande')->where('cin',$cin)->update($request->all()); // res = 1 if ok 0 if not

        return response()->json($res, 200);
    }

  
    /**
     * chercher un etudiant par CNE CIN ou APPOGE
     *
     * @param [type] $mc
     * @return json_response
     */
    public function search($mc)
    {
        $etudiants = array();
        $data = Etudiant::with('demande')
            ->where('cin', 'like', '%'.$mc.'%')
            ->orWhere('cne', 'like', '%'.$mc.'%')
            ->orWhere('apogee', 'like', '%'.$mc.'%')
            ->get();
        foreach ( $data as $etudiant ) 
        {
            $demandes = array();
            foreach ( $etudiant->demande as $demande ) 
            {
                $demandes[] = [
                'Type de demande' => $demande->type_demande,
                'Date' => $demande->date_demande
                ];
            }
    
            $etudiants[] = [
                'Etudiant' => $etudiant->nom.' '.$etudiant->prenom,
                'CIN' => $etudiant->cin,
                'Apogee' => $etudiant->apogee,
                'filiere' => $etudiant->filiere,
                'Demandes' => $demandes
            ];
        }
        return response()->json($etudiants);
    }

    /**
     * filiter les etudiant par filiere
     *
     * @param [string] $filiere
     * @return void
     */
    public function filterByFiliere($filiere)
    {
        $etudiants = array();
        $res = Etudiant::with('demande')->where('filiere',$filiere)->get();
        foreach ( $res as $etudiant ) 
        {
            $demandes = array();
            foreach ( $etudiant->demande as $demande ) 
            {
                $demandes[] = [
                'Type de demande' => $demande->type_demande,
                'Date' => $demande->date_demande
                ];
            }
    
            $etudiants[] = [
                'Etudiant' => $etudiant->nom.' '.$etudiant->prenom,
                'CIN' => $etudiant->cin,
                'Apogee' => $etudiant->apogee,
                'filiere' => $etudiant->filiere,
                'Demandes' => $demandes
            ];
        }
        return response()->json($etudiants);
    }
}
