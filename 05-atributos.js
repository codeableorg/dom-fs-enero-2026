/* ============================================================
   LECCIÓN 5 · Atributos y propiedades
   ------------------------------------------------------------
   Cómo el HTML que escribimos (atributos) se ve desde JS
   (propiedades): className, htmlFor, booleanos, data-* y style.
   ============================================================ */

// Referencias a la interfaz.
const campoCorreo  = document.getElementById("campo-correo");
const cajaClases   = document.getElementById("caja-clases");
const botonObjetivo = document.getElementById("boton-objetivo");
const checkPrueba  = document.getElementById("check-prueba");
const productoData = document.getElementById("producto-data");
const cajaStyle    = document.getElementById("caja-style");


/* ============================================================
   ATRIBUTO vs PROPIEDAD
   ============================================================ */

// El atributo guarda el valor INICIAL del HTML.
// La propiedad refleja el valor ACTUAL (lo que el usuario escribió).
function compararValor() {
  const atributo  = campoCorreo.getAttribute("value"); // valor inicial del HTML
  const propiedad = campoCorreo.value;                 // valor actual

  mostrar("salida-attr",
    "Escribe algo distinto en el campo y vuelve a pulsar.\n\n" +
    'getAttribute("value")  →  ' + JSON.stringify(atributo) + "   (queda el inicial)\n" +
    "campoCorreo.value      →  " + JSON.stringify(propiedad) + "   (lo actual)\n\n" +
    "Por eso, para leer lo que el usuario escribió, usa la propiedad .value.");
}


/* ============================================================
   className y classList
   ============================================================ */

// className es la cadena COMPLETA de clases (un string).
function verClassName() {
  mostrar("salida-clases",
    "El atributo HTML se llama class, pero la propiedad es className:\n\n" +
    "cajaClases.className  →  " + JSON.stringify(cajaClases.className) + "\n\n" +
    "Es un string con todas las clases separadas por espacios.");
}

// classList es más cómodo para tocar UNA clase sin pisar las demás.
function alternarClase() {
  // toggle agrega la clase si no está, y la quita si ya estaba.
  const ahoraEsta = cajaClases.classList.toggle("destacado");

  mostrar("salida-clases",
    'cajaClases.classList.toggle("destacado")\n\n' +
    "La clase «destacado» ahora está: " + (ahoraEsta ? "SÍ" : "NO") + "\n" +
    "className completo: " + JSON.stringify(cajaClases.className) + "\n\n" +
    "toggle es ideal para encender/apagar una clase sin tocar el resto.");
}


/* ============================================================
   ATRIBUTOS BOOLEANOS
   ============================================================ */

// En JS la propiedad disabled es un booleano de verdad: true / false.
function alternarDisabled() {
  botonObjetivo.disabled = !botonObjetivo.disabled;

  mostrar("salida-bool",
    "botonObjetivo.disabled = " + botonObjetivo.disabled + "\n\n" +
    "El «Botón objetivo» está ahora " +
    (botonObjetivo.disabled ? "DESACTIVADO" : "ACTIVADO") + ".\n\n" +
    'Nota: en HTML basta escribir «disabled»; poner disabled="false" NO lo activa.');
}

// checked nos dice si la casilla está marcada, como booleano.
function leerChecked() {
  mostrar("salida-bool",
    "checkPrueba.checked  →  " + checkPrueba.checked + "\n\n" +
    "La casilla está " + (checkPrueba.checked ? "MARCADA" : "sin marcar") + ".\n" +
    "Marca o desmarca la casilla y vuelve a pulsar para ver el cambio.");
}


/* ============================================================
   ATRIBUTOS NO ESTÁNDAR · data-* y dataset
   ============================================================ */

// dataset da acceso cómodo a los atributos data-*.
// data-precio-final (con guiones) se lee como dataset.precioFinal (camelCase).
function leerDataset() {
  mostrar("salida-data",
    "Leemos los atributos data-* con dataset:\n\n" +
    "dataset.id           →  " + JSON.stringify(productoData.dataset.id) + "\n" +
    "dataset.precioFinal  →  " + JSON.stringify(productoData.dataset.precioFinal) + "\n\n" +
    "data-precio-final (con guiones) se vuelve precioFinal (camelCase).\n" +
    "Un atributo inventado SIN data- no aparece como propiedad:\n" +
    "productoData.colorFavorito  →  " + productoData.colorFavorito);
}

// Escribir en dataset cambia (o crea) el atributo data-* en el HTML.
function escribirDataset() {
  productoData.dataset.precioFinal = "999";

  mostrar("salida-data",
    'productoData.dataset.precioFinal = "999"\n\n' +
    "Esto reescribe el atributo en el HTML. Ahora:\n" +
    'getAttribute("data-precio-final")  →  ' +
    JSON.stringify(productoData.getAttribute("data-precio-final")) + "\n\n" +
    "Recuerda: lo que sale de dataset es texto. Para sumar, usa Number(...).");
}


/* ============================================================
   STYLE
   ============================================================ */

// element.style toca los estilos EN LÍNEA. Cada propiedad va en camelCase.
function aplicarEstilo() {
  cajaStyle.style.color = "white";
  cajaStyle.style.backgroundColor = "#1e40af"; // background-color → backgroundColor
  cajaStyle.style.padding = "16px";

  mostrar("salida-style",
    "Aplicamos estilos en línea con la propiedad style:\n\n" +
    '  style.color = "white"\n' +
    '  style.backgroundColor = "#1e40af"   (camelCase)\n' +
    '  style.padding = "16px"\n\n' +
    "Esto equivale a escribir un atributo style=\"...\" en el HTML.");
}

// style solo ve lo en línea; getComputedStyle ve lo realmente aplicado.
function leerEstilo() {
  const enLinea  = cajaStyle.style.color;                       // solo lo "inline"
  const aplicado = getComputedStyle(cajaStyle).color;           // lo que se ve de verdad

  mostrar("salida-style",
    "cajaStyle.style.color            →  " + JSON.stringify(enLinea) +
    "   (vacío si no hay estilo en línea)\n" +
    "getComputedStyle(...).color      →  " + JSON.stringify(aplicado) +
    "   (el color real, venga de donde venga)");
}

// Quitamos los estilos en línea para volver al estado inicial.
function reiniciarStyle() {
  cajaStyle.removeAttribute("style");
  mostrar("salida-style", "Se quitó el atributo style. La caja vuelve a su estilo de la hoja CSS.");
}


/* ============================================================
   AYUDANTES
   ============================================================ */

// Escribe en la "consola" de la demo indicada y en la consola real (F12).
function mostrar(idSalida, mensaje) {
  document.getElementById(idSalida).textContent = mensaje;
  console.log(mensaje);
}

// Limpia una de las consolas de demo.
function limpiarSalida(idSalida) {
  document.getElementById(idSalida).textContent = "";
}
