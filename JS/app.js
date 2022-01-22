$(document).ready(getProductosjson());
//carritoPendiente(); Queda pendiente de realizar
productos.addEventListener("click", sumarAlCarrito);
filtrado.addEventListener("click", sumarAlCarrito);
sumaTotal.addEventListener("click", eliminarCarrito);
$("#boton1").click(mostrarCarrito);
$("#eliminarfiltros").click(eliminarFiltro);
$("#ocb").click(filtroOCB);
$("#rolling").click(filtroRolling);
$("#papelillos").click(filtroPapelillos);
$("#filtros").click(filtroFiltros);
$("#pipas").click(filtroPipas);
//Falta implementar estos filtros
/*$('#menorPrecio').click(crearProductos(listaProductos, productos))
$('').click(filtroMayor) */
