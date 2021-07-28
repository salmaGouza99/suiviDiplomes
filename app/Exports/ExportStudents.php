<?php

namespace App\Exports;

use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use \Maatwebsite\Excel\Sheet;

Sheet::macro('styleCells', function (Sheet $sheet, string $cellRange, array $style) {
    $sheet->getDelegate()->getStyle($cellRange)->applyFromArray($style);
});

class ExportStudents implements FromCollection, WithHeadings, ShouldAutoSize, WithEvents
{
    protected $statut, $type, $filiere;

    /**
    * constructor
    *
    * @param string $statut 
    * @param string $type 
    * @param string $filiere 
    */
    function __construct($statut, $type, $filiere) 
    {
        $this->statut = $statut;
        $this->type = $type;
        $this->filiere = $filiere;
    } 

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        if ($this->statut and $this->type and $this->filiere)
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('dip.statut',$this->statut)
                    ->where('d.type_demande', $this->type)
                    ->where('e.filiere',$this->filiere)
                    ->select('apogee','cin','nom','prenom')
                    ->get();
        }
        if ($this->statut and $this->type and !$this->filiere)
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('dip.statut',$this->statut)
                    ->where('d.type_demande', $this->type)
                    ->select('apogee','cin','nom','prenom')
                    ->get();
        }
        if ($this->statut and $this->filiere and !$this->type)
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('dip.statut',$this->statut)
                    ->where('e.filiere',$this->filiere)
                    ->select('apogee','cin','nom','prenom')
                    ->get();
        }
        if ($this->type and $this->filiere and !$this->statut)
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('d.type_demande', $this->type)
                    ->where('e.filiere',$this->filiere)
                    ->select('apogee','cin','nom','prenom')
                    ->get();
        }
        if ($this->statut and !$this->type and !$this->filiere)
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('dip.statut',$this->statut)
                    ->select('apogee','cin','nom','prenom')
                    ->get();
        }
        if ($this->type and !$this->statut and !$this->filiere)
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('d.type_demande', $this->type)
                    ->select('apogee','cin','nom','prenom')
                    ->get();
        }
        if ($this->filiere and !$this->statut and !$this->type)
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('e.filiere',$this->filiere)
                    ->select('apogee','cin','nom','prenom')
                    ->get();
        }
    }

    /**
     * @return array
     */
    public function headings() :array
    {
        return ["Code apogee", "CIN", "Nom", "Prenom"];
    }

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $cellRange = 'A1:D1'; // All headers
                $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->setSize(12.5);
                $event->sheet->getStyle($cellRange)->getFill()
                            ->setFillType(\PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID)
                            ->getStartColor()->setARGB('81D3F8');
                $event->sheet->styleCells(
                    $cellRange,
                    [
                        'alignment' => [
                            'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        ],
                    ]
                );
                //$event->sheet->getDelegate()->getColumnDimension('A');
            },
        ];
    }
}
