//obtiene los productos desde json para mostrarlos en pantalla

function getProductosjson() {
  $.get(URLGET, function (respuesta, estado) {
    if (estado === "success") {
      listaProductos = respuesta;
      crearProductos(listaProductos, productos);
      carritoPendiente();
    }
  });
}

//obtiene desde json los locales disponibles para retirar la compra realizada

function GETlocales(e) {
  if (e.target.classList.contains("btn-comprar")) {
    $("#locales").empty();
    $("#filtrado").hide();
    $("#productos").hide();
    $("#locales").show();
    $("#filtrado").empty();
    mostrarCarrito();
  }
  $.get(URLGETLOCALES, function (respuesta, estado) {
    if (estado === "success") {
      localesDisponibles = respuesta;
      $("#locales").append(
        `<div class="container"><h1 class="text-center mt-3">Selecciona por donde retirar tus productos</h1></div>`
      );
      crearLocales(localesDisponibles, locales);
    }
  });
}

//muestra en pantalla los locales disponibles para pickup

function crearLocales(localesDisponibles, ubicacion) {
  for (const local of localesDisponibles) {
    $(ubicacion).append(`<div class="col d-flex justify-content-around">
                          <div class="card mb-3" style="max-width: 540px;">
                          <div class="row g-0">
                          <div class="col-md-4">
                          <img src="./img/locales/${local.imagen}.png" class="img-fluid rounded-start" alt="${local.nombre}">
                          </div>
                          <div class="col-md-8">
                          <div class="card-body">
                          <h5 class="card-title text-dark">${local.nombre}</h5>
                          <p class="card-text text-dark">${local.direccion}, ${local.localidad}</p>
                          <p class="card-text text-dark"><small class="text-muted">Horarios: ${local.horario}</small></p>
                          <button id="${local.id}" type="button" class=" btn-local btn btn-success">Encargar</button>
                          </div>
                          </div>
                          </div>
                          </div>
                        </div>`);
  }
}

// muestra en pantalla todos los productos disponibles

function crearProductos(productosExhibidos, ubicacion) {
  for (const producto of productosExhibidos) {
    $(ubicacion).append(`<div class="col d-flex justify-content-around">
                          <div class="card mt- 3 mb-3 " style="width: 18rem;">
                          <div class="card-body">
                          <img src="./img/${producto.categoria}/${producto.imagen}.png" class="img-fluid" alt="">
                          <h5 class="card-title text-dark"> ${producto.categoria} ${producto.nombre} </h5>
                          <h6 class="card-subtitle mb-2 text-muted">Articulo n°: ${producto.id}</h6>
                          <p class="card-text text-dark">Precio $ ${producto.precio} Stock: ${producto.stock} unidades</p>
                          <button id="${producto.id}" type="button" class=" btn-producto btn btn-success">Agregar al carrito</button>
                          </div>
                          </div>
                          </div> `);
  }
}

//evento click que obtiene datos del local seleccionado

function elegirLocal(e) {
  if (e.target.classList.contains("btn-local")) {
    const localElegido = localesDisponibles.find(
      (local) => local.id == e.target.id
    );
    localDeRetiro.push(localElegido);
    $("#locales").empty();
    $("#locales").hide();
    $("#final").show();
    $("#contenedorFiltros").hide();
    puntoDeRetiro();
  }
}

// agrega al resumen final el punto de venta seleccionado

function puntoDeRetiro() {
  for (const local of localDeRetiro) {
    $("#puntoDeEntrega").append(
      `<div><h1 class="text-center mt-3">¡Gracias por tu compra!</h1></div><div><h3 class="mt-3">Retira por:</h3></div><div><p>${local.nombre}</p></div><div>${local.direccion}, ${local.localidad}</div><div>Horario de atencion: ${local.horario}</div>
      <p><button id="toggle-btn" type="button" class="btn-reiniciar-compra btn btn-success">Seguir comprando</button></p>`
    );
  }
}

//una vez finalizada la compra , vuelve al inicio y reinicia el carrito y resumen final

function reiniciarCompra(e) {
  if (e.target.classList.contains("btn-reiniciar-compra")) {
    $("#productos").show();
    $("#contenedorFiltros").show();
    $("#final").hide();
    $("#puntoDeEntrega").empty();
    detalleDeCompra.length = 0;
    localDeRetiro.length = 0;
    total = 0;
    agregarAlCarrito();
    localStorage.clear();
  }
}

// es un evento click que obtiene la informacion del producto para sumarlo al carrito

function sumarAlCarrito(e) {
  if (e.target.classList.contains("btn-producto")) {
    const productoElegido = listaProductos.find(
      (producto) => producto.id == e.target.id
    );
    restarStock(productoElegido);
    calculoCompra(productoElegido);
    detalleDeCompra.push(productoElegido);
    agregarAlCarrito();
  }
}

//resta el Stock al producto seleccionado
function restarStock(producto) {
  if (producto.stock > 1) {
    producto.stock -= 1;
  } else {
    alert("No hay mas stock");
  }
}

//obtiene el precio del producto seleccionado y lo suma al total
function calculoCompra(producto) {
  total += producto.precio;
}

//fin

//Agrega los productos al carrito y resumen final , ademas hace el calculo para no repetir productos en el carrito

