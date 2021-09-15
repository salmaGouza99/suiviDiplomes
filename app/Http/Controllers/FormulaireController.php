<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Formulaire;

class FormulaireController extends Controller
{
    /**
     * Display a listing of forms.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'forms' => Formulaire::all(),
        ]);
    }

    /**
     * Update the specified form in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Formulaire $formulaire
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Formulaire $formulaire)
    {
        $formulaire->update($request->all());
        return response()->json([
            'form' => $formulaire,
            'message' => 'Formulaire modifié.'
        ]);
    }
    
}



