<script>
    import { onMount } from 'svelte';
    import ExcelJS from 'exceljs';

    // Variable reactiva para almacenar los pedidos
    let pedidos = [];

    async function obtenerPedidos() {
    try {
        const respuesta = await fetch('http://localhost:3000/api/pedidos/obtener');
        console.log('Respuesta:', respuesta);  // Agrega esto para revisar la respuesta
        if (respuesta.ok) {
            const data = await respuesta.json();
            console.log('Pedidos:', data);  // Muestra los datos obtenidos
            pedidos = data;  // Guardar los pedidos en la variable reactiva
        } else {
            console.error('Error al obtener los pedidos, respuesta no válida');
        }
    } catch (error) {
        console.error('Error al conectar con el servidor', error);
    }
}
    // Usamos onMount para llamar a la función cuando el componente se monta
    onMount(() => {
        obtenerPedidos(); // Llamada a la API para obtener los pedidos
    });

    //para el enrutado
    import { link } from "svelte-spa-router";

    async function exportarExcel() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Pedidos');

        // Definir las columnas
        worksheet.columns = [
            { header: 'Nombre', key: 'nombre', width: 20 },
            { header: 'Apellidos', key: 'apellidos', width: 20 },
            { header: 'Correo', key: 'correo', width: 30 },
            { header: 'Producto', key: 'producto', width: 20 },
            { header: 'Cantidad', key: 'cantidad', width: 10 },
        ];

        // Agregar filas con los datos
        pedidos.forEach(pedido => worksheet.addRow(pedido));

        // Generar el archivo Excel
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = 'pedidos.xlsx';
        enlace.click();
    }
</script>


<link rel="stylesheet" href="css/pedidos.css">
<div class="navbar">

    <div class="titulo-barra">
        <p>Gestión de Inventario</p>
    </div>

    <div class="navegacion">
        <a href="/" use:link>Formulario Pedidos</a>
        <a href="/pedidos" use:link>Pedidos</a>
        <a href="/stock" use:link>Stock</a>
        <a href="/inventario" use:link>Inventario</a>
        
    </div>

</div>


<div class="contenedor-pedidos">
    <h1>Lista de Pedidos</h1>
    
    <!-- Mostrar la tabla solo si hay pedidos -->
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

        <button  class="btn-exportar" on:click={exportarExcel}>Exportar a Excel</button>
    {:else}
        <p>No hay pedidos disponibles</p>
    {/if}
</div>
