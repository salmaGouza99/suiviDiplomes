<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diplome extends Model
{
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['type_diplome', 
    'statut',
    'date_creationDossier_envoiAuServiceDiplome',
    'date_impression_envoiAuDecanat',
    'date_singature_renvoiAuServiceDiplome',
    'date_generationBorodeaux_envoiApresidence',
    'date_receptionParBureauOrdre_envoiAuGuichetRetrait',
    'date_notificationetudiant',
    'date_retraitDiplome_archiveDossier',
    ];
}
