<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
 use HandlesAuthorization;

 public function __construct(){}

 public function dashboard(User $user)
 {
  if($user->rol->name=='Administrator')
   return true;
 }

 public function showUsers(User $user)
 {
  if($user->rol->name=='Administrator')
   return true;
 }

 public function download(User $user)
 {
  if($user->rol->name=='Administrator')
   return true;
 }

 public function game(/*User $user*/)
 {
  //if($user->rol->name=='Player')
   return true;
 }

 public function store(User $user)
 {
  if($user->rol->name=='Player')
   return true;
 }
}
