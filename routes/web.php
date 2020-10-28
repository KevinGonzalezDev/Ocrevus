<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get("/welcome", "App\Http\Controllers\AdminController@welcome")->name('welcome');
Route::get("/paginaInicial", "App\Http\Controllers\AdminController@paginaInicial")->name('paginaInicial');
Route::get("/Tiempos", "App\Http\Controllers\AdminController@Tiempos")->name('Tiempos');
Route::get("/Em", "App\Http\Controllers\AdminController@Em")->name('Em');
Route::get("/popup", "App\Http\Controllers\AdminController@popup")->name('popup');