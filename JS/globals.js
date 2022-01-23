//Variables

let total = 0; // Se suma en esta variable todos los valores totales de las compras realizadas

let listaProductos; //lista de productos disponibles la cual se va a llenar con los datos obtenidos de productos.json

const detalleDeCompra = []; //Muestra el detalle de todos los productos comprados

let productos = document.getElementById("productos");
let carritoCompra = document.getElementById("carrito");
let sumaTotal = document.getElementById("total");
let notificacion = document.getElementById("notificacionCarrito");
const URLGET = "./productos.json";
