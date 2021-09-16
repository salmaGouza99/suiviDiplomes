<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Demande;
use App\Models\Diplome;
use App\Models\Etudiant;
use Illuminate\Http\Request;
use App\Mail\NotificationDiplome;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
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
        $diplomes=[];
        foreach(Diplome::with('demande','etudiant')->get()
                ->sortByDesc('date_creationDossier_envoiAuServiceDiplome') as $diplome)
        {
            $diplome=[
                'id' => $diplome->id,
                'cin' => $diplome->etudiant->cin,
                'apogee' => $diplome->etudiant->apogee,
                'cne' => $diplome->etudiant->cne,
                'nom' => $diplome->etudiant->nom,
                'prenom' => $diplome->etudiant->prenom,
                'nom_arabe' => $diplome->etudiant->nom_arabe,
                'prenom_arabe' => $diplome->etudiant->prenom_arabe,
                'filiere' => $diplome->etudiant->filiere,
                'option' => $diplome->etudiant->option,
                'nationalite' => $diplome->etudiant->nationalite,
                'date_naiss' => $diplome->etudiant->date_naiss,
                'lieu_naiss' => $diplome->etudiant->lieu_naiss,
                'type_demande' => $diplome->demande->type_demande,
                'statut_id' => $diplome->statut_id,
                'date_demande' => $diplome->demande->date_demande,
                'date_creation' => $diplome->date_creationDossier_envoiAuServiceDiplome,
                'date_impression' => $diplome->date_impression_envoiAuDecanat,
                'date_signature' => $diplome->date_singature_renvoiAuServiceDiplome,
                'date_envoi_Apresidence' => $diplome->date_generationBorodeaux_envoiApresidence,
                'date_reception' => $diplome->date_receptionParBureauOrdre_envoiAuGuichetRetrait,
                'date_notificationEtudiant' => $diplome->date_notificationEtudiant,
                'date_retrait' => $diplome->date_retraitDiplome_archiveDossier,
                'date_reedition' => $diplome->date_reedition,
                'type_erreur' => $diplome->type_erreur,
            ];
            array_push($diplomes,$diplome);
        }
        return response()->json([
            'diplomes' => $diplomes
        ]); 
    }

    /**
     * creer un diplome avec date de cretation par GuichetDroitArabe,
     *           GuichetDroitFrancais ou GuichetEconomie
     *
     * @param  int  $demande_id
     * @return \Illuminate\Http\Response
     */
    public function store($demande_id)
    {
        $demande = Demande::with('etudiant')->where('traite', '=', 0)->find($demande_id);

        // store diplome according to a role
        $diplome = null;
        if ($demande) {
            if (Auth::user()->hasRole('Guichet Droit Arabe')) {
                if ($demande->etudiant->filiere == 'القانون باللغة العربية') {
                    $diplome = Diplome::create(array(
                        'demande_id' => $demande_id,
                        'etudiant_cin' => $demande->etudiant_cin,
                        'date_creationDossier_envoiAuServiceDiplome' => Carbon::today()->format('Y-m-d'),
                    ));
                    $demande->traite = 1;
                    $demande->save();
                }
            } else if(Auth::user()->hasRole('Guichet Droit Français')) {
                if ($demande->etudiant->filiere == 'Droit en français')
                {
                    $diplome = Diplome::create(array(
                        'demande_id' => $demande_id,
                        'etudiant_cin' => $demande->etudiant_cin,
                        'date_creationDossier_envoiAuServiceDiplome' => Carbon::today()->format('Y-m-d'),
                    ));
                    $demande->traite = 1;
                    $demande->save();
                }
            } else if (Auth::user()->hasRole('Guichet Economie')) {
                if ($demande->etudiant->filiere == 'Sciences Economiques et Gestion') {
                    $diplome = Diplome::create(array(
                        'demande_id' => $demande_id,
                        'etudiant_cin' => $demande->etudiant_cin,
                        'date_creationDossier_envoiAuServiceDiplome' => Carbon::today()->format('Y-m-d'),
                    ));
                    $demande->traite = 1;
                    $demande->save();
                }
            }
        }

        return response()->json([
            'diplomeCree' => $diplome,
        ]);
    }

    /**
     * Display the specified diplome.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $diplome = Diplome::with('demande', 'etudiant')->find($id);
        $diplome = [
            'id' => $diplome->id,
            'cin' => $diplome->etudiant->cin,
            'apogee' => $diplome->etudiant->apogee,
            'cne' => $diplome->etudiant->cne,
            'nom' => $diplome->etudiant->nom,
            'prenom' => $diplome->etudiant->prenom,
            'nom_arabe' => $diplome->etudiant->nom_arabe,
            'prenom_arabe' => $diplome->etudiant->prenom_arabe,
            'filiere' => $diplome->etudiant->filiere,
            'option' => $diplome->etudiant->option,
            'nationalite' => $diplome->etudiant->nationalite,
            'date_naiss' => $diplome->etudiant->date_naiss,
            'lieu_naiss' => $diplome->etudiant->lieu_naiss,
            'email_inst' => $diplome->etudiant->email_inst,
            'type_demande' => $diplome->demande->type_demande,
            'date_demande' => $diplome->demande->date_demande,
            'date_creationDossier_envoiAuServiceDiplome' => $diplome->date_creationDossier_envoiAuServiceDiplome,
            'date_impression_envoiAuDecanat' => $diplome->date_impression_envoiAuDecanat,
            'date_singature_renvoiAuServiceDiplome' => $diplome->date_singature_renvoiAuServiceDiplome,
            'date_generationBorodeaux_envoiApresidence' => $diplome->date_generationBorodeaux_envoiApresidence,
            'date_receptionParBureauOrdre_envoiAuGuichetRetrait' => $diplome->date_receptionParBureauOrdre_envoiAuGuichetRetrait,
            'date_notificationEtudiant' => $diplome->date_notificationEtudiant,
            'date_retraitDiplome_archiveDossier' => $diplome->date_retraitDiplome_archiveDossier,
            'date_reedition' => $diplome->date_reedition,
            'type_erreur' => $diplome->type_erreur,
        ];

        return response()->json([
            'diplome' => $diplome
        ]);
    }

    /**
     * Update DateReedition du diplome et type d'erreur par service de diplomes.
     *
     * @param  \App\Models\Diplome $diplome
     * @return \Illuminate\Http\Response
     */
    public function updateDateReedition(Request $request, Diplome $diplome)
    {
        $request->validate([
            'type_erreur' => 'required|string'
        ]);

            $diplome->statut_id = 2;
            $diplome->type_erreur = $request->type_erreur;
            $diplome->date_reedition = Carbon::today()->format('Y-m-d'); 
            $diplome->save();

            return response()->json([
                'success' => $diplome,
                'message' => 'Diplôme réédité'
            ]);
    }

    /**
     * Update DateImpression du diplome par service de diplomes.
     *
     * @param  \App\Models\Diplome $diplome
     * @return \Illuminate\Http\Response
     */
    public function updateDateImpression(Diplome $diplome)
    {
        // test if the specified date is null 
        if (!$diplome->date_impression_envoiAuDecanat) {

            $diplome->statut_id = 3;
            $diplome->date_impression_envoiAuDecanat = Carbon::today()->format('Y-m-d'); 
            $diplome->save();

            return response()->json([
                'success' => $diplome,
            ]);
        }
        return response()->json([
            'error' => $diplome
        ]);
    }

    /**
     * Update DateSignature du diplome par decanat.
     *
     * @param  \App\Models\Diplome $diplome
     * @return \Illuminate\Http\Response
     */
    public function updateDateSignature(Diplome $diplome)
    {
        // test if the specified date is null and the previous date not null
        if (!$diplome->date_singature_renvoiAuServiceDiplome
            and $diplome->date_impression_envoiAuDecanat
        ) {
            $diplome->statut_id = 4;
            $diplome->date_singature_renvoiAuServiceDiplome = Carbon::today()->format('Y-m-d'); 
            $diplome->save();

            return response()->json([
                'success' => $diplome,
            ]);
        }
        return response()->json([
            'error' => $diplome,
        ]);
    }

    /**
     * Update DateEnvoi du diplome a la presidence par service de diplomes.
     *
     * @param  \App\Models\Diplome $diplome
     * @return \Illuminate\Http\Response
     */
    public function updateDateEnvoiApresidence(Diplome $diplome)
    {
        // test if the specified date is null and the previous dates not null
        if (
            !$diplome->date_generationBorodeaux_envoiApresidence
            and $diplome->date_singature_renvoiAuServiceDiplome
            and $diplome->date_impression_envoiAuDecanat
        ) {
            $diplome->statut_id = 5;
            $diplome->date_generationBorodeaux_envoiApresidence = Carbon::today()->format('Y-m-d'); 
            $diplome->save();

            return response()->json([
                'success' => $diplome,
            ]);
        }
        return response()->json([
            'error' => $diplome
        ]);
    }

    /**
     * Update DateReception du diplome par bureau d'ordre.
     *
     * @param  \App\Models\Diplome $diplome
     * @return \Illuminate\Http\Response
     */
    public function updateDateReceptionParBureauOrdre(Diplome $diplome)
    {
        // test if the specified date is null and the previous dates not null
        if (
            !$diplome->date_receptionParBureauOrdre_envoiAuGuichetRetrait
            and $diplome->date_generationBorodeaux_envoiApresidence
            and $diplome->date_singature_renvoiAuServiceDiplome
            and $diplome->date_impression_envoiAuDecanat
        ) {
            $diplome->statut_id = 6;
            $diplome->date_receptionParBureauOrdre_envoiAuGuichetRetrait = Carbon::today()->format('Y-m-d'); 
            $diplome->save();
           
            return response()->json([
                'success' => $diplome,
            ]);
        }
        return response()->json([
            'error' => $diplome,
        ]);
    }

    /**
     * Update DateNotificationEtudiant par guichet de retrait.
     *
     * @param  \App\Models\Diplome $diplome
     * @return \Illuminate\Http\Response
     */
    public function updateDateNotificationEtudiant(Diplome $diplome)
    {
        // test if the specified date is null and the previous dates not null
        if (
            !$diplome->date_notificationEtudiant
            and $diplome->date_receptionParBureauOrdre_envoiAuGuichetRetrait
            and $diplome->date_generationBorodeaux_envoiApresidence
            and $diplome->date_singature_renvoiAuServiceDiplome
            and $diplome->date_impression_envoiAuDecanat
        ) {
            $diplome->statut_id = 7;
            $diplome->date_notificationEtudiant = Carbon::today()->format('Y-m-d'); 
            $diplome->save();
           
            return response()->json([
                'success' => $diplome,
            ]);
        }
        return response()->json([
            'error' => $diplome,
        ]);
    }

    /**
     * Update DateRetrait du diplome et envoi du dossier aux arhives par guichet de retrait.
     *
     * @param  \App\Models\Diplome $diplome
     * @return \Illuminate\Http\Response
     */
    public function updateDateRetraitDiplomeArchiveDossier(Diplome $diplome)
    {
        // test if the specified date is null and the previous dates not null
        if (
            !$diplome->date_retraitDiplome_archiveDossier
            and $diplome->date_notificationEtudiant
            and $diplome->date_receptionParBureauOrdre_envoiAuGuichetRetrait
            and $diplome->date_generationBorodeaux_envoiApresidence
            and $diplome->date_singature_renvoiAuServiceDiplome
            and $diplome->date_impression_envoiAuDecanat
        ) {
            $diplome->statut_id = 8;
            $diplome->date_retraitDiplome_archiveDossier = Carbon::today()->format('Y-m-d'); 
            $diplome->save();
            
            return response()->json([
                'success' => $diplome,
            ]);
        }
        return response()->json([
            'error' => $diplome,
        ]);
    }

    /**
     * Notify etudent by sending notif to his email 
     *
     * @param  int $id_diplome
     * @return \Illuminate\Http\Response
     */
    public function sendMAil($id_diplome)
    {
        $diplome = Diplome::with('etudiant', 'demande')->find($id_diplome);
        $mail = [
            'object' => 'Notification de diplôme',
            'body' => 'Bonjour '
                . $diplome->etudiant->nom . ' ' . $diplome->etudiant->prenom .
                ', votre ' . $diplome->demande->type_demande . ' est prêt, 
                       vous pouvez venir pour le récupérer auprès du guichet 
                       de retrait des diplômes dans un délai de 3 jours au maximum!',
        ];

        // test if the specified date is null and the previous dates not null
        if ($diplome) {
            if (
                !$diplome->date_notificationEtudiant
                and $diplome->date_receptionParBureauOrdre_envoiAuGuichetRetrait
                and $diplome->date_generationBorodeaux_envoiApresidence
                and $diplome->date_singature_renvoiAuServiceDiplome
                and $diplome->date_impression_envoiAuDecanat
            ) {

                // Mail::to($diplome->etudiant->email_inst)->send(new NotificationDiplome($mail));
                Mail::to("assma.benkaddour@uit.ac.ma")->send(new NotificationDiplome($mail));
                
                return response()->json([
                    'successEmail' => 'Email de notification envoyé avec succès à ' . $diplome->etudiant->email_inst . '.',
                ]);
            }
        }

        return response()->json([
            'errorEmail' => 'cannot send mail!',
        ]);
    }

    /**
     * Display a listing of statuts.
     *
     * @return \Illuminate\Http\Response
     */
    public function statuts()
    {
        return response()->json([
            'statuts' => DB::table('statut_diplome')->get()
        ]);
    }
}
