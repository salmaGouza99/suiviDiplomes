<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiplomeReedite extends Model
{
    use HasFactory;
    protected $fillable = 
    [ 
    'typeErreur',
    'dateReedition',
    ];
}
