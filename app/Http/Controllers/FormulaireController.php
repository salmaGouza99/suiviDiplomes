<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Formulaire;

class FormulaireController extends Controller
{
    /**
     * Display a listing of the resource.
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $form = Formulaire::create($request->all());
        return response()->json([
            'form' => $form,
        ]);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Formulaire $formulaire)
    {
        return response()->json([
            'form' => $formulaire,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Formulaire $formulaire)
    {
        $formulaire->update($request->all());
        return response()->json([
            'form' => $formulaire,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Formulaire $formulaire)
    {
        $formulaire->delete();
        return response()->json(['response' => 'form deleted successfully']);
    }

    /**
     * filtrer les formulaire selon type(DEUG ou Licence).
     *
     * @param  int  $type
     * @return \Illuminate\Http\Response
     */
    public function filterByType($type)
    {
        return response()->json([
            'forms' => Formulaire::where('type_formulaire',$type)->get(),
        ]);
    }

     /**
     * filtrer les formulaire selon filiere.
     *
     * @param  int  $type
     * @return \Illuminate\Http\Response
     */
    public function filterByFiliere($filiere)
    {
        return response()->json([
            'forms' => Formulaire::where('filiere',$filiere)->get(),
        ]);
    }




}



