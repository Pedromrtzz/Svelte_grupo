<script>
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import Formulario from './lib/Formulario.svelte';
  import Pedidos from './lib/Pedidos.svelte';
  import Stock from './lib/Stock.svelte';
  import Inventario from './lib/Inventario.svelte';

  //IMPORTACION PARA LAS RUTAS
  import Router from "svelte-spa-router";
  import routes from "./routes";
</script>

<main>
  <Router {routes} />

<!-- <Formulario /> -->
</main>

<style>

</style>
