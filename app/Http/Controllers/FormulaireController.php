<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Formulaire;

class FormulaireController extends Controller
{
    public function index()
    {
        return response()->json([
            'formulaires' => Formulaire::all(),
        ]);
    }

    public function store(Request $request)
    {
        $form = Formulaire::create($request->all());

        return response()->json($form, 201);
    }

    /*public function show($id)
    {
        return response()->json([
            'formulaire' =>Formulaire::findOrFail($id),
        ]);
    }*/

    public function update(Request $request, $id)
    {
        $formulaire=Formulaire::findOrFail($id);
        $formulaire->update($request->all());
        return response()->json([
            'formulaire' => $formulaire,
        ]);
    }

    public function destroy($id)
    {
        Formulaire::findOrFail($id)->delete();
        return response()->json(['response' => 'Form deleted successfully']);
   
    }
}
