<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Demande;
use App\Models\Diplome;
use Illuminate\Http\Request;
use App\Mail\NotificationDiplome;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class DiplomeController extends Controller
{
    /**
     * Display a listing of diplomes.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'diplomes' => Diplome::with('etudiant')->paginate(7),
        ]);
    }

    /**
     * creer un diplome avec date de cretation
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($demande_id)
    {
        $demande=Demande::with('etudiant')->find($demande_id);
        $demande->statut=1;
        $demande->save();
        $statut='cree';
        $diplome=Diplome::create(array(
            'demande_id' => $demande_id,
            'etudiant_cin'=>$demande->etudiant_cin,
            'statut'=>$statut,
            'date_creationDossier_envoiAuServiceDiplome'=>Carbon::today(),
        ));
        return response()->json([
            'diplomeCree'=> $diplome,
        ]);
    }

    /**
     * Display the specified diplome.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json([
            'diplome'=> Diplome::with('etudiant')->find($id),
        ]);
    }

    /**
     * Update DateImpression du diplome par service de diplome.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id_diplome
     * @return \Illuminate\Http\Response
     */
    public function updateDateImpression($id)
    {
       $diplome=Diplome::find($id);
       if(! $diplome->date_impression_envoiAuDecanat)
       {
            $diplome->update(array(
                'statut' =>'imprimé et envoyé au decanat',
                'date_impression_envoiAuDecanat'=>Carbon::today(),
                ));
                return response()->json([
                    'diplome'=>$diplome,
            ]);
        }
        return response()->json([
            'diplome'=>$diplome,
        ]);
    }

     /**
     * Update Date,Envoi du diplome a la presidence  par service de diplome.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id_diplome
     * @return json_Response
     */
    public function updateDateEnvoiPresidence($id)
    {
       $diplome=Diplome::find($id);
       if(! $diplome->date_generationBorodeaux_envoiApresidence)
       {
            $diplome->update(array(
                'statut' =>'Envoyé a la presidence',
                'date_generationBorodeaux_envoiApresidence'=>Carbon::today(),
                ));
                return response()->json([
                    'diplome'=>$diplome,
            ]);
        }
       return response()->json([
            'diplome'=>$diplome,
       ]);
    }

    /**
     * chercher diplome par CNE cINE ou APPOGE
     *
     * @param [string] $mc
     * @return json_response
     */
    public function search($mc)
    {
        $demandes = DB::table('diplomes as d')
            ->join('etudiants as e', 'd.etudiant_cin','=','e.cin')
            ->where('e.cin', 'like', '%'.$mc.'%')
            ->orWhere('e.cne', 'like', '%'.$mc.'%')
            ->orWhere('e.apogee', 'like', '%'.$mc.'%')
            ->get()->sortByDesc('date_creationDossier_envoiAuServiceDiplome');
        
        return response()->json($demandes);
    }

    public function sendMAil(){
        $mail=[
            'object' => 'Notification de diplome',
            'body' => 'votre diplome est pret',
        ];
        Mail::to('salma.gouza@uit.ac.ma')->send(new NotificationDiplome($mail));
        return response()->json([
            'response' => 'email sent',
        ]);
    }

}
