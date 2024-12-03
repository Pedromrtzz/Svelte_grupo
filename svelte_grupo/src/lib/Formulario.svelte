<script>
    // Se definen variables vacías que van a almacenar los valores de los campos del formulario
    let nombre = '';
    let apellido = '';
    let correo = '';
    let producto = 'Pantalon Slim Fit'; // Valor inicial del select (por defecto será 'pantalon')

    // Función asincrónica que se ejecuta al enviar el formulario
    async function enviarPedido() {
    // Captura los elementos del formulario mediante sus identificadores
    const nombreElement = document.getElementById('nombre');
    const apellidoElement = document.getElementById('apellido');
    const correoElement = document.getElementById('correo');
    const productoElement = document.getElementById('productos');
    const cantidadElement = document.getElementById('cantidad'); // Captura del campo cantidad

    // Verifica que los elementos sean del tipo esperado
    const nombre = nombreElement instanceof HTMLInputElement ? nombreElement.value : '';
    const apellido = apellidoElement instanceof HTMLInputElement ? apellidoElement.value : '';
    const correo = correoElement instanceof HTMLInputElement ? correoElement.value : '';
    const producto = productoElement instanceof HTMLSelectElement ? productoElement.value : 'Pantalon Slim Fit';
    const cantidad = cantidadElement instanceof HTMLInputElement ? parseInt(cantidadElement.value, 10) : 1; // Convertir a entero

    // Se crea un objeto con los datos obtenidos del formulario
    const pedido = { 
        nombre, 
        apellidos: apellido, 
        correo, 
        producto, 
        cantidad // Agrega la cantidad al objeto
    };

    try {
        // Se hace una petición POST a la API
        const respuesta = await fetch('http://localhost:3000/api/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido),
        });

        // Si la respuesta del servidor es satisfactoria
        if (respuesta.ok) {
            alert('Pedido realizado con éxito');
            // Reinicia los campos del formulario
            if (nombreElement instanceof HTMLInputElement) nombreElement.value = '';
            if (apellidoElement instanceof HTMLInputElement) apellidoElement.value = '';
            if (correoElement instanceof HTMLInputElement) correoElement.value = '';
            if (productoElement instanceof HTMLSelectElement) productoElement.value = 'Pantalon Slim Fit';
            if (cantidadElement instanceof HTMLInputElement) cantidadElement.value = '1';
        } else {
            alert('Error al realizar el pedido');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Obtener los elementos por su id
    const iconoMenu = document.getElementById('icono-menu');
    const iconoCerrar = document.getElementById('icono-cerrar');
    const navegacion = document.getElementById('navegacion');

//para el enrutado 
import { link } from "svelte-spa-router";

    // Función para abrir el menú
    iconoMenu.addEventListener('click', () => {
        navegacion.style.display = 'flex';  // Mostrar la barra de navegación
        iconoMenu.style.display = 'none';   // Ocultar el icono de abrir
        iconoCerrar.style.display = 'block'; // Mostrar el icono de cerrar
    });

    // Función para cerrar el menú
    iconoCerrar.addEventListener('click', () => {
        navegacion.style.display = 'none';  // Ocultar la barra de navegación
        iconoMenu.style.display = 'block';  // Mostrar el icono de abrir
        iconoCerrar.style.display = 'none'; // Ocultar el icono de cerrar
    });
});


</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

