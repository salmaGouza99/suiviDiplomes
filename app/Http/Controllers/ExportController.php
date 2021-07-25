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
}
