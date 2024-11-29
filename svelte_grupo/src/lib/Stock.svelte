<script>
    import { onMount } from 'svelte';
  
    let productos = [];
    let detallesProducto = null;
    let mostrarVentanaEmergente = false;
  
    // Fetch de productos al montar el componente
    onMount(async () => {
      try {
        const res = await fetch('http://localhost:3000/api/productos');
        if (!res.ok) throw new Error(`Error al obtener productos: ${res.status}`);
        productos = await res.json();
        console.log('Productos cargados:', productos);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    });
  
    const abrirVentanaEmergente = (producto) => {
      console.log('Producto seleccionado', producto);
      detallesProducto = producto;
      mostrarVentanaEmergente = true;
      document.body.style.overflow = 'hidden'; // Deshabilita el desplazamiento del body
    };
  
    const cerrarVentanaEmergente = () => {
      mostrarVentanaEmergente = false;
      document.body.style.overflow = 'auto'; // Restaura el desplazamiento del body
    };
  
    // Cierra la ventana si el usuario hace clic fuera de ella
    const manejarClickFondo = (event) => {
      if (event.target === event.currentTarget) {
        cerrarVentanaEmergente();
      }
    };
  </script>
  
  <style>
    /* Estilo de la barra de navegación */
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
      margin-left: 30%;
      font-size: large;
      width: 100%;
    }
  
    .navbar .navegacion a {
      text-decoration: none;
      color: white;
      margin: 0 20px;
    }
  
    .navbar .navegacion a:hover {
      text-decoration: underline;
    }
  
    /* Estilo de tarjetas */
    .contenedor-tarjetas {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
      margin-top: 5%;
    }
  
    .tarjeta {
      width: 300px;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      background-color: white;
      transition: transform 0.3s, box-shadow 0.3s;
    }
  
    .tarjeta:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  
    .tarjeta img {
      width: 100%;
      object-fit: cover;
    }
  
    .tarjeta h3 {
      color: #8e44ad;
      font-size: 1.5rem;
      margin: 10px 0;
    }
  
    .tarjeta p {
      color: #555;
      font-size: 1rem;
      margin: 10px 15px;
    }
  
    .tarjeta button {
      background-color: #b19cd9;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      margin-bottom: 15px;
      font-weight: bold;
      transition: background-color 0.3s;
    }
  
    .tarjeta button:hover {
      background-color: #8e44ad;
    }
  
    /* Estilo de la ventana emergente */
    .ventanaEmergente {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      z-index: 3000;
    }
  
    .ventanaEmergente-contenido {
      display: flex;
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      width: 80%;
      max-width: 600px;
      max-height: 80%;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      color: #000;
      overflow-y: auto;
    }
  
    .ventanaEmergente-imagen {
      width: 40%;
      margin-right: 20px;
    }
  
    .ventanaEmergente-imagen img {
      width: 100%;
      height: auto;
      object-fit: cover;
      border-radius: 8px;
    }
  
    .ventanaEmergente-texto {
      width: 60%;
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
  
  <div class="contenedor-tarjetas">
    {#each productos as producto}
      <div class="tarjeta">
        <img 
            src={`/src/img/${producto.nombre_producto}.jpg`} 
            alt={producto.nombre_producto} 
        />
        <h3>{producto.nombre_producto}</h3>
        <p>{producto.descripcion}</p>
        <button on:click={() => abrirVentanaEmergente(producto)}>
          Ver más
        </button>
      </div>
    {/each}
  </div>
  
  <!-- Ventana Emergente -->
  {#if mostrarVentanaEmergente && detallesProducto}
    <div class="ventanaEmergente" on:click={manejarClickFondo}>
      <div class="ventanaEmergente-contenido" on:click|stopPropagation>
        <div class="ventanaEmergente-imagen">
          <img src={`/src/img/${detallesProducto.nombre_producto}.jpg`} alt={detallesProducto.nombre_producto} />
        </div>
        <div class="ventanaEmergente-texto">
          <h2>Detalles del Producto</h2>
          <p><strong>Precio:</strong> ${detallesProducto.precio}</p>
          <p><strong>Cantidad en stock:</strong> {detallesProducto.cantidad_stock}</p>
          <p><strong>Descripción:</strong> {detallesProducto.descripcion}</p>
        </div>
      </div>
    </div>
  {/if}
  
