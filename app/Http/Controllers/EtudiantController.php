<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Exports\ExportEtudiants;
use App\Exports\ExportParcoursDetaille;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class EtudiantController extends Controller
{   

    /**
     * Display a listing of etudiants.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $res = array();
        foreach (Etudiant::with('demande','diplome')->get()->sortBy('nom') as $etudiant)
        {
            $res[] = $etudiant;
        }
        return response()->json([
            'etudiants' => $res,
        ]); 
    }

    /**
     * Display the specified etdiant.
     *
     * @param string $cin
     * @return \Illuminate\Http\Response
     */
    public function show($cin)
    {
        $etudiant = Etudiant::with('demande','diplome')->where('cin',$cin)->first();

         return response()->json([
            'etudiant' => $etudiant
         ]);
    }

    /**
     * Update the specified etudiant in storage
     *
     * @param Illuminate\Http\Request $request
     * @param string $cin
     * @return \Illuminate\Http\Response 
     */
    public function update(Request $request, $cin)
    {
        Etudiant::with('demande','diplome')->where('cin',$cin)->update($request->all()); 
        return response()->json([
            'etudiant' => Etudiant::with('demande','diplome')->where('cin',$request->cin)->first()
        ]);
    }
}
