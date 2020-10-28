<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function welcome(){
        return view('welcome');
    }

    public function paginaInicial(){
        return view('paginaInicial');
    }

    public function Tiempos(){
        return view('Tiempos');
    }

    public function Em(){
        return view('Em');
    }

    public function popup(){
        return view('popup');
    }
}
