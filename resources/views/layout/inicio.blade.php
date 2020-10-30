<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
 <head>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="description" content="{{ strtotime(date('Y-m-d H:i:s')) }}">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link href="{{ asset('/img/favicon.png') }}" rel="icon">
  <link href="{{ asset('/css/app.css') }}" rel="stylesheet">
  <title>{{ config('app.name', 'Roche') }}</title>
 </head>
 <body id="page-top">
  <main class="col-12 main">
   <article class="main__container">
    <header class="header shadow" id="header_fixed">
     <a class="col-3 col-md-2 btn-header mx-2 mx-md-0" href="{{ route('/') }}">
      <img class="img-fluid" src="{{ asset('/img/elements/ocrevus.png') }}">
     </a>
     <a class="col-2 col-md-1 btn-header mx-2 mx-md-0" href="{{ route('/') }}">
      <img class="img-fluid" src="{{ asset('/img/elements/logo.png') }}">
     </a>
     <button class="col-1 btn-header btnMenuNoCollapse ml-auto">
      <img class="img-fluid w-100" src="{{ asset('/img/elements/toggle.png') }}">
     </button>
     <div class="col-5 header__menu offset-3">
      @guest
       <a class="col-4 btn-header @if(Request::is('/')) active @endif" href="{{ route('/') }}">
        <p class="font-weight-bold m-0 small">Login</p>
       </a>
      @endguest
      <a class="col-4 btn-header @if(Request::is('ranking')) active @endif" href="{{ route('ranking') }}">
       <p class="font-weight-bold m-0 small">Ranking</p>
      </a>
      @auth
       <a class="col-4 btn-header @if(Request::is('game')) active @endif" href="{{ route('game') }}">
        <p class="font-weight-bold m-0 small">Juego</p>
       </a>
       <a class="col-4 btn-header" href="{{ route('logout') }}">
        <img class="img-fluid w-60" src="{{ asset('/img/elements/cerrar.png') }}">
       </a>
      @endauth
     </div>
    </header>
    <aside class="immovable">
     <a class="col-3 col-md-2 btn-header mx-2 mx-md-0" href="{{ route('/') }}">
      <img class="img-fluid" src="{{ asset('/img/elements/ocrevus.png') }}">
     </a>
     <a class="col-2 col-md-1 btn-header mx-2 mx-md-0" href="{{ route('/') }}">
      <img class="img-fluid" src="{{ asset('/img/elements/logo.png') }}">
     </a>
     <button class="col-1 btn-header btnMenuNoCollapse ml-auto">
      <img class="img-fluid w-100" src="{{ asset('/img/elements/toggle.png') }}">
     </button>
     <div class="col-5 header__menu offset-3">
      @guest
       <a class="col-4 btn-header @if(Request::is('/')) active @endif" href="{{ route('/') }}">
        <p class="font-weight-bold m-0 small">Login</p>
       </a>
      @endguest
      <a class="col-4 btn-header @if(Request::is('ranking')) active @endif" href="{{ route('ranking') }}">
       <p class="font-weight-bold m-0 small">Ranking</p>
      </a>
      @auth
       <a class="col-4 btn-header @if(Request::is('game')) active @endif" href="{{ route('game') }}">
        <p class="font-weight-bold m-0 small">Juego</p>
       </a>
       <a class="col-4 btn-header" href="{{ route('logout') }}">
        <img class="img-fluid w-60" src="{{ asset('/img/elements/cerrar.png') }}">
       </a>
      @endauth
     </div>
    </aside>
    <div class="middle">
     @yield('content')
    </div>
   </article>
   <nav class="sidebar">
    <section class="sidebar__body mt-8">
     @guest
      <a class="col-12 btn-body @if(Request::is('/')) active @endif" href="{{ route('/') }}">
       <p class="font-weight-bold m-0">Login</p>
      </a>
     @endguest
     <a class="col-12 btn-body @if(Request::is('ranking')) active @endif" href="{{ route('ranking') }}">
      <h4 class="font-weight-bold m-0">Ranking</h4>
     </a>
     @auth
      <a class="col-12 btn-body @if(Request::is('game')) active @endif" href="{{ route('game') }}">
       <h4 class="font-weight-bold m-0">Juego</h4>
      </a>
      <a class="col-12 btn-body" href="{{ route('logout') }}">
       <h4 class="font-weight-bold m-0">Cerrar Sesión</h4>
      </a>
     @endauth
    </section>
   </nav>
   <a class="scroll-top" href="#page-top"><i class="fa fa-angle-up"></i></a>
  </main>
  @extends('includes.alert')
  <script src="{{ asset('/js/app.js') }}"></script>
 </body>
</html>
