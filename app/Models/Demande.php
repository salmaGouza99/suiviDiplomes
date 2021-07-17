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
    protected $fillable = ['type_demande', 
    'date_demande',
    ];

    public function diplome(){
        return $this->hasOne(Diplome::class);
    }
    public function etudiant(){
        return $this->belongsTo(Etudiant::class);
    }
}
