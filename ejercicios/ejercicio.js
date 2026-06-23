/* ============================================================
   EJERCICIO · Mini catálogo (Temas 1 a 4)
   Completar las funciones marcadas con // TODO.
   El helper mostrar() ya está provisto; conviene no modificarlo.
   La consigna completa está en enunciado.md
   ============================================================ */

// ---------- Helper compartido (ya provisto) ----------
// Escribe un texto en la consola verde (.salida) y en la consola del
// navegador (F12) al mismo tiempo.
function mostrar(zona, texto) {
  zona.textContent = texto;
  console.log(texto);
}


/* ============================================================
   RETO 1 · DOM y BOM
   Leer window.innerWidth/innerHeight, navigator.language/platform y
   location.pathname, y escribirlos en los <span> del panel con
   getElementById + .textContent.
   ============================================================ */
function mostrarEntorno() {
  const salida = document.getElementById("salida-entorno");

  // TODO: leer los datos del navegador (window, navigator, location)
  //       y escribirlos en #dato-ventana, #dato-idioma, #dato-sistema y #dato-ruta.
  //       Ejemplo de una línea:
  //       document.getElementById("dato-idioma").textContent = navigator.language;

  mostrar(salida, "Pendiente: completar mostrarEntorno() (Reto 1).");
}


/* ============================================================
   RETO 2 · Buscar elementos
   ============================================================ */
function contarProductos() {
  const salida = document.getElementById("salida-busqueda");

  // TODO: contar los .producto y los .destacado y mostrar los totales.
  //       Pista: document.querySelectorAll(".producto").length

  mostrar(salida, "Pendiente: completar contarProductos() (Reto 2).");
}

function buscar() {
  limpiarResaltados();
  const salida = document.getElementById("salida-busqueda");

  // TODO: leer el texto de #buscador, recorrer los .producto y
  //       agregar la clase "resaltado-verde" a los que coincidan.
  //       Pista: producto.querySelector(".nombre").textContent

  mostrar(salida, "Pendiente: completar buscar() (Reto 2).");
}

function limpiarResaltados() {
  // Quita el resaltado de todos los productos. (Ya provisto.)
  document.querySelectorAll(".resaltado-verde").forEach(function (el) {
    el.classList.remove("resaltado-verde");
  });
}


/* ============================================================
   RETO 3 · Navegar entre elementos
   El listener ya está provisto: al hacer clic en un producto, se llama
   a inspeccionar(card) con ese .producto. Falta completar la función.
   ============================================================ */
const catalogo = document.getElementById("catalogo");
catalogo.addEventListener("click", function (evento) {
  const card = evento.target.closest(".producto");
  if (card) {
    inspeccionar(card);
  }
});

function inspeccionar(card) {
  const salida = document.getElementById("salida-navegacion");

  // TODO: a partir de `card`, mostrar:
  //       - card.parentElement.id
  //       - card.parentElement.children.length
  //       - card.previousElementSibling  (puede ser null)
  //       - card.nextElementSibling      (puede ser null)

  mostrar(salida, "Pendiente: completar inspeccionar() (Reto 3).");
}


/* ============================================================
   RETO 4 · Propiedades de un nodo
   ============================================================ */
function leerContenido() {
  const salida = document.getElementById("salida-propiedades");

  // TODO: sobre "#prod-laptop .nombre", mostrar su textContent, su innerHTML,
  //       su nodeType (vale 1) y su nodeName.
  //       Pista: const nombre = document.querySelector("#prod-laptop .nombre");

  mostrar(salida, "Pendiente: completar leerContenido() (Reto 4).");
}

function renombrarSeguro(nuevo) {
  const salida = document.getElementById("salida-propiedades");

  // TODO: cambiar el nombre del Mouse ("#prod-mouse .nombre") usando
  //       .textContent (no .innerHTML). Validar que `nuevo` no esté vacío.

  mostrar(salida, "Pendiente: completar renombrarSeguro() (Reto 4).");
}
