<script>
    import { onMount } from 'svelte';

    // Variable reactiva para almacenar los pedidos
    let pedidos = [];

    async function obtenerPedidos() {
    try {
        const respuesta = await fetch('http://localhost:3000/api/pedidos');
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

    import { link } from "svelte-spa-router";
</script>

<style>
    .navbar {
        position: fixed;
        top: 0%;
        left: 0%;
        width: 100%;
        background-color: #E63946; 
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 1000;
    }

    .navbar .titulo-barra p {
        color: white;
        text-decoration: none;
        margin-left: 30%;
        border: 2px solid #E63946; 
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
        color: #FFBE0B;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid #9AE3D1; 
    }


    .contenedor-pedidos h1 {
        color: #E63946;
    }

    th {
        padding: 8px;
        border: 1px solid #9AE3D1; 
        text-align: left;
        background-color: #9AE3D1; 
        color: white;
    }

    td {
        padding: 8px;
        color: #333333; 
        text-align: left;
        border: 1px solid #9AE3D1; 
    }
    tr:nth-child(even) {
        background-color: #F4F4F4;
    }

tr:hover {
  background-color: #FFDD7F; 
  color: #333333;
}




    
</style>

<div class="navbar">

    <div class="titulo-barra">
        <p>Gestión de Inventario</p>
    </div>

    <div class="navegacion">
        <a href="/formulario" use:link>Formulario Pedidos</a>
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
    {:else}
        <p>No hay pedidos disponibles</p>
    {/if}
</div>
