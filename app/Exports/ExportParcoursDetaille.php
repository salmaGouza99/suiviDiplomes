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
                    ->where('dip.statut_id',$this->statut)
                    ->where('d.type_demande', $this->type)
                    ->where('e.filiere',$this->filiere)
                    ->select('apogee','cin','cne','nom','prenom','filiere','type_demande','statut_id',
                            'date_creationDossier_envoiAuServiceDiplome',
                            'date_reedition','type_erreur','date_impression_envoiAuDecanat',
                            'date_singature_renvoiAuServiceDiplome','date_generationBorodeaux_envoiApresidence',
                            'date_receptionParBureauOrdre_envoiAuGuichetRetrait','date_notificationEtudiant',
                            'date_retraitDiplome_archiveDossier')
                    ->get();
        }
        elseif ($this->statut and $this->type and !$this->filiere)
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('dip.statut_id',$this->statut)
                    ->where('d.type_demande', $this->type)
                    ->select('apogee','cin','cne','nom','prenom','filiere','type_demande','statut_id',
                            'date_creationDossier_envoiAuServiceDiplome',
                            'date_reedition','type_erreur','date_impression_envoiAuDecanat',
                            'date_singature_renvoiAuServiceDiplome','date_generationBorodeaux_envoiApresidence',
                            'date_receptionParBureauOrdre_envoiAuGuichetRetrait','date_notificationEtudiant',
                            'date_retraitDiplome_archiveDossier')
                    ->get();
        }
        elseif ($this->statut and $this->filiere and !$this->type)
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('dip.statut_id',$this->statut)
                    ->where('e.filiere',$this->filiere)
                    ->select('apogee','cin','cne','nom','prenom','filiere','type_demande','statut_id',
                            'date_creationDossier_envoiAuServiceDiplome',
                            'date_reedition','type_erreur','date_impression_envoiAuDecanat',
                            'date_singature_renvoiAuServiceDiplome','date_generationBorodeaux_envoiApresidence',
                            'date_receptionParBureauOrdre_envoiAuGuichetRetrait','date_notificationEtudiant',
                            'date_retraitDiplome_archiveDossier')
                    ->get();
        }
        elseif ($this->type and $this->filiere and !$this->statut)
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('d.type_demande', $this->type)
                    ->where('e.filiere',$this->filiere)
                    ->select('apogee','cin','cne','nom','prenom','filiere','type_demande','statut_id',
                            'date_creationDossier_envoiAuServiceDiplome',
                            'date_reedition','type_erreur','date_impression_envoiAuDecanat',
                            'date_singature_renvoiAuServiceDiplome','date_generationBorodeaux_envoiApresidence',
                            'date_receptionParBureauOrdre_envoiAuGuichetRetrait','date_notificationEtudiant',
                            'date_retraitDiplome_archiveDossier')
                    ->get();
        }
        elseif ($this->statut and !$this->type and !$this->filiere)
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('dip.statut_id',$this->statut)
                    ->select('apogee','cin','cne','nom','prenom','filiere','type_demande','statut_id',
                            'date_creationDossier_envoiAuServiceDiplome',
                            'date_reedition','type_erreur','date_impression_envoiAuDecanat',
                            'date_singature_renvoiAuServiceDiplome','date_generationBorodeaux_envoiApresidence',
                            'date_receptionParBureauOrdre_envoiAuGuichetRetrait','date_notificationEtudiant',
                            'date_retraitDiplome_archiveDossier')
                    ->get();
        }
        elseif ($this->type and !$this->statut and !$this->filiere)
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('d.type_demande', $this->type)
                    ->select('apogee','cin','cne','nom','prenom','filiere','type_demande','statut_id',
                            'date_creationDossier_envoiAuServiceDiplome',
                            'date_reedition','type_erreur','date_impression_envoiAuDecanat',
                            'date_singature_renvoiAuServiceDiplome','date_generationBorodeaux_envoiApresidence',
                            'date_receptionParBureauOrdre_envoiAuGuichetRetrait','date_notificationEtudiant',
                            'date_retraitDiplome_archiveDossier')
                    ->get();
        }
        elseif ($this->filiere and !$this->statut and !$this->type)
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->where('e.filiere',$this->filiere)
                    ->select('apogee','cin','cne','nom','prenom','filiere','type_demande','statut_id',
                            'date_creationDossier_envoiAuServiceDiplome',
                            'date_reedition','type_erreur','date_impression_envoiAuDecanat',
                            'date_singature_renvoiAuServiceDiplome','date_generationBorodeaux_envoiApresidence',
                            'date_receptionParBureauOrdre_envoiAuGuichetRetrait','date_notificationEtudiant',
                            'date_retraitDiplome_archiveDossier')
                    ->get();
        }
        else 
        {
            return  DB::table('diplomes as dip')
                    ->join('etudiants as e', 'dip.etudiant_cin','=','e.cin')
                    ->join('demandes as d', 'dip.demande_id','=','d.id')
                    ->select('apogee','cin','cne','nom','prenom','filiere','type_demande','statut_id',
                            'date_creationDossier_envoiAuServiceDiplome',
                            'date_reedition','type_erreur','date_impression_envoiAuDecanat',
                            'date_singature_renvoiAuServiceDiplome','date_generationBorodeaux_envoiApresidence',
                            'date_receptionParBureauOrdre_envoiAuGuichetRetrait','date_notificationEtudiant',
                            'date_retraitDiplome_archiveDossier')
                    ->get();
        }
    }

    /**
     * @return array
     */
    public function headings() :array
    {
        return ["Code apogee", "CIN", 'CNE', "Nom", "Prénom", "Filière", "Type de diplôme",
                'Statut de diplôme', 'Date création du dossier', 'Date réédition', 'Type d\'erreur',
                'Date impression', 'Date signature', 'Date envoi à la présidence',
                'Date réception', 'Date notification étudiant', 'Date retrait'
        ];
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
