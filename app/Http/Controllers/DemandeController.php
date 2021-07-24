<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Demande;
use Illuminate\Support\Facades\DB;

class DemandeController extends Controller
{
    // khas nzid info dip
    public function index()
    {
        $demandes = array();
        $data = Demande::with('etudiant')->get();
        //$data = Demande::paginate(15);
        foreach ( $data->sortByDesc('date_demande') as $demande ) 
        {
            $demandes[] = [
                'N° Demande' => $demande->id,
                'Type de demande' => $demande->type_demande,
                'Date' => $demande->date_demande,
                'Faite par' => $demande->etudiant->nom.' '.$demande->etudiant->prenom,
                'Apogee' => $demande->etudiant->apogee,
                'CIN' => $demande->etudiant->cin
            ];
        }
        return response()->json($demandes);   
    }


    public function show(Demande $demande)
    {
        $res = Demande::with('etudiant')->whereId($demande->id)->first();
        return response()->json([
            'N° Demande' => $res->id,
            'Type de demande' => $res->type_demande,
            'Date' => $res->date_demande,
            'Faite par' => $res->etudiant->nom.' '.$res->etudiant->prenom.', '.$res->etudiant->nom_arabe.' '.$res->etudiant->prenom_arabe,
            'CIN' => $res->etudiant->cin,
            'Apogee' => $res->etudiant->apogee,
            'CNE' => $res->etudiant->cne,
            'Filiere' => $res->etudiant->filiere,
            'Option' => $res->etudiant->option,
            'Nationalite' => $res->etudiant->nationalite,
            'Dade de naissance' => $res->etudiant->date_naiss,
            'Lieu de naissance' => $res->etudiant->lieu_naiss
        ]);
    }

    /* public function destroy(Demande $demande)
    {
        $demande->delete();

        return response()->json(null, 204);
    } */


    /* function fetch_data(Request $request)
    {
        if($request->ajax())
        {
            $sort_by = $request->get('sortby');
            $sort_type = $request->get('sorttype');
            $query = $request->get('query');
            $query = str_replace(" ", "%", $query);
            $data = DB::table('demandes as d')
                        ->join('etudiants as e', 'd.etudiant_cin','=','e.cin')
                        ->where('e.cin', 'like', '%'.$query.'%')
                        ->orWhere('e.cne', 'like', '%'.$query.'%')
                        ->orWhere('e.apogee', 'like', '%'.$query.'%')
                        ->orderBy($sort_by, $sort_type)
                        ->get();
            return response()->json($data);
        }
        
    } */

    function search($var)
    {
        $demandes = array();
        $data = DB::table('demandes as d')
            ->join('etudiants as e', 'd.etudiant_cin','=','e.cin')
            ->where('e.cin', 'like', '%'.$var.'%')
            ->orWhere('e.cne', 'like', '%'.$var.'%')
            ->orWhere('e.apogee', 'like', '%'.$var.'%')
            ->get();
        foreach ( $data->sortByDesc('date_demande') as $demande ) 
        {
            $demandes[] = [
                'N° Demande' => $demande->id,
                'Type de demande' => $demande->type_demande,
                'Date' => $demande->date_demande,
                'Faite par' => $demande->nom.' '.$demande->prenom,
                'Apogee' => $demande->apogee,
                'CIN' => $demande->cin
            ];
        }
        return response()->json($demandes);
    }

    public function filterByType($type) 
    {
        $demandes = array();
        $res = Demande::with('etudiant')->where('type_demande',$type)->get();
        foreach ( $res->sortByDesc('date_demande') as $demande ) 
        {
            $demandes[] = [
                'N° Demande' => $demande->id,
                'Type de demande' => $demande->type_demande,
                'Date' => $demande->date_demande,
                'Faite par' => $demande->etudiant->nom.' '.$demande->etudiant->prenom,
                'Apogee' => $demande->etudiant->apogee,
                'CIN' => $demande->etudiant->cin
            ];
        }
        return response()->json($demandes);
    }
}
