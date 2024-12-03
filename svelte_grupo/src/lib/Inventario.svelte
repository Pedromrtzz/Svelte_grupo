<script>
    import { onMount } from 'svelte';
    
    let productos = [];
  
    // Función para sumar stock
    const sumarStock = async (nombre_producto, cantidad) => {
      console.log("Producto a sumar:", nombre_producto, cantidad); // Para depuración
      if (!nombre_producto) {
        console.error('Nombre de producto no proporcionado');
        return;
      }
      const response = await fetch('http://localhost:3000/api/productos/sumar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_producto, cantidad }),
      });
      if (response.ok) {
        alert('Stock actualizado');
        await obtenerProductos(); // Actualiza los productos después de sumar
      } else {
        alert('Error al sumar stock');
      }
    };
    
    // Función para restar stock
    const restarStock = async (nombre_producto, cantidad) => {
      console.log("Producto a restar:", nombre_producto, cantidad); // Para depuración
      if (!nombre_producto) {
        console.error('Nombre de producto no proporcionado');
        return;
      }
      const response = await fetch('http://localhost:3000/api/productos/restar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_producto, cantidad }),
      });
      if (response.ok) {
        alert('Stock actualizado');
        await obtenerProductos(); // Actualiza los productos después de restar
      } else {
        alert('Error al restar stock');
      }
    };
    
    // Obtener productos al montar el componente
    onMount(() => {
      obtenerProductos();
    });
    
    // Función para obtener los productos desde el backend
    const obtenerProductos = async () => {
      const response = await fetch('http://localhost:3000/api/productos');
      if (response.ok) {
        productos = await response.json();
      } else {
        console.error('Error al obtener productos');
      }
    };


    //para el enrutado 
    import { link } from "svelte-spa-router";

  </script>
  


  <style>
    /* Navbar */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #FF5E5B;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1000;
      padding: 10px 20px;
    }

    .navbar .titulo-barra p {
      color: white;
      text-decoration: none;
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

    /* Tabla */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 70px; /*Para que no quede debajo de la navbar fija */
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

    button {
        background-color: #9AE3D1; 
        color: #FFFFFF; 
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s, transform 0.2s;
    }

    button:hover {
        background-color: #E63946; 
        transform: scale(1.05); 
    }
  </style> 

  
  <div>
    <!-- Navbar -->
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
  
    <!-- Tabla de Productos -->
    <table>
      <thead>
        <tr>
          <th>Producto</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {#each productos as producto}
          <tr>
            <td>{producto.nombre_producto}</td>
            <td>{producto.descripcion}</td>
            <td>{producto.precio}</td>
            <td>{producto.cantidad_stock}</td>
            <td>
              <button on:click={() => sumarStock(producto.nombre_producto, 1)}>Sumar</button>
              <button on:click={() => restarStock(producto.nombre_producto, 1)}>Restar</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  