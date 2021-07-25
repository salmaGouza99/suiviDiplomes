<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Exports\ExportStudents;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Etudiant;

class ExportController extends Controller
{
    public function export() 
    {
        return Excel::download(new ExportStudents, 'etudiants.xlsx');
    }

    /* public function headers()
    {
        $etudiants = array();
        $etudiants[] = [
                'cin',
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
                'email_inst'
        ];
        $etudiants[] = Etudiant::all();
        return $etudiants;
    } */
}
