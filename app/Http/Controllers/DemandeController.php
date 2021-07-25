<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Demande;
use Illuminate\Support\Facades\DB;

class DemandeController extends Controller
{
    /**
     * liste des demandes
     *
     * @return json_response
     */
    // khas nzid info dip
    public function index()
    {
        $demandes = Demande::with('etudiant')->where('statut','=',0)->paginate(7);
        return response()->json($demandes);   
    }


    /**
     * afficher specific demande
     *
     * @param Demande $demande
     * @return json_response
     */
    public function show(Demande $demande)
    {
        $demande = Demande::with('etudiant')->whereId($demande->id)->first();
        return response()->json([
           $demande,
        ]);
    }

   /**
    * search demande by CIN, CNE, ou appoge
    *
    * @param [string] $mc 
    * @return json_response
    */
    public function search($mc)
    {
        $demandes = DB::table('demandes as d')
            ->join('etudiants as e', 'd.etudiant_cin','=','e.cin')
            ->where('e.cin', 'like', '%'.$mc.'%')
            ->orWhere('e.cne', 'like', '%'.$mc.'%')
            ->orWhere('e.apogee', 'like', '%'.$mc.'%')
            ->get()->sortByDesc('date_demande');
    
        return response()->json($demandes);
    }

    /**
     * filter les demandes selon DEUG ou Licence
     *
     * @param [string] $type
     * @return json_response
     */
    public function filterByType($type) 
    {
        $demandes = Demande::with('etudiant')->where('type_demande',$type)
        ->get()->sortByDesc('date_demande');
        
        return response()->json($demandes);
    }
}
