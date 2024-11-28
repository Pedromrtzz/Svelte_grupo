<script>

</script>

<style>

    body {
        margin: 0; /* Elimina los márgenes para que la barra ocupe todo el ancho */
        font-family: Arial, sans-serif;
    }

    .navbar {
        position: fixed;
        top: 0%;
        left: 0%;
        width: 100%;
        background-color: rgb(210, 156, 231);
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 1000;
    }

    .navbar .titulo-barra p {
        color: white;
        text-decoration: none;
        margin-left: 30%;
        border: 2px solid rgb(210, 156, 231);
        width: 98%;
        font-size: large;
    }

    .navbar .navegacion a {
        text-decoration: none;
        color: white;
        margin: 0 20px;
    }

    .navbar .navegacion a:hover {
        text-decoration: underline;
    }

    .contenedor-formulario .titulo-formulario h1 {
        margin-top: 10% ;
        text-align: center;
    }

    .contenedor-formulario {
        max-width: 600px;
        margin: 100px auto 0; /* Añade un margen superior para evitar que el contenido se superponga con la barra */
        padding: 20px;
    }

    h1 {
        color: #9b59b6; /* Lila más fuerte */
        text-align: center;
    }

    .formulario {
        margin-bottom: 15px;
    }

    .formulario label {
        display: block;
        margin-bottom: 5px;
        margin-top: 2.5%;
        font-weight: bold;
        color: #8e44ad; /* Lila más oscuro */
    }

    .formulario input{
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .formulario select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    button {
        background-color: #b19cd9; /* Lila claro */
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        margin-top: 2.5%;
    }

    button:hover {
      background-color: #9b59b6; /* Lila más fuerte */
    }

</style>

<div class="navbar">

    <div class="titulo-barra">
        <p>Gestión de Inventario</p>
    </div>

    <div class="navegacion">
        <a href="#">Formulario Pedidos</a>
        <a href="#">Pedidos</a>
        <a href="#">Stock</a>
        <a href="#">Inventario</a>
    </div>

</div>

<div class="contenedor-formulario">

    <div class="titulo-formulario">
        <h1>Formulario Pedidos</h1>
    </div>

    <div class="formulario">
         
        <!--Nombre-->
        <label for="name">Nombre</label>
        <input type="text" id="nombre" placeholder="Ingresa tu nombre">

        <!--Apellidos-->
        <label for="subname">Apellidos</label>
        <input type="text" id="apellido" placeholder="Ingresa tus apellidos">

        <!--Apellidos-->
        <label for="email">Correo</label>
        <input type="email" id="correo" placeholder="Ingresa tu correo">

        <!--Apellidos-->
        <label for="productos">Productos</label>
        <select name="productos" id="productos">
            <option value="pantalon">Pantalon</option>
            <option value="camiseta">Camiseta</option>
            <option value="sudadera">Sudadera</option>
        </select>

        <!-- Botón de envío -->
        <button type="submit">Realizar Pedido</button>
    </div>


</div>