<?php

namespace App\Http\Controllers;

use App\Http\Requests\Front\LoginRequest;
use App\Http\Requests\Front\RegisterRequest;
use App\User;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class FrontController extends Controller
{
 private $now;

 public function __construct()
 {
  $this->middleware('auth')->only(['game', 'store']);
  date_default_timezone_set('America/Bogota');
  $this->now = time()-18000;
 }

 public function showRegisterForm()
 {
  if(Auth::check()=='true'){
   return redirect()->route('game');
  }
  else{
   return view('welcome');
  }
 }

 public function showLoginForm()
 {
  if(Auth::check()=='true'){
   return redirect()->route('game');
  }
  else{
   return view('welcome');
  }
 }

 public function game()
 {
  $this->authorize('game', User::class);

  return view('game');
 }

 public function register(RegisterRequest $request)
 {
  $user = new User;
  $user->name = $request->name;
  $user->cedula = $request->cedula;
  $user->email = $request->email;
  $user->rol_id = 2;
  $user->state = 'Activo';
  $user->password = Hash::make('secret');
  $user->created_at = Carbon::now();
  $user->save();

  if($user)
  {
   Auth::login($user);
   session()->flash('user.store', 'Se ha registrado exitosamente.');

   return redirect()->route('game');
  }
 }

 public function login(LoginRequest $request)
 {
  if(Auth::attempt(['email' => $request->email, 'password' => 'secret', 'rol_id' => 2, 'state' => 'Activo']))
  {
   $user = $this->getUser($request->email);

   Auth::login($user);
   session()->flash('user.login', 'Has ingresado exitosamente.');

   return redirect()->route('game');
  }
  else
  {
   session()->flash('user.fail', 'El usuario no existe en el sistema');

   return redirect()->route('welcome');
  }
 }

 public function store($score)
 {
  $this->authorize('store', User::class);

  $user = Auth::user();
  $user->current_score = $score;

  if($user->score==0 || $user->score<$score)
  {
   $user->score = $score;
   $user->time = $this->now;
  }

  $user->updated_at = Carbon::now();
  $user->save();
 }

 public function ranking()
 {
  $users = $this->getUsers();

  return view('front.ranking', compact('users'));
 }

 public function session()
 {
  if(Auth::check()=='true')
   return env('SESSION_LIFETIME');
  else
   return 'No logueado';
 }

 private function getUser($email)
 {
  $query = User::where('email', $email)->firstOrFail();

  return $query;
 }

 private function getUsers()
 {
  $query = User::where('rol_id', 2)
   ->where('state', 'Activo')
   ->where('score', '!=', 0)
   ->orderBy('score', 'desc')
   ->orderBy('time', 'asc')
   ->limit(10)
   ->get();

  return $query;
 }
}
