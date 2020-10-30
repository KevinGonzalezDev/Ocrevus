<?php

namespace App\Exports;

use App\User;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UsersExport implements FromCollection, WithHeadings
{
 public function collection()
 {
  $users = User::select('name', 'cedula', 'email',
  	 DB::raw('CASE WHEN current_score>0 THEN current_score ELSE "No Registra" END'),
  	 DB::raw('CASE WHEN score>0 THEN score ELSE "No Registra" END'),
  	 DB::raw('CASE WHEN score>0 THEN FROM_UNIXTIME(time+18000, "%d/%m/%Y %h:%i:%s %p") ELSE "No Aplica" END'))
   ->where('state', 'Activo')
   ->where('rol_id', 2)
   ->orderBy('score', 'desc')
   ->orderBy('time', 'asc')
   ->get();

  return $users;
 }

 public function headings(): array
 {
  return ['Nombre', 'N° Cédula', 'Correo Electrónico', 'Último Puntaje', 'Mejor Puntaje', 'Fecha Mejor Puntaje'];
 }
}
