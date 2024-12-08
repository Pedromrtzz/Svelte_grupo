<script>
    import { onMount } from 'svelte';
    import ExcelJS from 'exceljs';
    import { link } from 'svelte-spa-router';

    // Variables reactivas
    let pedidos = [];
    let contadores = {}; // Almacena los totales por producto

    async function obtenerPedidos() {
        try {
            const respuesta = await fetch('http://localhost:3000/api/pedidos/obtener');
            if (respuesta.ok) {
                const data = await respuesta.json();
                pedidos = data;

                // Calcular contadores
                actualizarContadores();
            } else {
                console.error('Error al obtener los pedidos, respuesta no válida');
            }
        } catch (error) {
            console.error('Error al conectar con el servidor', error);
        }
    }

    function actualizarContadores() {
        // Inicializar los contadores en 0
        contadores = {};
        pedidos.forEach(pedido => {
            contadores[pedido.producto] = (contadores[pedido.producto] || 0) + pedido.cantidad;
        });
    }

    async function exportarExcel() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Pedidos');

        worksheet.columns = [
            { header: 'Nombre', key: 'nombre', width: 20 },
            { header: 'Apellidos', key: 'apellidos', width: 20 },
            { header: 'Correo', key: 'correo', width: 30 },
            { header: 'Producto', key: 'producto', width: 20 },
            { header: 'Cantidad', key: 'cantidad', width: 10 },
        ];

        pedidos.forEach(pedido => worksheet.addRow(pedido));

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = 'pedidos.xlsx';
        enlace.click();
    }

    // Llamada inicial
    onMount(() => {
        obtenerPedidos();
    });

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
<link rel="stylesheet" href="css/pedidos.css">
<div class="navbar">
    <div class="navbar-contraido">
        <div class="icono-menu"  id="icono-menu">
            <i class="fa fa-bars"></i> 
        </div>
        <div class="icono-cerrar"  id="icono-cerrar" >
            <i class="fa fa-times"></i> 
        </div>
        <div class="titulo-barra">
            <p>Gestión de Inventario</p>
        </div>
        
    </div>
        
    
        <div class="navegacion" id="navegacion">
        <a href="/" use:link>Formulario Pedidos</a>
        <a href="/pedidos" use:link>Pedidos</a>
        <a href="/stock" use:link>Stock</a>
        <a href="/inventario" use:link>Inventario</a>
        
    </div>

</div>


<div class="contenedor-pedidos">
    <h1>Lista de Pedidos</h1>

    {#if pedidos.length > 0}
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Correo</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                {#each pedidos as pedido}
                    <tr>
                        <td>{pedido.nombre}</td>
                        <td>{pedido.apellidos}</td>
                        <td>{pedido.correo}</td>
                        <td>{pedido.producto}</td>
                        <td>{pedido.cantidad}</td>
                    </tr>
                {/each}
            </tbody>
        </table>

        <button class="btn-exportar" on:click={exportarExcel}>Exportar a Excel</button>
    {:else}
        <p>No hay pedidos disponibles</p>
    {/if}

    <h2>Totales por Producto</h2>
    <ul>
        {#each Object.keys(contadores) as producto}
            <li>{producto}: {contadores[producto]} unidades</li>
        {/each}
    </ul>
</div>
