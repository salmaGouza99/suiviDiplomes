<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demande extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['etudiant_cin',
    'type_demande', 
    'date_demande',
    'traite'
    ];

    public function diplome(){
        return $this->hasOne(Diplome::class);
    }
    public function etudiant(){
        return $this->belongsTo(Etudiant::class, 'etudiant_cin', 'cin');
    }
}
