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
                    ->where('diplome_cree','=',0)
                    ->paginate(7)
                    ->sortByDesc('date_demande'),
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
        return response()->json([
            'demande' => Demande::with('etudiant')->find($id)
         ]);
    }

    /**
    * search demande by CIN, CNE, ou appoge
    *
    * @param string $mc 
    * @return \Illuminate\Http\Response
    */
    function search($mc)
    {
        $res = array();
        $demandes = DB::table('demandes as d')
                    ->join('etudiants as e', 'd.etudiant_cin','=','e.cin')
                    ->where('e.cin', 'like', '%'.$mc.'%')
                    ->orWhere('e.cne', 'like', '%'.$mc.'%')
                    ->orWhere('e.apogee', 'like', '%'.$mc.'%')
                    ->paginate(7)
                    ->sortByDesc('date_demande');
        foreach ( $demandes as $demande ) 
        {
            if($demande->diplome_cree == 0) 
            {
                $res[] = $demande;
            }
        }
        return response()->json([
            'demandes' => $res
        ]);
    }

    /**
     * filter demandes by type: deug or licence
     *
     * @param string $type
     * @return \Illuminate\Http\Response
     */
    public function filterByType($type) 
    {
        return response()->json([
            'demandes' => Demande::with('etudiant')
                        ->where('diplome_cree','=',0)
                        ->where('type_demande',$type)
                        ->paginate(7)
                        ->sortByDesc('date_demande')
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
