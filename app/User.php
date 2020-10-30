<?php

namespace App;

use App\Notifications\MyResetPassword;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
 use Notifiable;

 protected $fillable = ['name', 'cedula', 'email', 'current_score', 'score', 'time', 'rol_id', 'state'];

 protected $hidden = ['password', 'remember_token'];

 protected $casts = ['email_verified_at' => 'datetime'];

 public function rol()
 {
  return $this->belongsTo('App\Rol');
 }

 public function scopeFilter($query, $request)
 {
  if($request->name)
   $this->getName($query, $request->name);
  else if($request->cedula)
   $this->getCedula($query, $request->cedula);
  else if($request->email)
   $this->getEmail($query, $request->email);
  else if($request->search)
   $this->getSearch($query, $request->search);
 }

 private function getName($query, $name)
 {
  return $query->where('name', $name);
 }

 private function getCedula($query, $cedula)
 {
  return $query->where('cedula', $cedula);
 }

 private function getEmail($query, $email)
 {
  return $query->where('email', $email);
 }

 private function getSearch($query, $search)
 {
  return $query->where('name', 'LIKE', "%{$search}%")
   ->orWhere('name', 'LIKE', "%{$search}%")
   ->orWhere('cedula', 'LIKE', "%{$search}%")
   ->orWhere('email', 'LIKE', "%{$search}%");
 }

 public function sendPasswordResetNotification($token)
 {
  $this->notify(new MyResetPassword($token));
 }
}
