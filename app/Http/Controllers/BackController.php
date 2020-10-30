<?php

namespace App\Http\Controllers;

use App\Exports\UsersExport;
use App\Http\Requests\Back\LoginRequest;
use App\User;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Facades\Excel;

class BackController extends Controller
{
 public function __construct()
 {
  $this->middleware('auth')->except(['login', 'showLoginForm']);
 }

 public function dashboard()
 {
  $this->authorize('dashboard', User::class);

  return view('back.dashboard');
 }

 public function showLoginForm()
 {
  if(Auth::check()=='true'){
   return redirect()->route('dashboard');
  }
  else{
   return view('back.login');
  }
 }

 public function login(LoginRequest $request)
 {
  if(Auth::attempt(['email' => $request->email, 'password' => $request->password, 'rol_id' => 1, 'state' => 'Activo']))
  {
   $user = $this->getUser($request->email);

   Auth::login($user);
   session()->flash('user.login', 'Has ingresado exitosamente.');

   return redirect()->route('dashboard');
  }
  else
  {
   return back()
    ->withErrors(['email' => trans('auth.failed')])
    ->withInput(request(['email']));
  }
 }

 public function showUsers(Request $request)
 {
  $this->authorize('showUsers', User::class);

  $users = $this->getUsers()->get();

  if(count($request->all())!=0)
   $usersPaginate = $this->getUsersByFilters($request)->paginate(10);
  else
   $usersPaginate = $this->getUsers()->paginate(10);

  return view('back.user', compact(['users', 'usersPaginate']));
 }

 public function download()
 {
  $this->authorize('download', User::class);

  return Excel::download(new UsersExport(), 'Usuarios.xlsx');
 }

 private function getUser($email)
 {
  $query = User::where('email', $email)->firstOrFail();

  return $query;
 }

 private function getUsers()
 {
  $query = User::select('name', 'cedula', 'email', 'current_score', 'score', 'time')
   ->where('state', 'Activo')
   ->where('rol_id', 2)
   ->orderBy('score', 'desc')
   ->orderBy('time', 'asc');

  return $query;
 }

 private function getUsersByFilters($request)
 {
  $query = User::Filter($request)
   ->select('name', 'cedula', 'email', 'current_score', 'score', 'time')
   ->where('state', 'Activo')
   ->where('rol_id', 2)
   ->orderBy('score', 'desc')
   ->orderBy('time', 'asc');

  return $query;
 }

 public function logout()
 {
  Auth::logout();
  return redirect('/');
 }
}
