@extends('layout.general')


@section('contentInicial')

    
        <img src="img/munequito.png" alt="Icon" id="logo-icono">
        
        <div class="game-container">
        <!-- GAME CONTENT --------------------------------------------- -->

        <!--<img src="img/game.png" alt="Game mockup">-->

        @extends('layout.game')
      
        <article class="section-game-edited">
        
        <div class="col-12 col-md-9 col-lg-6 container-canvas" id="base">
            <aside class="container-score col-md-1 col-lg-3"></aside>

            <section class="container-score col-md-2 col-lg-3">
                <p class="m-0">Tu Puntaje</span></p>
                <p class="my-2 text-score">{{ Auth::user()->score }}</p>
            </section>
        </div>
        
        </article>
        <article class="col-12 section-girar">
        <img class="img-fluid w-50" src="{{ asset('/img/elements/gira.png') }}">
        </article>

        <!-- GAME CONTENT --------------------------------------------- -->

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