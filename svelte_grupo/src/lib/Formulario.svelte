<script>

    //para el enrutado 
    import { link } from "svelte-spa-router";


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

<link rel="stylesheet" href="css/formulario.css">

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
        <a href="/formulario" use:link>Formulario Pedidos</a>
        <a href="/pedidos" use:link>Pedidos</a>
        <a href="/stock" use:link>Stock</a>
        <a href="/inventario" use:link>Inventario</a>
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