@extends('layout.general')

<div class="main-container">

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
                    <input type="checkbox" name="condiciones" id="condicicones">
                    <p>Acepto los &nbsp<a href="#">términos y condiciones</a></p> 
                </div>

            </form>
        </div>

</div>