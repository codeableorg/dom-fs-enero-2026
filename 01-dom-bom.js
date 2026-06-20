/* ============================================================
   LECCIÓN 1 · DOM y BOM
   ------------------------------------------------------------
   Este archivo está comentado línea por línea para que entiendas
   QUÉ hace cada cosa y POR QUÉ. Léelo de arriba a abajo. 🙂
   ============================================================ */


/* ------------------------------------------------------------
   PARTE A · EL DOM (Document Object Model)
   El DOM es el árbol de la página. Su raíz es "document".
   ------------------------------------------------------------ */

// Guardamos en variables los elementos que vamos a usar varias veces.
// document.getElementById busca un elemento por su atributo id="...".
const parrafo   = document.getElementById("texto-demo");   // el <p> de la demo
const lista     = document.getElementById("lista-demo");   // el <ul> vacío
const salidaDom = document.getElementById("salida-dom");   // la "consola" de la demo

// Lista de frases para ir rotando cuando pulses el botón.
const frases = [
  "¡Acabas de cambiar el DOM! ✨",
  "JavaScript modificó este texto en vivo.",
  "El navegador no recargó la página, solo cambió el árbol.",
  "Soy un párrafo controlado por el DOM. 👋",
];
let indiceFrase = 0; // recuerda en qué frase vamos

// Cambia el TEXTO del párrafo usando la propiedad .textContent
function cambiarTexto() {
  indiceFrase = (indiceFrase + 1) % frases.length; // pasa a la siguiente frase
  parrafo.textContent = frases[indiceFrase];        // <-- esto modifica el DOM
  imprimir(salidaDom, 'parrafo.textContent = "' + frases[indiceFrase] + '"');
}

// Cambia el COLOR del párrafo usando la propiedad .style
function cambiarColor() {
  // Generamos un color al azar en formato HSL (matiz aleatorio, colores vivos).
  const matiz = Math.floor(Math.random() * 360);
  parrafo.style.color = "hsl(" + matiz + ", 80%, 45%)"; // <-- modifica el estilo en el DOM
  imprimir(salidaDom, 'parrafo.style.color = "hsl(' + matiz + ', 80%, 45%)"');
}

// Crea un NUEVO elemento <li> y lo añade dentro del <ul>.
function agregarItem() {
  const li = document.createElement("li");                 // 1) creamos el nodo en memoria
  li.textContent = "Elemento #" + (lista.children.length + 1); // 2) le ponemos texto
  lista.appendChild(li);                                    // 3) lo insertamos en el árbol (DOM)
  imprimir(salidaDom, "Se creó un <li> y se añadió al <ul>. Ahora hay " + lista.children.length + " elementos.");
}

// Cuenta cuántos elementos (etiquetas) hay en toda la página.
function contarElementos() {
  // getElementsByTagName("*") devuelve TODAS las etiquetas del documento.
  const total = document.getElementsByTagName("*").length;
  imprimir(salidaDom, "La página tiene " + total + " elementos HTML en su árbol DOM.");
}


/* ------------------------------------------------------------
   PARTE B · EL BOM (Browser Object Model)
   El BOM es el navegador alrededor de la página. Su raíz es "window".
   navigator, location, history y screen viven dentro de window.
   ------------------------------------------------------------ */

const salidaBom = document.getElementById("salida-bom");

// navigator → información del navegador y del dispositivo.
function verNavegador() {
  const info =
    "navigator.userAgent → " + navigator.userAgent + "\n\n" +
    "navigator.language  → " + navigator.language + "\n" +
    "navigator.online    → " + navigator.onLine + " (¿hay internet?)\n" +
    "navigator.platform  → " + navigator.platform;
  imprimir(salidaBom, info);
}

// window → la ventana del navegador (tamaño del área visible).
function verVentana() {
  const info =
    "window.innerWidth  → " + window.innerWidth + " px (ancho visible)\n" +
    "window.innerHeight → " + window.innerHeight + " px (alto visible)\n\n" +
    "Tip: cambia el tamaño de la ventana y vuelve a pulsar el botón.";
  imprimir(salidaBom, info);
}

// screen → la pantalla física del usuario (no la ventana).
function verPantalla() {
  const info =
    "screen.width      → " + screen.width + " px (ancho del monitor)\n" +
    "screen.height     → " + screen.height + " px (alto del monitor)\n" +
    "screen.colorDepth → " + screen.colorDepth + " bits de color";
  imprimir(salidaBom, info);
}

// location → la URL de la página actual (y permite navegar a otra).
function verUbicacion() {
  const info =
    "location.href     → " + location.href + "\n" +
    "location.protocol → " + location.protocol + "\n" +
    "location.host     → " + (location.host || "(archivo local)") + "\n" +
    "location.pathname → " + location.pathname + "\n\n" +
    "Con location.href = 'https://...' podrías mandar al usuario a otra página.";
  imprimir(salidaBom, info);
}

// history → el historial de navegación (atrás / adelante).
function verHistorial() {
  const info =
    "history.length → " + history.length + " páginas en el historial de esta pestaña.\n\n" +
    "history.back()    retrocede una página (como el botón ←).\n" +
    "history.forward() avanza una página (como el botón →).";
  imprimir(salidaBom, info);
}


/* ------------------------------------------------------------
   AYUDANTE · imprimir resultados en la "consola" de la demo
   También lo mandamos a la consola real del navegador (F12).
   ------------------------------------------------------------ */
function imprimir(elementoSalida, mensaje) {
  elementoSalida.textContent = mensaje; // lo mostramos en la caja oscura de la demo
  console.log(mensaje);                 // y también en la consola real (F12 → Console)
}
