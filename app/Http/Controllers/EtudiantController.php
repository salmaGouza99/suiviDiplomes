<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Etudiant;

class EtudiantController extends Controller
{   
    public function index()
    {
        $etudiants = array();
        $data = Etudiant::with('demande')->get();
        //$data = Etudiant::paginate(15);
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

    /* public function store(Request $request)
    {
        $etudiant = Etudiant::create($request->all());

        return response()->json($etudiant, 201);
    } */

    public function update(Request $request, $cin)
    {
        $res = Etudiant::with('demande')->where('cin',$cin)->update($request->all()); // res = 1 if ok 0 if not

        return response()->json($res, 200);
    }

   /*  public function destroy(Etudiant $etudiant)
    {
        $etudiant->delete();

        return response()->json(null, 204);
    } */

    function search($var)
    {
        $etudiants = array();
        $data = Etudiant::with('demande')
            ->where('cin', 'like', '%'.$var.'%')
            ->orWhere('cne', 'like', '%'.$var.'%')
            ->orWhere('apogee', 'like', '%'.$var.'%')
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
