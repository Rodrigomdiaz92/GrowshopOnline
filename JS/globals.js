//Variables

let total = 0; // Se suma en esta variable todos los valores totales de las compras realizadas

let listaProductos; //lista de productos disponibles la cual se va a llenar con los datos obtenidos de productos.json
let localesDisponibles;

const detalleDeCompra = []; //Muestra el detalle de todos los productos comprados

const localDeRetiro = [];

let productos = document.getElementById("productos");
let locales = document.getElementById("locales");
let carritoCompra = document.getElementById("carrito");
let compraFinal = document.getElementById("compra-realizada");
let sumaTotal = document.getElementById("total");
let totalFinal = document.getElementById("total-final");
let notificacion = document.getElementById("notificacionCarrito");
const URLGET = "./productos.json";
const URLGETLOCALES = "./locales.json";
