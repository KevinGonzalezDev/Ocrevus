<?php

namespace App\Http\Requests\Back;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
 public function authorize()
 {
  return true;
 }

 public function rules()
 {
  return [
   'email' => ['required', 'email', 'max:100'],
   'password' => ['required', 'max:30', 'min:6']
  ];
 }

 public function messages()
 {
  return [
   'email.required' => 'Debe ingresar el correo electrónico',
   'email.email' => 'Debe ingresar un email válido',
   'email.max' => 'Máximo 100 caracteres',
   'password.required' => 'Debe ingresar la contraseña',
   'password.max' => 'Máximo 30 caracteres',
   'password.min' => 'Mínimi 6 caracteres'
  ];
 }
}
