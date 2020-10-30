<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/responsive.css">

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
<body class="general-body">





      @extends('includes.alert')


  <script src="{{ asset('/juego/src/common.js') }}"></script>
  <script src="{{ asset('/juego/src/boot.js') }}"></script>

  <script src="{{ asset('/juego/src/init.js') }}"></script>
  <script src="{{ asset('/js/app.js') }}"></script>
</body>
</html>