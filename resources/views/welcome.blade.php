@extends('layout.empty')

<div class="main-container">



<div class="login-container">

    <img src="img/muñequito.png" alt="pj">

    <div class="login">
            <form action="#">
                <h2>Identifíquese</h2>
                <p>¡El tiempo es cerebro!</p>

                <label>*Obligatorio</label>
                <input type="text" name="correo" id="correo" placeholder="Email*">
                <input type="text" name="usuario" id="usuario" placeholder="Username*">
                <input type="text" name="ciudad" id="ciudad" placeholder="Ciudad (opcional)">

                <input type="submit" value="Iniciar sesión" id="iniciar-sesion">

                <div class="condiciones-container">
                    <input type="checkbox" name="condiciones" id="condicicones" onclick="redirect()">
                    <p>Acepto los &nbsp<a href="#">términos y condiciones</a></p> 
                </div>

            </form>
        </div>
</div> 

</div>

    <div class="bottom-logos-container">
        <img src="img/ocrevus-logo.png" alt="logo ocrevus" id="logo-ocrevus">
        <img src="img/logo-roche.png" alt="logo roche" id="logo-roche">
    </div>

<script>
    function redirect(){
        location.href = "paginaInicial";
    }
</script>