<style>



    .navbar {
        position: fixed;
        top: 0%;
        left: 0%;
        width: 100%;
        background-color: #FF5E5B;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 1000;
    }

    .navbar .titulo-barra p {
        color: white;
        text-decoration: none;
        margin-left: 30%;
        border: 2px solid #FF5E5B;
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
        color: #84DCC6;
    }

    .icono-menu{
        display: none;
    }
    .icono-cerrar{
        display: none;
    }

    @media (max-width: 768px) {
    .navbar-contraido {
        display: flex; /* Asegura que los elementos estén en fila */
        flex-direction: row; /* Fila */
        align-items: center; /* Alinea los elementos verticalmente en el centro */
        justify-content: space-between; /* Asegura que el icono y el título estén separados */
        width: 100%; /* Asegura que el contenedor ocupe todo el ancho */
        padding: 10px; /* Espaciado alrededor */
    }

    .navbar {
        display: flex; /* Cambiar la dirección a columna para apilar los elementos */
        flex-direction: column; /* Los elementos dentro de .navbar estarán en columna */
        align-items: center; /* Centra los elementos horizontalmente */
        justify-content: flex-start; /* Asegura que los elementos estén alineados desde arriba */
        width: 100%; /* Asegura que el menú ocupe todo el ancho */
        padding: 10px;
    }

    .navbar .titulo-barra {
        width: auto; /* El ancho del título se ajusta al contenido */
        text-align: center; /* Centra el texto */
        margin: 0;
    }

    .navbar .titulo-barra p {
        margin: 0;
        border: none;
        font-size: large;
    }

    .navbar .navegacion {
        display: none; /* Ocultar el menú inicialmente */
        flex-direction: column; /* Los enlaces estarán en columna */
        width: 100%;
        text-align: center;
        background-color: #FF5E5B;
        padding: 10px 0;
    }

    .navbar .navegacion a {
        display: block;
        margin: 10px 0;
        color: white;
    }

    .icono-menu {
        display: block !important;
        font-size: 24px;
        width: 20px;
        height: 20px;
        color: white;
        cursor: pointer;
        z-index: 100;
    }

    .icono-cerrar {
        display: none; /* El icono de cerrar está inicialmente oculto */
        font-size: 24px;
        color: white;
        cursor: pointer;
        margin-left: auto; /* Para mover el icono al extremo derecho */
        margin-right: 40px; /* Asegura que esté a unos 20px del borde */
    }

    /* Mostrar la navegación cuando se le añade la clase 'visible' */
    .navegacion.visible {
        display: flex;
    }
}




    .contenedor-formulario .titulo-formulario h1 {
        margin-top: 10% ;
        text-align: center;
    }

    .contenedor-formulario {
        max-width: 600px;
        margin: 100px auto -1; /* Añade un margen superior para evitar que el contenido se superponga con la barra */
        padding: 20px;
        background-color: #F4F4F4; 
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    h1 {
        color: #FF5E5B;
        text-align: center;
        margin-bottom: 20px;
    }

    .formulario {
        margin-bottom: 15px;
    }

    .formulario label {
        display: block;
        margin-bottom: 5px;
        margin-top: 2.5%;
        font-weight: bold;
        color: #166534; 
    
    }

    .formulario input, .formulario select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .formulario input:focus, .formulario select:focus {
        outline: none;
        border-color: #84DCC6; 
        box-shadow: 0 0 5px #84DCC6;
    }

    button {
        background-color: #84DCC6;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: bold;
        margin-top: 2.5%;
    }

    button:hover {
      background-color: #66B8A3; 
    }

</style>

<div class="navbar">
<div class="navbar-contraido">
    <div class="icono-menu"  id="icono-menu">
        <i class="fa fa-bars"></i> 
    </div>
    <div class="titulo-barra">
        <p>Gestión de Inventario</p>
    </div>
    
</div>
    <div class="icono-cerrar"  id="icono-cerrar" >
        <i class="fa fa-times"></i> 
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
        <form onsubmit={enviarPedido}>
            <!-- Nombre -->
            <label for="name">Nombre</label>
            <input type="text" id="nombre" placeholder="Ingresa tu nombre" required>
    
            <!-- Apellidos -->
            <label for="subname">Apellidos</label>
            <input type="text" id="apellido" placeholder="Ingresa tus apellidos" required>
    
            <!-- Correo -->
            <label for="email">Correo</label>
            <input type="email" id="correo" placeholder="Ingresa tu correo" required>
    
            <!-- Productos -->
            <label for="productos">Productos</label>
            <select name="productos" id="productos" required>
                <option value="Pantalon Slim Fit">Pantalon Slim Fit</option>
                <option value="Camiseta Basica">Camiseta Basica</option>
                <option value="Sudadera con Capucha">Sudadera con Capucha</option>
                <option value="Pantalón Jogger">Pantalón Jogger</option>
                <option value="Camiseta Gráfica">Camiseta Gráfica</option>
                <option value="Sudadera Oversize">Sudadera Oversize</option>
                <option value="Zapatillas Running">Zapatillas Running</option>
                <option value="Reloj Digital">Reloj Digital</option>
                <option value="Mochila de Senderismo">Mochila de Senderismo</option>
                <option value="Chaqueta Impermeable">Chaqueta Impermeable</option>
                <option value="Auriculares Inalámbricos">Auriculares Inalámbricos</option>
                <option value="Gafas de Sol UV400<">Gafas de Sol UV400</option>
            </select>
    
            <!-- Cantidad -->
            <label for="cantidad">Cantidad</label>
            <input type="number" id="cantidad" min="1" value="1" placeholder="Ingresa la cantidad" required>
    
            <!-- Botón de envío -->
            <button type="submit">Realizar Pedido</button>
        </form>
    </div>
    


</div>