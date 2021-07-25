<?php

namespace App\Exports;

use App\Models\Etudiant;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportStudents implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Etudiant::all();
    }
}
