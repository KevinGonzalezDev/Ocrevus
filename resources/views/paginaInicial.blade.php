@extends('layout.general')


@section('content')

    <div class="game-container">
        <img src="img/muñequito.png" alt="Icon">
        <img src="img/game.png" alt="Game mockup">
    </div>


    <div class="slideshow-banner">
        <ul>
            <li><img src="img/slider/1.png" alt="slider image 1"></li>
            <li><img src="img/slider/2.png" alt="slider image 2"></li>
            <li><img src="img/slider/3.png" alt="slider image 3"></li>
            <li><img src="img/slider/4.png" alt="slider image 4"></li>
        </ul>
    </div>


    <div class="video-container">
        <iframe  src="https://www.youtube.com/embed/Kx9atnp0BBA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <h2>¿Cuándo comienza<br>la progresión en la EM?</h2>
    </div>

@endsection