<script>

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


