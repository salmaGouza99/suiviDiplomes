<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Demande;
use Illuminate\Support\Facades\DB;

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
            'demandes' => Demande::with('etudiant')->where('diplome_cree','=',0)->paginate(7)->sortByDesc('date_demande')
        ]); 
    }

    /**
     * Display the specified demande
     *
     * @param Demande $demande
     * @return \Illuminate\Http\Response
     */
    public function show(Demande $demande)
    {
        return response()->json([
            'demande' => $demande::with('etudiant')->first()
         ]);
    }

    /**
    * search demande by CIN, CNE, ou appoge
    *
    * @param string $mc 
    * @return \Illuminate\Http\Response
    */
    function search($mc)
    {
        $res = array();
        $demandes = DB::table('demandes as d')
                    ->join('etudiants as e', 'd.etudiant_cin','=','e.cin')
                    ->where('e.cin', 'like', '%'.$mc.'%')
                    ->orWhere('e.cne', 'like', '%'.$mc.'%')
                    ->orWhere('e.apogee', 'like', '%'.$mc.'%')
                    ->paginate(7)
                    ->sortByDesc('date_demande');
        foreach ( $demandes as $demande ) 
        {
            if($demande->diplome_cree == 0) 
            {
                $res[] = $demande;
            }
        }
        return response()->json([
            'demandes' => $res
        ]);
    }

    /**
     * filter demandes by type: deug or licence
     *
     * @param string $type
     * @return \Illuminate\Http\Response
     */
    public function filterByType($type) 
    {
        return response()->json([
            'demandes' => Demande::with('etudiant')
                        ->where('diplome_cree','=',0)
                        ->where('type_demande',$type)
                        ->paginate(7)
                        ->sortByDesc('date_demande')
        ]);
    }
}
