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
            'formulaires' => Formulaire::all(),
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
        $form=Formulaire::create($request->all());
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
    public function show($id)
    {
        return response()->json([
            'formulaire' =>Formulaire::findOrFail($id),
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
        $formulaire=Formulaire::findOrFail($id);
        $formulaire->update($request->all());
        return response()->json([
            'formulaire' => $formulaire,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $form = Formulaire::findOrFail($id);
        $form->delete();
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
            'forms' => Formulaire::where('type_formulaire','like','%'.$type.'%')->get(),
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
            'forms' => Formulaire::where('filiere','like','%'.$filiere.'%')->get(),
        ]);
    }




}



