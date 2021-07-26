<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Etudiant;
use App\Mail\MailToStudent;
use Mail;

class EtudiantController extends Controller
{   
    public function index()
    {
        return response()->json([
            'etudiants' => Etudiant::with('demande','diplome')->get()
        ]); 
    }

    public function show($cin)
    {
        return response()->json([
            'etudiant' => Etudiant::with('demande','diplome')->where('cin',$cin)->first()
         ]);
    }

    public function update(Request $request, $cin)
    {
        Etudiant::with('demande','diplome')->where('cin',$cin)->update($request->all()); 
        return response()->json([
            'etudiant' => Etudiant::with('demande','diplome')->where('cin',$request->cin)->first()
        ]);
    }

    function search($var)
    {
        return response()->json([
            'etudiants' => Etudiant::with('demande','diplome')
                        ->where('cin', 'like', '%'.$var.'%')
                        ->orWhere('cne', 'like', '%'.$var.'%')
                        ->orWhere('apogee', 'like', '%'.$var.'%')
                        ->get()
         ]);
    }

    public function filterByFiliere($filiere)
    {
        return response()->json([
            'etudiants' => Etudiant::with('demande','diplome')->where('filiere',$filiere)->get()
         ]);
        
    }

    public function notif($email)
    {
        $details = [
            'title' => 'Diplome prêt | FSJES Agdal',
            'body' => 'Vous pouvez venir retirer votre diplôme. Vous avez 3 jours au maximum!'
        ];
       
        Mail::to($email)->send(new MailToStudent($details));
        return response()->json('Great! Successfully send');
        //return dd("Email is Sent.");

        /* Mail::to($email)->send(new MailToStudent());
 
        if (Mail::failures()) {
            return response()->Fail('Sorry! Please try again latter');
        } else {
            return response()->success('Great! Successfully send in your mail');
        } */
    }    
}
