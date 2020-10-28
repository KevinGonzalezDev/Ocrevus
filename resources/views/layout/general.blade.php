<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OCREVUS</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body class="general-body">

    
    <div class="menu-container">
        <ul>
            <li><img src="img/ocrevus-logo.png" alt="Logo ocrevus" id="logo-ocrevus"></li>
            <li><img src="img/logo-roche.png" alt="Logo roche" id="logo-roche"></li>
        </ul>

        <ul id="menu-links">
            <li><a href= "{{route('paginaInicial')}}" @if (Request::url() == route('paginaInicial')) class="selected" @endif>Vive la NeuroExperiencia</a></li>
            <li><a href="{{route('Tiempos')}}" @if (Request::url() == route('Tiempos')) class="selected" @endif>Los mejores tiempos</a></li>
            <li><a href="#">Frenando la EM</a></li>
        </ul>
    </div>

@yield('content')

    <div class="footer-container">
        <h2>Conoce más</h2>

        <ul>
            <li><img src="img/ocrevus-logo.png" alt="Logo Ocrevus" id="logo-ocrevus"></li>
            <li><img src="img/logo-roche.png" alt="Logo Roche" id="logo-roche"></li>
            <li><img src="img/qr.png" alt="Qr image" id="qr-image"></li>
        </ul>
    </div>



</body>
</html>