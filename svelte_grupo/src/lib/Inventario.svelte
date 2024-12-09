<script>
  import { onMount } from 'svelte';
  import ExcelJS from 'exceljs';
  import { link } from 'svelte-spa-router';


  let productos = [];
  let productoEditando = null; 
  let editForm = { descripcion: '', precio: '', cantidad_stock: '' };

  const sumarStock = async (nombre_producto, cantidad) => {
    const response = await fetch('http://localhost:3000/api/productos/sumar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre_producto, cantidad }),
    });
    if (response.ok) {
      alert('Stock actualizado');
      await obtenerProductos();
    } else {
      alert('Error al sumar stock');
    }
  };

  const restarStock = async (nombre_producto, cantidad) => {
    const response = await fetch('http://localhost:3000/api/productos/restar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre_producto, cantidad }),
    });
    if (response.ok) {
      alert('Stock actualizado');
      await obtenerProductos();
    } else {
      alert('Error al restar stock');
    }
  };

  const actualizarProducto = async () => {
  console.log('Datos a actualizar:', editForm);

  const response = await fetch('http://localhost:3000/api/productos/actualizar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...editForm, nombre_producto: productoEditando }),
  });

  if (response.ok) {
    alert('Producto actualizado');
    productoEditando = null;
    await obtenerProductos();
  } else {
    const error = await response.text();
    console.error('Error del servidor:', error);
    alert('Error al actualizar el producto');
  }
};


  const obtenerProductos = async () => {
    const response = await fetch('http://localhost:3000/api/productos');
    if (response.ok) {
      productos = await response.json();
    } else {
      console.error('Error al obtener productos');
    }
  };

  const iniciarEdicion = (producto) => {
    productoEditando = producto.nombre_producto;
    editForm = {
      descripcion: producto.descripcion,
      precio: producto.precio,
      cantidad_stock: producto.cantidad_stock,
    };
  };

  onMount(() => {
    obtenerProductos();
  });

  async function exportarExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Productos');

    worksheet.columns = [
      { header: 'Producto', key: 'nombre_producto', width: 20 },
      { header: 'Descripción', key: 'descripcion', width: 30 },
      { header: 'Precio', key: 'precio', width: 15 },
      { header: 'Stock', key: 'cantidad_stock', width: 10 },
    ];

    productos.forEach((producto) => worksheet.addRow(producto));

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = 'productos.xlsx';
    enlace.click();
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Obtener los elementos por su id
    const iconoMenu = document.getElementById('icono-menu');
    const iconoCerrar = document.getElementById('icono-cerrar');
    const navegacion = document.getElementById('navegacion');



    // Función para abrir el menú
    iconoMenu.addEventListener('click', () => {
        navegacion.style.display = 'flex'; 
        iconoMenu.style.display = 'none';   
        iconoCerrar.style.display = 'block'; 
    });

    // Función para cerrar el menú
    iconoCerrar.addEventListener('click', () => {
        navegacion.style.display = 'none';  
        iconoMenu.style.display = 'block';  
        iconoCerrar.style.display = 'none'; 
    });


});


</script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<link rel="stylesheet" href="css/inventario.css">
<div>
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
          {#if productoEditando === producto.nombre_producto}
            <td>{producto.nombre_producto}</td>
            <td><input bind:value={editForm.descripcion} /></td>
            <td><input type="number" bind:value={editForm.precio} /></td>
            <td><input type="number" bind:value={editForm.cantidad_stock} /></td>
            <td>
              <button on:click={actualizarProducto}>Guardar</button>
              <button on:click={() => (productoEditando = null)}>Cancelar</button>
            </td>
          {:else}
            <td>{producto.nombre_producto}</td>
            <td>{producto.descripcion}</td>
            <td>{producto.precio}</td>
            <td>{producto.cantidad_stock}</td>
            <td>
              <button on:click={() => sumarStock(producto.nombre_producto, 1)}>Sumar</button>
              <button on:click={() => restarStock(producto.nombre_producto, 1)}>Restar</button>
              <button on:click={() => iniciarEdicion(producto)}>Editar</button>
            </td>
          {/if}
        </tr>
      {/each}
    </tbody>
  </table>
  <button class="btn-exportar" on:click={exportarExcel}>Exportar a Excel</button>
</div>
