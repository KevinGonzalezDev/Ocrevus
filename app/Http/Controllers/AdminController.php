<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function paginaInicial(){
        return view('paginaInicial');
    }

    public function Tiempos(){
        return view('Tiempos');
    }
}
