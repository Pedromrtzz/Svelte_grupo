import Stock from "./lib/Stock.svelte";
import Formulario from "./lib/Formulario.svelte";
import Inventario from "./lib/Inventario.svelte";
import Pedidos from "./lib/Pedidos.svelte";

// Define las rutas como un objeto clave-valor
const routes = {
    '/stock': Stock,       
    '/formulario': Formulario,
    '/inventario': Inventario,  
    '/pedidos': Pedidos,  
};

export default routes;