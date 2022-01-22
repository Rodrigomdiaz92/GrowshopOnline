function getProductosjson() {
  $.get(URLGET, function (respuesta, estado) {
    if (estado === "success") {
      listaProductos = respuesta;
      crearProductos(listaProductos, productos);
      carritoPendiente();
    }
  });

  console.log(listaProductos);
}

function crearProductos(productosExhibidos, ubicacion) {
  for (const producto of productosExhibidos) {
    $(ubicacion).append(`<div class="col d-flex justify-content-around">
                          <div class="card mt- 3 mb-3 " style="width: 18rem;">
                          <div class="card-body">
                          <img src="./img/${producto.categoria}/${producto.imagen}.png" class="img-fluid" alt="">
                          <h5 class="card-title text-dark"> ${producto.categoria} ${producto.nombre} </h5>
                          <h6 class="card-subtitle mb-2 text-muted">Articulo n°: ${producto.id}</h6>
                          <p class="card-text text-dark">Precio $ ${producto.precio} Stock: ${producto.stock} unidades</p>
                          <button id="${producto.id}" type="button" class="btn btn-success">Agregar al carrito</button>
                          </div>
                          </div>
                          </div> `);
  }
}

//nueva funcion ayax

function sumarAlCarrito(e) {
  if (e.target.classList.contains("btn-success")) {
    const productoElegido = listaProductos.find(
      (producto) => producto.id == e.target.id
    );
    restarStock(productoElegido);
    calculoCompra(productoElegido);
    detalleDeCompra.push(productoElegido);
    agregarAlCarrito();
    console.log(listaProductos);
  }
}

function restarStock(producto) {
  if (producto.stock > 1) {
    producto.stock -= 1;
  } else {
    alert("No hay mas stock");
  }
}

function calculoCompra(producto) {
  total += producto.precio;
}

//fin

function agregarAlCarrito() {
  carritoCompra.innerHTML = "";
  calculoTotal(total);
  for (const producto of detalleDeCompra) {
    carritoCompra.innerHTML += `<li class="list-group-item"><img src="./img/${producto.categoria}/${producto.imagen}sm.png" class="img-fluid" alt="">${producto.categoria} ${producto.nombre} $${producto.precio}</li>`;
  }
  localStorage.setItem("Carrito Guardado", JSON.stringify(detalleDeCompra));
  localStorage.setItem("Total a Pagar", JSON.stringify(total));
}

function calculoTotal(monto) {
  sumaTotal.innerHTML = ` <h3>Total a pagar $${monto} </h3> <button type="button" class="btn btn-warning">Vaciar Carrito</button>`;
}

function eliminarCarrito(e) {
  if (e.target.classList.contains("btn-warning")) {
    detalleDeCompra.length = 0;
    total = 0;
    agregarAlCarrito();
    localStorage.clear();
  }
}

//Crea el carrito pendiente mediante el local Storage
function carritoPendiente() {
  let productosPendientes = JSON.parse(
    localStorage.getItem("Carrito Guardado")
  );
  let TotalPendiente = JSON.parse(localStorage.getItem("Total a Pagar"));
  Array.prototype.push.apply(detalleDeCompra, productosPendientes);
  console.log(detalleDeCompra);
  total += TotalPendiente;
  agregarAlCarrito();
}

//funciones de filtrado de productos

function filtroOCB() {
  $("#productos").hide();
  $("#filtrado").show();
  $("#filtrado").empty();
  const listafiltro = listaProductos.filter(
    (producto) => producto.nombre == "OCB"
  );
  crearProductos(listafiltro, "#filtrado");
}
function filtroRolling() {
  $("#productos").hide();
  $("#filtrado").show();
  $("#filtrado").empty();
  const listafiltro = listaProductos.filter(
    (producto) => producto.nombre == "Rolling"
  );
  crearProductos(listafiltro, "#filtrado");
}
function filtroPapelillos() {
  $("#productos").hide();
  $("#filtrado").show();
  $("#filtrado").empty();
  const listafiltro = listaProductos.filter(
    (producto) => producto.categoria == "Papelillos"
  );
  crearProductos(listafiltro, "#filtrado");
}
function filtroFiltros() {
  $("#productos").hide();
  $("#filtrado").show();
  $("#filtrado").empty();
  const listafiltro = listaProductos.filter(
    (producto) => producto.categoria == "Filtros"
  );
  crearProductos(listafiltro, "#filtrado");
}
function filtroPipas() {
  $("#productos").hide();
  $("#filtrado").show();
  $("#filtrado").empty();
  const listafiltro = listaProductos.filter(
    (producto) => producto.categoria == "Pipa"
  );
  crearProductos(listafiltro, "#filtrado");
}

function filtroMenoraMayor() {
  $("#productos").hide();
  $("#filtrado").show();
  $("#filtrado").empty();
  const listafiltro = listaProductos.precio.sort();
  crearProductos(listafiltro, "#filtrado");
}

function eliminarFiltro() {
  $("#filtrado").hide();
  $("#productos").show();
  $("#filtrado").empty();
}

//Animacion Carrito

function mostrarCarrito() {
  $("#carritoCompras").slideToggle();
}
