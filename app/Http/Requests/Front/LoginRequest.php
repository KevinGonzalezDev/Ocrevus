<?php

namespace App\Http\Requests\Front;

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
   'email' => ['required', 'email', 'max:100']
  ];
 }

 public function messages()
 {
  return [
   'email.required' => 'Es necesario que ingrese su email.',
   'email.email' => 'Debe ingresar un email válido.',
   'email.max' => 'Máximo 100 caracteres.'
  ];
 }
}
