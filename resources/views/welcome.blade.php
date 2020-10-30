@extends('layout.empty')

<div class="main-container">



<div class="login-container">

    <img src="img/munequito.png" alt="pj">

    <div class="login">
    <form action="{{route('login.front')}}" method="post">
        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <h2>Identifíquese</h2>
                <p>¡El tiempo es cerebro!</p>

                <label>*Obligatorio</label>
                <input class="{{ $errors->has('email') ? 'is-invalid' : '' }}" type="email" name="email" id="email" placeholder="Email*" required value="{{old('email')}}">
                {!! $errors->first('email', '<p class="form-error small_2">:message</p>') !!}
                
                <input type="text" name="name" id="name" placeholder="Username*">
                <input type="text" name="ciudad" id="ciudad" placeholder="Ciudad (opcional)">

                <input type="submit" value="Iniciar sesión" id="iniciar-sesion">

                <div class="condiciones-container">
                    <input type="checkbox" name="condiciones" id="condicicones" required>
                <p>Acepto los &nbsp<a href="{{route('popup')}}" id="condiciones">términos y condiciones</a></p> 
                </div>

            </form>
        </div>
</div> 

</div>

    <div class="bottom-logos-container">
        <img src="img/ocrevus-logo.png" alt="logo ocrevus" id="logo-ocrevus">
        <img src="img/logo-roche.png" alt="logo roche" id="logo-roche">
    </div>

    <script src="js/popup.js"></script>

<script>
    function redirect(){
        location.href = "game";
    }
</script>