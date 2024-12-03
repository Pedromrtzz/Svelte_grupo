<script>
    import { onMount } from 'svelte';
    import ExcelJS from 'exceljs';
  
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

    //para el enrutado
    import { link } from "svelte-spa-router";
        // Función para exportar productos a Excel
        async function exportarExcel() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Productos');

        // Definir columnas
        worksheet.columns = [
            { header: 'Producto', key: 'nombre_producto', width: 20 },
            { header: 'Descripción', key: 'descripcion', width: 30 },
            { header: 'Precio', key: 'precio', width: 15 },
            { header: 'Stock', key: 'cantidad_stock', width: 10 },
        ];

        // Agregar filas con datos
        productos.forEach(producto => worksheet.addRow(producto));

        // Generar archivo Excel
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = 'productos.xlsx';
        enlace.click();
    }
  </script>
  
  
  <link rel="stylesheet" href="css/stock.css">
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
  <button class="btn-exportar" on:click={exportarExcel}>Exportar a Excel</button>
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
  
