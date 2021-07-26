<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Etudiant;
use App\Mail\MailToStudent;
use Mail;

class EtudiantController extends Controller
{   

    /**
     * Display a listing of etudiants.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'etudiants' => Etudiant::with('demande','diplome')->paginate(7)
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
        return response()->json([
            'etudiant' => Etudiant::with('demande','diplome')->where('cin',$cin)->first()
         ]);
    }

    /**
     * Update the specified etudiant in storage
     *
     * @param Request $request
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

    /**
     * search etudiant by CNE,CIN or APPOGE
     *
     * @param string $mc
     * @return \Illuminate\Http\Response 
     */
    function search($mc)
    {
        return response()->json([
            'etudiants' => Etudiant::with('demande','diplome')
                        ->where('cin', 'like', '%'.$mc.'%')
                        ->orWhere('cne', 'like', '%'.$mc.'%')
                        ->orWhere('apogee', 'like', '%'.$mc.'%')
                        ->paginate(7)
         ]);
    }

    /**
     * filter etudiant by filiere
     *
     * @param string $filiere
     * @return \Illuminate\Http\Response 
     */
    public function filterByFiliere($filiere)
    {
        
        return response()->json([
            'etudiants' => Etudiant::with('demande','diplome')->where('filiere',$filiere)->paginate(7)
        ]);
        
    }

    /**
     * Notify etudiant with his email
     *
     * @param string $email
     * @return \Illuminate\Http\Response 
     */
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
