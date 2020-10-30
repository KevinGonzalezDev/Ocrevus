<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\BackController;
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
Route::post("/game", "App\Http\Controllers\AdminController@game")->name('game');
Route::get("/Tiempos", "App\Http\Controllers\AdminController@Tiempos")->name('Tiempos');
Route::get("/Em", "App\Http\Controllers\AdminController@Em")->name('Em');
Route::get("/popup", "App\Http\Controllers\AdminController@popup")->name('popup');





/* TRASLADADO DE LA PLATAFORMA ANTIGUA */
Route::get('/', [ 'as' => '/', 'uses' => 'App\Http\Controllers\FrontController@showLoginForm']);
Route::get('ranking', [ 'as' => 'ranking', 'uses' => 'App\Http\Controllers\FrontController@ranking']);
Route::get('register', [ 'as' => 'register', 'uses' => 'App\Http\Controllers\FrontController@showRegisterForm']);
Route::get('session', [ 'as' => 'session', 'uses' => 'App\Http\Controllers\FrontController@session']);
Route::post('login/front', [ 'as' => 'login.front', 'uses' => 'App\Http\Controllers\FrontController@login']);
Route::post('register', [ 'as' => 'register', 'uses' => 'App\Http\Controllers\FrontController@register']);

Route::get('login', [ 'as' => 'login', 'uses' => 'App\Http\Controllers\BackController@showLoginForm']);
Route::get('logout', [ 'as' => 'logout', 'uses' => 'App\Http\Controllers\BackController@logout']);
Route::post('login/back',  [ 'as' => 'login.back', 'uses'=> 'App\Http\Controllers\BackController@login']);

Route::group(['middleware' => 'auth'], function()
{
 Route::get('game', [ 'as' => 'game', 'uses' => 'App\Http\Controllers\FrontController@game']);
 Route::put('store/{score}', [ 'as' => 'store', 'uses' => 'App\Http\Controllers\FrontController@store']);

 Route::get('dashboard', [ 'as' => 'dashboard', 'uses' => 'App\Http\Controllers\BackController@dashboard']);
 Route::get('user', [ 'as' => 'user.index', 'uses' => 'App\Http\Controllers\BackController@showUsers']);
 Route::get('user/download', ['as'=>'user.download', 'uses' => 'App\Http\Controllers\BackController@download']);
});
