/* ============================================================
   LECCIÓN 3 · Buscar elementos
   ------------------------------------------------------------
   Antes de modificar algo en la página, primero hay que
   ENCONTRARLO. Aquí practicamos los 6 métodos de búsqueda.
   ============================================================ */

// Referencias a la interfaz.
const tienda          = document.getElementById("tienda");          // zona de pruebas
const salidaBusqueda  = document.getElementById("salida-busqueda");
const salidaSelector  = document.getElementById("salida-selector");
const salidaVivo      = document.getElementById("salida-vivo");
const selectorInput   = document.getElementById("selector-input");


/* ============================================================
   1) getElementById  →  busca por id, devuelve 1 elemento (o null)
   ============================================================ */
function demoGetById() {
  limpiar();
  // El id debe ser único en toda la página. Por eso devuelve UN solo elemento.
  const titulo = document.getElementById("titulo-tienda");
  titulo.classList.add("resaltado-azul");

  mostrar(salidaBusqueda,
    'document.getElementById("titulo-tienda")\n\n' +
    "Devuelve UN elemento (o null si no existe):\n" +
    "→ <" + titulo.tagName.toLowerCase() + "> con el texto: " + titulo.textContent);
}


/* ============================================================
   2) getElementsByClassName  →  busca por clase, devuelve varios
   ============================================================ */
function demoGetByClass() {
  limpiar();
  // Devuelve TODOS los que tengan esa clase, como una HTMLCollection.
  const productos = document.getElementsByClassName("producto");
  resaltar(productos, "resaltado-verde");

  mostrar(salidaBusqueda,
    'document.getElementsByClassName("producto")\n\n' +
    "Encontró " + productos.length + " elementos con la clase «producto».\n" +
    "Devuelve una HTMLCollection (parecida a un array, pero no lo es).");
}


/* ============================================================
   3) getElementsByTagName  →  busca por etiqueta, devuelve varios
   ============================================================ */
function demoGetByTag() {
  limpiar();
  // Busca por nombre de etiqueta: "article", "div", "p", "span"...
  const articulos = document.getElementsByTagName("article");
  resaltar(articulos, "resaltado-verde");

  mostrar(salidaBusqueda,
    'document.getElementsByTagName("article")\n\n' +
    "Encontró " + articulos.length + " etiquetas <article>.\n" +
    'Truco: getElementsByTagName("*") devuelve TODAS las etiquetas.');
}


/* ============================================================
   4) getElementsByName  →  busca por atributo name (útil en formularios)
   ============================================================ */
function demoGetByName() {
  limpiar();
  // Muy usado con inputs de formularios: <input name="busqueda">
  const campos = document.getElementsByName("busqueda");
  resaltar(campos, "resaltado-azul");

  mostrar(salidaBusqueda,
    'document.getElementsByName("busqueda")\n\n' +
    "Encontró " + campos.length + " elemento(s) con name=\"busqueda\".\n" +
    "Se usa sobre todo para leer los campos de un formulario.");
}


/* ============================================================
   5) querySelector  →  selector CSS, devuelve SOLO el primero
   ============================================================ */
function demoQuerySelector() {
  limpiar();
  // Acepta cualquier selector CSS y devuelve el PRIMER elemento que coincida.
  const primero = document.querySelector(".producto");
  primero.classList.add("resaltado-azul");

  mostrar(salidaBusqueda,
    'document.querySelector(".producto")\n\n' +
    "Aunque hay varios «.producto», devuelve solo el PRIMERO:\n" +
    "→ " + primero.textContent.trim().replace(/\s+/g, " "));
}


/* ============================================================
   6) querySelectorAll  →  selector CSS, devuelve TODOS los que coincidan
   ============================================================ */
function demoQuerySelectorAll() {
  limpiar();
  // Devuelve una NodeList con TODOS los que coincidan. Acepta selectores complejos.
  const destacados = document.querySelectorAll(".producto.destacado");
  resaltar(destacados, "resaltado-verde");

  mostrar(salidaBusqueda,
    'document.querySelectorAll(".producto.destacado")\n\n' +
    "Encontró " + destacados.length + " productos que son «producto» Y «destacado».\n" +
    "Devuelve una NodeList (sí tiene forEach, a diferencia de HTMLCollection).");
}


