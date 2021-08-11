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

    // /**
    //  * Store a newly created form in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @return \Illuminate\Http\Response
    //  */
    // public function store(Request $request)
    // {
    //     $form = Formulaire::create($request->all());
    //     return response()->json([
    //         'form' => $form,
    //         'message' => 'Formulaire ajouté'
    //     ]);
    // }
    /*
     * Display the specified form.
     *
     * @param  \App\Models\Formulaire $formulaire
     * @return \Illuminate\Http\Response
     */
    /*public function show(Formulaire $formulaire)
    {
        return response()->json([
            'form' => $formulaire,
        ]);
    }*/

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
            'message' => 'Formulaire modifié'
        ]);
    }

    /**
     * Remove the specified form from storage.
     *
     * @param  \App\Models\Formulaire $formulaire
     * @return \Illuminate\Http\Response
     */
    public function destroy(Formulaire $formulaire)
    {
        $formulaire->delete();
        return response()->json([
            'message' => 'Formulaire supprimé'
        ]);
    }

    // /**
    //  * filter fors by type: DEUG or Licence.
    //  *
    //  * @param  string  $type
    //  * @return \Illuminate\Http\Response
    //  */
    // public function filterByType($type)
    // {
    //     return response()->json([
    //         'forms' => Formulaire::where('type_formulaire',$type)->get(),
    //     ]);
    // }

     /*
     * filter forms by filiere.
     *
     * @param  string  $filiere
     * @return \Illuminate\Http\Response
     */
    /* public function filterByFiliere($filiere)
    {
        return response()->json([
            'forms' => Formulaire::where('filiere',$filiere)->get(),
        ]);
    } */




}



