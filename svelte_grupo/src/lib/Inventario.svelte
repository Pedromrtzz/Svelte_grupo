<script>
    import { onMount } from 'svelte';
    import ExcelJS from 'exceljs';
    
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

    // Función para exportar productos a Excel
    async function exportarExcel() {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Productos');

        // Definir las columnas
        worksheet.columns = [
            { header: 'Producto', key: 'nombre_producto', width: 20 },
            { header: 'Descripción', key: 'descripcion', width: 30 },
            { header: 'Precio', key: 'precio', width: 15 },
            { header: 'Stock', key: 'cantidad_stock', width: 10 },
        ];

        // Agregar filas con los datos
        productos.forEach(producto => worksheet.addRow(producto));

        // Generar el archivo Excel
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const enlace = document.createElement('a');
        enlace.href = URL.createObjectURL(blob);
        enlace.download = 'productos.xlsx';
        enlace.click();
    }
  </script>

 

  <link rel="stylesheet" href="css/inventario.css">
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
    <button  class="btn-exportar" on:click={exportarExcel}>Exportar a Excel</button>
  </div>
  