/* ============================================================
   BUSCADOR LIBRE · escribe tu propio selector CSS
   ============================================================ */

// Rellena el input cuando haces clic en un ejemplo (los "chips").
function usarEjemplo(selector) {
  selectorInput.value = selector;
  ejecutarSelector();
}

// Ejecuta querySelectorAll con lo que el usuario escribió.
function ejecutarSelector() {
  limpiar();
  const selector = selectorInput.value.trim();

  if (selector === "") {
    mostrar(salidaSelector, "Escribe un selector, por ejemplo: .destacado");
    return;
  }

  // Un selector mal escrito hace que querySelectorAll lance un error,
  // así que lo envolvemos en try/catch para avisar con elegancia.
  try {
    // Lo buscamos DENTRO de la tienda (búsqueda "acotada" a un contenedor).
    const encontrados = tienda.querySelectorAll(selector);
    resaltar(encontrados, "resaltado-verde");

    mostrar(salidaSelector,
      'tienda.querySelectorAll("' + selector + '")\n\n' +
      "Coincidencias: " + encontrados.length);
  } catch (error) {
    mostrar(salidaSelector, "❌ Ese selector no es válido:\n" + error.message);
  }
}

// Permite ejecutar la búsqueda pulsando Enter dentro del input.
selectorInput.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    ejecutarSelector();
  }
});


/* ============================================================
   VIVO vs ESTÁTICO · HTMLCollection vs NodeList
   ============================================================ */
function demoVivoEstatico() {
  // Pedimos las dos colecciones ANTES de agregar nada.
  const vivo     = document.getElementsByClassName("producto"); // HTMLCollection (viva)
  const estatico = document.querySelectorAll(".producto");      // NodeList (estática)

  const antesVivo = vivo.length;
  const antesEstatico = estatico.length;

  // Creamos un producto nuevo y lo metemos en la tienda.
  const nuevo = document.createElement("article");
  nuevo.className = "producto agregado"; // "agregado" nos servirá para borrarlo luego
  nuevo.innerHTML = '<span>✨ Producto nuevo</span><span class="precio">$0</span>';
  const formulario = tienda.querySelector("form");
  tienda.insertBefore(nuevo, formulario); // lo insertamos antes del formulario

  // Volvemos a leer las MISMAS variables, sin pedirlas de nuevo.
  mostrar(salidaVivo,
    "Pedimos ambas colecciones, luego agregamos 1 producto.\n\n" +
    "getElementsByClassName (VIVA):\n" +
    "   antes: " + antesVivo + "   →   después: " + vivo.length + "   ✅ ¡se actualizó sola!\n\n" +
    "querySelectorAll (ESTÁTICA):\n" +
    "   antes: " + antesEstatico + "   →   después: " + estatico.length + "   📸 sigue igual (es una foto)\n\n" +
    "Por eso, si necesitas la lista actualizada, vuelve a llamar a querySelectorAll.");
}

// Quita los productos que agregamos en la demo anterior.
function quitarAgregados() {
  const agregados = tienda.querySelectorAll(".agregado");
  agregados.forEach(function (el) {
    el.remove(); // .remove() saca el elemento del DOM
  });
  mostrar(salidaVivo, "Se quitaron " + agregados.length + " producto(s) agregado(s). Todo vuelve a su estado inicial.");
}


/* ============================================================
   AYUDANTES
   ============================================================ */

// Resalta una colección de elementos con la clase de color indicada.
// Aceptamos HTMLCollection o NodeList: las convertimos a array con Array.from.
function resaltar(coleccion, claseColor) {
  Array.from(coleccion).forEach(function (el) {
    el.classList.add(claseColor);
  });
}

// Quita todos los resaltados de la tienda para empezar limpio.
function limpiar() {
  const resaltados = tienda.querySelectorAll(".resaltado, .resaltado-azul, .resaltado-verde");
  resaltados.forEach(function (el) {
    el.classList.remove("resaltado", "resaltado-azul", "resaltado-verde");
  });
}

// Escribe un mensaje en la "consola" de la demo y también en la consola real (F12).
function mostrar(elementoSalida, mensaje) {
  elementoSalida.textContent = mensaje;
  console.log(mensaje);
}
