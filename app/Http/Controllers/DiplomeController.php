<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Diplome;

class DiplomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'diplomes' => Diplome::with('demande','etudiant')->get()
        ]); 
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Diplome $diplome)
    {
        return response()->json([
           'diplome' => $diplome::with('demande','etudiant')->first()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    public function imprime(Diplome $diplome)
    {
        return $diplome->update([
            'statut' => 'imprime',
            'date_impression_envoiAuDecanat' => now()
        ]);
    }

    public function signe(Diplome $diplome)
    {
        return $diplome->update([
            'statut' => 'signe',
            'date_singature_renvoiAuServiceDiplome' => now()
        ]);
    }

    public function envoye(Diplome $diplome)
    {
        return $diplome->update([
            'statut' => 'envoye',
            'date_generationBorodeaux_envoiApresidence' => now()
        ]);
    }

    public function recu(Diplome $diplome)
    {
        return $diplome->update([
            'statut' => 'recu',
            'date_receptionParBureauOrdre_envoiAuGuichetRetrait' => now()
        ]);
    }

    public function retire(Diplome $diplome)
    {
        return $diplome->update([
            'statut' => 'retire_archive',
            'date_retraitDiplome_archiveDossier' => now()
        ]);
    }
    
    public function filterByStatut($statut)
    {
        return response()->json([
            'diplomes' => Diplome::with('demande','etudiant')->where('statut',$statut)->get()
         ]);
        
    }
}
