<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['cin', 
    'apogee',
    'cne',
    'nom',
    'prenom',
    'nom_arabe',
    'prenom_arabe',
    'filiere',
    'option',
    'nationalite',
    'date_naiss',
    'lieu_naiss',
    'email_inst',
    ];
}
