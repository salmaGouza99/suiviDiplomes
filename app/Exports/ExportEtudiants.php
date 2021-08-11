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

class ExportEtudiants implements FromCollection, WithHeadings, ShouldAutoSize, WithEvents
{
    protected $type, $filiere;

    /**
    * constructor
    *
    * @param string $type 
    * @param string $filiere 
    */
    function __construct($type, $filiere) 
    {
        $this->type = $type;
        $this->filiere = $filiere;
    } 

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        if ($this->type and $this->filiere)
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('dip.statut_id',6)
                    ->where('d.type_demande', $this->type)
                    ->where('e.filiere',$this->filiere)
                    ->select('apogee','cin','nom','prenom','filiere','type_demande')
                    ->get();
        }
        elseif ($this->type and !$this->filiere)
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('dip.statut_id',6)
                    ->where('d.type_demande', $this->type)
                    ->select('apogee','cin','nom','prenom','filiere','type_demande')
                    ->get();
        }
        elseif ($this->filiere and !$this->type)
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('dip.statut_id',6)
                    ->where('e.filiere',$this->filiere)
                    ->select('apogee','cin','nom','prenom','filiere','type_demande')
                    ->get();
        }
        else 
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('dip.statut_id',6)
                    ->select('apogee','cin','nom','prenom','filiere','type_demande')
                    ->get();
        }
    }

    /**
     * @return array
     */
    public function headings() :array
    {
        return ["Code apogée", "CIN", "Nom", "Prénom", "Filière", "Type de diplôme"];
    }

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $cellRange = 'A1:G1'; // All headers
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
