<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Demande;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DemandeController extends Controller
{
    /**
     * Display a listing of demandes
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'demandes' => Demande::with('etudiant')->where('traite','=',0)->paginate(7)->sortByDesc('date_demande')
        ]); 
    }

    /**
     * Display the specified demande
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $demande = Demande::with('etudiant')->where('traite','=',0)->find($id);
        $res = null;

        // show demande for each role
        if ($demande)
        {
            if(Auth::user()->hasRole('admin')) {
                $res = $demande;
            } else if(Auth::user()->hasRole('guichet_droit_arabe')) {
                if ($demande->etudiant->filiere == 'Droit arabe حقوق عربية')
                {
                    $res = $demande;
                }
            } else if(Auth::user()->hasRole('guichet_droit_francais')) {
                if ($demande->etudiant->filiere == 'Droit francais حقوق فرنسية')
                {
                    $res = $demande;
                }
            } else if(Auth::user()->hasRole('guichet_economie')) {
                if ($demande->etudiant->filiere == 'Economie اقتصاد')
                {
                    $res = $demande;
                }
            }
        }
        
        return response()->json([
            'demande' => $res
         ]);
    }

    /**
     * filter demandes either by type or filiere
     *
     * @param string $type
     * @param string $filiere
     * @return \Illuminate\Http\Response
     */
    public function filter($type, $filiere) 
    {
        if ($type and $filiere)
        {
            $demandes =  DB::table('demandes as d')
                    ->join('etudiants as e', 'd.etudiant_cin','=','e.cin')
                    ->where('d.traite','=',0)
                    ->where('d.type_demande', $type)
                    ->where('e.filiere',$filiere)
                    ->get();
        }
        if ($type and !$filiere)
        {
            $demandes =  DB::table('demandes as d')
                    ->join('etudiants as e', 'd.etudiant_cin','=','e.cin')
                    ->where('d.traite','=',0)
                    ->where('d.type_demande', $type)
                    ->get();
        }
        if ($filiere and !$type)
        {
            $demandes =  DB::table('demandes as d')
                    ->join('etudiants as e', 'd.etudiant_cin','=','e.cin')
                    ->where('d.traite','=',0)
                    ->where('e.filiere',$filiere)
                    ->get();
        }

        // show results for each role
        $res = array();
        foreach ($demandes as $demande)
        {
            if(Auth::user()->hasRole('admin')) {
                $res[] = $demande;
            } else if(Auth::user()->hasRole('guichet_droit_arabe')) {
                if ($demande->filiere == 'Droit arabe حقوق عربية')
                {
                    $res[] = $demande;
                }
            } else if(Auth::user()->hasRole('guichet_droit_francais')) {
                if ($demande->filiere == 'Droit francais حقوق فرنسية')
                {
                    $res[] = $demande;
                }
            } else if(Auth::user()->hasRole('guichet_economie')) {
                if ($demande->filiere == 'Economie اقتصاد')
                {
                    $res[] = $demande;
                }
            }
        }
        
        return response()->json([
            'demandes' => $res
         ]);
    }

}
