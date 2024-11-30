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
  </script>
  
  <style>
    /* Navbar */
    .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #FF5E5B; /* Rojo navideño */
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
    color: #84DCC6; /* Verde navideño al pasar el mouse */
  }

  /* Tabla */
  table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #9AE3D1; /* Borde en color suave */
  }

  th, td {
    padding: 8px;
    border: 1px solid #9AE3D1; /* Borde suave para celdas */
    text-align: left;
  }

  th {
    background-color: #9AE3D1; /* Fondo suave para los encabezados */
    color: white;
  }

  td {
    color: #333333; /* Texto de las celdas en color gris oscuro */
  }

  /* Fila alternada (impares) con color claro */
  tr:nth-child(even) {
    background-color: #F4F4F4; /* Fondo gris suave para filas pares */
  }

  /* Hover sobre las filas */
  tr:hover {
    background-color: #FFDD7F; /* Amarillo suave al pasar el mouse */
    color: #333333; /* Aseguramos que el texto sea oscuro al pasar el mouse */
  }

  /* Botones */
  button {
    padding: 5px 10px;
    margin: 5px;
    cursor: pointer;
    border: none;
    background-color: #84DCC6; /* Verde navideño */
    color: white;
    border-radius: 5px;
  }

  button:hover {
    background-color: #66B8A3; /* Verde más oscuro en hover */
  }
  </style>
  
  <div>
    <!-- Navbar -->
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
  