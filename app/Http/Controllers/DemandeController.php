<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
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
        $res = array();
        foreach (Demande::with('etudiant')->where('traite','=',0)->get()->sortByDesc('date_demande') as $demande)
        {
            $res[] = $demande;
        }
        
        return response()->json([
            'demandes' => $res
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
        $demande = Demande::with('etudiant')->find($id);
        $res = null;

        // show demande for each role
        if ($demande)
        {
            if(Auth::user()->hasRole('Admin')) {
                $res = $demande;
            } else if(Auth::user()->hasRole('Guichet Droit Arabe')) {
                if ($demande->etudiant->filiere == 'القانون باللغة العربية')
                {
                    $res = $demande;
                }
            } else if(Auth::user()->hasRole('Guichet Droit Français')) {
                if ($demande->etudiant->filiere == 'Droit en français')
                {
                    $res = $demande;
                }
            } else if(Auth::user()->hasRole('Guichet Economie')) {
                if ($demande->etudiant->filiere == 'Sciences Economiques et Gestion')
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
                    ->get()->sortByDesc('date_demande');
        }
        if ($type and !$filiere)
        {
            $demandes =  DB::table('demandes as d')
                    ->join('etudiants as e', 'd.etudiant_cin','=','e.cin')
                    ->where('d.traite','=',0)
                    ->where('d.type_demande', $type)
                    ->get()->sortByDesc('date_demande');
        }
        if ($filiere and !$type)
        {
            $demandes =  DB::table('demandes as d')
                    ->join('etudiants as e', 'd.etudiant_cin','=','e.cin')
                    ->where('d.traite','=',0)
                    ->where('e.filiere',$filiere)
                    ->get()->sortByDesc('date_demande');
        }

        $res = array();
        foreach ($demandes as $demande)
        {
            $res[] = $demande;
        }
        
        return response()->json([
            'demandes' => $res
         ]);
    }

    /**
     * get demandes from googlesheet
     *
     * @param string $filiere
     * @return \Illuminate\Http\Response
     */
    public function sheet($filiere) 
    {
        $countDemandesDeug = 0;
        $countDemandesLicence = 0;
        $countDemandesDeugForAllFilieres = 0;
        $countDemandesLicenceForAllFilieres = 0;

        foreach(Formulaire::all() as $form)
        {
            $sheetdb = new SheetDB($form->api_id);
            foreach ($sheetdb->get() as $row)
            {
                if(sizeof(Etudiant::where('cin',$row->{'CIN رقم بطاقة التعريف الوطنية'})->get()) == 0)
                {
                    Etudiant::create([
                        'cin' => $row->{'CIN رقم بطاقة التعريف الوطنية'},
                        'apogee' => $row->{'Code APOGEE رقم الطالب'},
                        'cne' => $row->{'CNE ou MASSAR الرقم الوطني للطالب او مسار'},
                        'nom' => Str::upper($row->{'Nom en français الاسم العائلي بالفرنسية'}),
                        'prenom' => Str::ucfirst(Str::lower($row->{'Prénom en français الاسم الشخصي بالفرنسية'})),
                        'nom_arabe' => $row->{'Nom en arabe الاسم العائلي بالعربية'},
                        'prenom_arabe' => $row->{'Prénom en arabe الاسم الشخصي بالعربية'},
                        'filiere' => $row->{'Filière المسلك'}, 
                        'nationalite' => $row->{'Nationalité الجنسية'},
                        'date_naiss' => Carbon::createFromFormat('d/m/Y', $row->{'Date de naissance تاريخ الازدياد'})->format('Y-m-d'),
                        'lieu_naiss' => $row->{'Lieu de naissance مكان الازدياد'},
                        'email_inst' => $row->{'Adresse e-mail institutionnel البريد الالكتروني للطالب'},
                    ]);
                    //echo "\n adding student ".$row->{'CIN رقم بطاقة التعريف الوطنية'};
                }
                if(sizeof(Demande::where('etudiant_cin',$row->{'CIN رقم بطاقة التعريف الوطنية'})
                    ->where('type_demande',$form->type_formulaire)->get()) == 0)
                {
                    Demande::create([
                        'etudiant_cin' => $row->{'CIN رقم بطاقة التعريف الوطنية'},
                        'type_demande' => $form->type_formulaire,
                        'date_demande' => Carbon::createFromFormat('d/m/Y H:i:s', $row->Horodateur)->format('Y-m-d'),
                    ]);
                    if($form->type_formulaire == 'Licence')
                    {
                        Etudiant::where('cin',$row->{'CIN رقم بطاقة التعريف الوطنية'})->update(['option' => $row->{'Option الاختيار'}]);
                    }
                    if($row->{'Filière المسلك'} == $filiere) 
                    {
                        if($form->type_formulaire == 'DEUG')
                        {
                            $countDemandesDeug += 1;
                        } 
                        else {
                            $countDemandesLicence +=1;
                        }
                    } else {
                        if($form->type_formulaire == 'DEUG')
                        {
                            $countDemandesDeugForAllFilieres += 1;
                        } 
                        else {
                            $countDemandesLicenceForAllFilieres +=1;
                        }
                    }
                    //echo ' and his demand of  '.$form->type_formulaire.' done! ';
                }
                   
            } 

        }

        return response()->json([
            'Deug' => $countDemandesDeug,
            'Licence' => $countDemandesLicence,
            'DeugForAllFilieres' => $countDemandesDeugForAllFilieres,
            'LicenceForAllFilieres' => $countDemandesLicenceForAllFilieres,
         ]);
    }
            
}
        


        // return response()->json([
        //     'all'=> $sheetdb->get()[0]->cin,// returns all spreadsheets data
        //     'keys'=> $sheetdb->keys()[1], // returns all spreadsheets key names
        //     // 'names'=> $sheetdb->name(), //sheet name
        // ]);
