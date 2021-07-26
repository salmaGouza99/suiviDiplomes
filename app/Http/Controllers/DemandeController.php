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
        return response()->json([
            'demandes' => Demande::with('diplome','etudiant')->paginate(15)->sortByDesc('date_demande')
        ]); 
    }


    public function show(Demande $demande)
    {
        return response()->json([
            'demande' => $demande::with('diplome','etudiant')->first()
         ]);
    }

    function search($var)
    {
       return response()->json([
            'demandes' => DB::table('demandes as d')
                            ->join('etudiants as e', 'd.etudiant_cin','=','e.cin')
                            ->where('e.cin', 'like', '%'.$var.'%')
                            ->orWhere('e.cne', 'like', '%'.$var.'%')
                            ->orWhere('e.apogee', 'like', '%'.$var.'%')
                            ->get()
        ]);
    }

    public function filterByType($type) 
    {
        return response()->json([
            'demandes' => Demande::with('diplome','etudiant')->where('type_demande',$type)->get()
        ]);
    }
}