function agregarAlCarrito() {
  carritoCompra.innerHTML = "";
  compraFinal.innerHTML = "";
  notificacionCarrito();
  calculoTotal(total);
  console.log(detalleDeCompra);
  const carritoSinduplicados = [...new Set(detalleDeCompra)];
  console.log(carritoSinduplicados);
  for (const producto of carritoSinduplicados) {
    const numeroUnidadesItem = detalleDeCompra.reduce((Total, itemId) => {
      return itemId === producto ? (Total += 1) : Total;
    }, 0);
    compraFinal.innerHTML += `<li class="list-group-item">${numeroUnidadesItem} x <img src="./img/${producto.categoria}/${producto.imagen}sm.png" class="img-fluid" alt="">${producto.categoria} ${producto.nombre} $${producto.precio}</li>`;
    carritoCompra.innerHTML += `<li class="list-group-item">${numeroUnidadesItem} x <img src="./img/${producto.categoria}/${producto.imagen}sm.png" class="img-fluid" alt="">${producto.categoria} ${producto.nombre} $${producto.precio}</li>`;
  }
  localStorage.setItem("Carrito Guardado", JSON.stringify(detalleDeCompra));
  localStorage.setItem("Total a Pagar", JSON.stringify(total));
}

//suma los montos de la compra que se esta haciendo al carrito y al resumen final que esta oculto
function calculoTotal(monto) {
  sumaTotal.innerHTML = ` <h3>Total a pagar $${monto} </h3> <button type="button" class="btn btn-warning">Vaciar Carrito</button> <button type="button" class=" btn-comprar btn btn-success">Comprar</button>`;
  totalFinal.innerHTML = `<h3 class="text-light bg-dark">Debes abonar $${monto} en el Local </h3>`;
}

//muestra una notificacion de la cantidad de productos que hay en el carrito

function notificacionCarrito() {
  notificacion.innerHTML = "";
  if (detalleDeCompra.length > 0) {
    let cantidadDeProductos = detalleDeCompra.length;
    notificacion.innerHTML = `${cantidadDeProductos}`;
  }
}

//elimina todos los productos del carrito
function eliminarCarrito(e) {
  if (e.target.classList.contains("btn-warning")) {
    detalleDeCompra.length = 0;
    total = 0;
    agregarAlCarrito();
    localStorage.clear();
    $("#locales").hide();
  }
}

//Crea el carrito pendiente mediante el local Storage
function carritoPendiente() {
  let productosPendientes = JSON.parse(
    localStorage.getItem("Carrito Guardado")
  );
  let TotalPendiente = JSON.parse(localStorage.getItem("Total a Pagar"));
  Array.prototype.push.apply(detalleDeCompra, productosPendientes);

  total += TotalPendiente;
  agregarAlCarrito();
}

//funciones de filtrado de productos

function filtroOCB() {
  $("#productos").hide();
  $("#filtrado").show();
  $("#filtrado").empty();
  $("#locales").empty();
  const listafiltro = listaProductos.filter(
    (producto) => producto.nombre == "OCB"
  );
  crearProductos(listafiltro, "#filtrado");
}
function filtroRolling() {
  $("#productos").hide();
  $("#filtrado").show();
  $("#filtrado").empty();
  $("#locales").empty();
  const listafiltro = listaProductos.filter(
    (producto) => producto.nombre == "Rolling"
  );
  crearProductos(listafiltro, "#filtrado");
}
function filtroPapelillos() {
  $("#productos").hide();
  $("#filtrado").show();
  $("#filtrado").empty();
  $("#locales").empty();
  const listafiltro = listaProductos.filter(
    (producto) => producto.categoria == "Papelillos"
  );
  crearProductos(listafiltro, "#filtrado");
}
function filtroFiltros() {
  $("#productos").hide();
  $("#filtrado").show();
  $("#filtrado").empty();
  $("#locales").empty();
  const listafiltro = listaProductos.filter(
    (producto) => producto.categoria == "Filtros"
  );
  crearProductos(listafiltro, "#filtrado");
}
function filtroPipas() {
  $("#productos").hide();
  $("#filtrado").show();
  $("#filtrado").empty();
  $("#locales").empty();
  const listafiltro = listaProductos.filter(
    (producto) => producto.categoria == "Pipa"
  );
  crearProductos(listafiltro, "#filtrado");
}

function filtroMenoraMayor() {
  $("#productos").hide();
  $("#filtrado").show();
  $("#filtrado").empty();
  $("#locales").empty();
  const listafiltro = listaProductos.sort((a, b) => a.precio - b.precio);
  crearProductos(listafiltro, "#filtrado");
}

function filtroMayoraMenor() {
  $("#productos").hide();
  $("#filtrado").show();
  $("#filtrado").empty();
  $("#locales").empty();
  const listafiltro = listaProductos.sort((a, b) => b.precio - a.precio);
  crearProductos(listafiltro, "#filtrado");
}

function eliminarFiltro() {
  $("#filtrado").hide();
  $("#productos").show();
  $("#filtrado").empty();
  $("#locales").empty();
}

//Animacion Carrito

function mostrarCarrito() {
  $("#sidebar").toggleClass("active");
}
