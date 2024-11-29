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
</script>

<style>
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

    table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid rgb(85, 84, 85);
    }

    .contenedor-pedidos h1 {
        color: #9b59b6;
    }

    th {
        padding: 8px;
        border: 1px solid rgb(85, 84, 85);
        text-align: left;
    }

    td {
        padding: 8px;
        color: rgb(210, 156, 231);
        text-align: left;
        border: 1px solid rgb(85, 84, 85);
    }

    th {
        background-color: rgb(210, 156, 231);
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
