<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Etud;
use SheetDB\SheetDB;
use App\Models\Demande;
use App\Models\Etudiant;
use App\Models\Formulaire;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

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
            'demandes' => Demande::with('etudiant')
                ->where('traite','=',0)->paginate(7)->sortByDesc('date_demande')
        ]); 
    }

    /**
     * Display the specified demande
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $demande = Demande::with('etudiant')->where('traite','=',0)->find($id);
        $res = null;

        // show demande for each role
        if ($demande)
        {
            if(Auth::user()->hasRole('admin')) {
                $res = $demande;
            } else if(Auth::user()->hasRole('guichet_droit_arabe')) {
                if ($demande->etudiant->filiere == 'Droit arabe حقوق عربية')
                {
                    $res = $demande;
                }
            } else if(Auth::user()->hasRole('guichet_droit_francais')) {
                if ($demande->etudiant->filiere == 'Droit francais حقوق فرنسية')
                {
                    $res = $demande;
                }
            } else if(Auth::user()->hasRole('guichet_economie')) {
                if ($demande->etudiant->filiere == 'Economie اقتصاد')
                {
                    $res = $demande;
                }
            }
        }
        
        return response()->json([
            'demande' => $res
         ]);
    }

    /**
     * filter demandes either by type or filiere
     *
     * @param string $type
     * @param string $filiere
     * @return \Illuminate\Http\Response
     */
    public function filter($type, $filiere) 
    {
        if ($type and $filiere)
        {
            $demandes =  DB::table('demandes as d')
                    ->join('etudiants as e', 'd.etudiant_cin','=','e.cin')
                    ->where('d.traite','=',0)
                    ->where('d.type_demande', $type)
                    ->where('e.filiere',$filiere)
                    ->get();
        }
        if ($type and !$filiere)
        {
            $demandes =  DB::table('demandes as d')
                    ->join('etudiants as e', 'd.etudiant_cin','=','e.cin')
                    ->where('d.traite','=',0)
                    ->where('d.type_demande', $type)
                    ->get();
        }
        if ($filiere and !$type)
        {
            $demandes =  DB::table('demandes as d')
                    ->join('etudiants as e', 'd.etudiant_cin','=','e.cin')
                    ->where('d.traite','=',0)
                    ->where('e.filiere',$filiere)
                    ->get();
        }

        // show results for each role
        $res = array();
        foreach ($demandes as $demande)
        {
            if(Auth::user()->hasRole('admin')) {
                $res[] = $demande;
            } else if(Auth::user()->hasRole('guichet_droit_arabe')) {
                if ($demande->filiere == 'Droit arabe حقوق عربية')
                {
                    $res[] = $demande;
                }
            } else if(Auth::user()->hasRole('guichet_droit_francais')) {
                if ($demande->filiere == 'Droit francais حقوق فرنسية')
                {
                    $res[] = $demande;
                }
            } else if(Auth::user()->hasRole('guichet_economie')) {
                if ($demande->filiere == 'Economie اقتصاد')
                {
                    $res[] = $demande;
                }
            }
        }
        
        return response()->json([
            'demandes' => $res
         ]);
    }

    /**
     * get demandes from googlesheet
     *
     * @return json_response
     */
    public function sheet() {
        foreach(Formulaire::all() as $form)
        {
            $sheetdb = new SheetDB($form->api_id);
                foreach ($sheetdb->get() as $row)
                {
                    // $etudiantExistant=Etudiant::where('cin',$row->cin)->get();
                    // $demandeExistante=Demande::where('etudiant_cin',$row->cin)
                    //         ->where('type_demande',$row->type_demande)->get();

                    if(sizeof(Etudiant::where('cin',$row->cin)->get())==0)
                    {
                        Etudiant::create([
                            'cin' => $row->cin,
                            'apogee' => $row->apogee,
                            'cne' => $row->cne,
                            'nom' => Str::upper($row->nom),
                            'prenom' => $row->prenom,
                            'nom_arabe' => $row->nom_arabe,
                            'prenom_arabe' => $row->prenom_arabe,
                            'filiere' => $row->filiere,
                            'option' => $row->option,
                            'nationalite' =>$row->nationalite,
                            'date_naiss' => Carbon::createFromFormat('d/m/Y', $row->date_de_naissance)->format('Y-m-d'),
                            'lieu_naiss' => $row->lieu_de_naissance,
                            'email_inst' => $row->email_intitutionnel,
                        ]);
                    }
                    if(sizeof(Demande::where('etudiant_cin',$row->cin)
                        ->where('type_demande',$row->type_demande)->get())==0)
                    {
                        Demande::create([
                                'etudiant_cin' => $row->cin,
                                'type_demande' => $row->type_demande,
                                'date_demande' =>Carbon::createFromFormat('d/m/Y H:i:s', $row->Horodateur)->format('Y-m-d'),
                        ]);
                    }
                   
                } 
            }
        }
            
    }
        


        // return response()->json([
        //     'all'=> $sheetdb->get()[0]->cin,// returns all spreadsheets data
        //     'keys'=> $sheetdb->keys()[1], // returns all spreadsheets key names
        //     // 'names'=> $sheetdb->name(), //sheet name
        // ]);
