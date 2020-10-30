<?php

namespace App\Http\Requests\Front;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
  public function authorize()
  {
   return true;
  }

  public function rules()
  {
   return [
    'name' => ['required', 'max:200', 'min:3', 'regex:/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.-]+$/'],
    'cedula' => ['required', 'digits_between:6,15', 'numeric', 'unique:users'],
    'email' => ['required', 'email', 'max:100', 'unique:users'],
    'terminos' => ['required' , 'accepted'],
    'privacidad' => ['required' , 'accepted']
   ];
  }

  public function messages()
  {
   return [
    'name.required' => 'Debe ingresar su nombre completo.',
    'name.max' => 'Máximo 200 caracteres.',
    'name.min' => 'Mínimo 3 caracteres.',
    'name.regex' => 'El nombre ingresado contiene números y/o carácteres especiales, solo se aceptan letras.',
    'cedula.required' => 'Debe ingresar su número de cédula.',
    'cedula.digits_between' => 'El número debe ser entre 6 a 15 dígitos.',
    'cedula.numeric' => 'Solo se admiten números, sin letras, espacios o guiones.',
    'cedula.unique' => 'Esta cédula ya se encuentra registrada.',
    'email.required' => 'Debe ingresar su correo electrónico.',
    'email.email' => 'Debe ingresar un correo electrónico válido.',
    'email.max' => 'Máximo 100 caracteres.',
    'email.unique' => 'Este correo ya se encuentra registrado.',
    'terminos.required' => 'Debe aceptar términos y condiciones.',
    'privacidad.required' => 'Debe aceptar la privacidad de datos.'
   ];
  }
}
