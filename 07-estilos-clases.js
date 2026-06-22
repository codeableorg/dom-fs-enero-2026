/* ============================================================
   LECCIÓN 7 · Estilos y clases
   ------------------------------------------------------------
   La propiedad style, el camelCase de CSS, className vs
   classList (add/remove/toggle/replace/contains) y
   getComputedStyle.
   ============================================================ */

// Referencias a las cajas de cada demo.
const cajaStyle = document.getElementById("caja-style");
const cajaCamel = document.getElementById("caja-camel");
const cajaCn    = document.getElementById("caja-cn");
const cajaCl    = document.getElementById("caja-cl");
const cajaCss   = document.getElementById("caja-css");


/* ============================================================
   STYLE  (estilos en línea)
   ============================================================ */

// element.style escribe el atributo style="..." del elemento.
// Cada propiedad va en camelCase; cada valor es un string con unidades.
function aplicarEstilos() {
  cajaStyle.style.color = "white";
  cajaStyle.style.backgroundColor = "#1e40af";   // background-color → backgroundColor
  cajaStyle.style.padding = "20px";              // el valor lleva unidades: "20px"
  cajaStyle.style.borderRadius = "14px";         // border-radius → borderRadius
  cajaStyle.style.fontWeight = "700";

  mostrar("salida-style",
    "Aplicamos estilos EN LÍNEA con la propiedad style:\n\n" +
    '  style.color = "white"\n' +
    '  style.backgroundColor = "#1e40af"   (camelCase)\n' +
    '  style.padding = "20px"              (con unidades)\n' +
    '  style.borderRadius = "14px"\n\n' +
    "Es lo mismo que escribir style=\"...\" en el HTML.\n" +
    'Atributo style resultante: ' + JSON.stringify(cajaStyle.getAttribute("style")));
}

// Quitar el atributo style nos devuelve al estilo de la hoja CSS.
function reiniciarStyle() {
  cajaStyle.removeAttribute("style");
  limpiarSalida("salida-style");
}


/* ============================================================
   camelCase  (CSS con guion → JS sin guion)
   ============================================================ */

// Cada botón aplica UNA propiedad y muestra su traducción CSS → JS.
function aplicarFontSize() {
  cajaCamel.style.fontSize = "1.6rem";
  reportarCamel("font-size", "fontSize", "1.6rem");
}

function aplicarBg() {
  cajaCamel.style.backgroundColor = "#dcfce7";
  reportarCamel("background-color", "backgroundColor", "#dcfce7");
}

function aplicarRadio() {
  cajaCamel.style.borderRadius = "18px";
  reportarCamel("border-radius", "borderRadius", "18px");
}

// Mensaje común para las tres: deja clarísima la equivalencia.
function reportarCamel(css, js, valor) {
  mostrar("salida-camel",
    "CSS:  " + css + "\n" +
    "JS :  style." + js + ' = "' + valor + '"\n\n' +
    "Regla: se quita el guion y la letra siguiente va en mayúscula.\n" +
    "(También vale style[\"" + css + "\"], con el nombre de CSS entre corchetes.)");
}

function reiniciarCamel() {
  cajaCamel.removeAttribute("style");
  limpiarSalida("salida-camel");
}


/* ============================================================
   className vs classList
   ============================================================ */

// className es el string COMPLETO de clases.
function verClassName() {
  mostrar("salida-cn",
    "cajaCn.className  →  " + JSON.stringify(cajaCn.className) + "\n\n" +
    "Es un solo string con todas las clases separadas por espacios.");
}

// Asignar className REEMPLAZA todo: aquí perdemos la clase 'destacado'.
function pisarConClassName() {
  cajaCn.className = "caja-estilo";   // adiós a 'destacado' (y a cualquier otra clase)
  mostrar("salida-cn",
    'cajaCn.className = "caja-estilo"\n\n' +
    "Reemplazamos TODAS las clases. La clase 'destacado' se perdió:\n" +
    "className ahora  →  " + JSON.stringify(cajaCn.className) + "\n\n" +
    "Por eso, para tocar una sola clase, mejor classList.");
}

function reiniciarClassName() {
  cajaCn.className = "caja-estilo destacado";   // estado inicial
  limpiarSalida("salida-cn");
}


/* ============================================================
   classList: add, remove, toggle, replace, contains
   ============================================================ */

// add: agrega la clase (si ya estaba, no hace nada).
function clAdd() {
  cajaCl.classList.add("destacado");
  reportarCl("classList.add('destacado')");
}

// remove: quita la clase.
function clRemove() {
  cajaCl.classList.remove("destacado");
  reportarCl("classList.remove('destacado')");
}

// toggle: si está la quita, si no está la pone. Devuelve true/false.
function clToggle() {
  const ahoraEsta = cajaCl.classList.toggle("grande");
  reportarCl("classList.toggle('grande')  →  " + ahoraEsta + (ahoraEsta ? "  (se agregó)" : "  (se quitó)"));
}

// replace(viejo, nuevo): cambia una clase por otra. Solo actúa si 'viejo' está.
function clReplace() {
  // Alternamos el tema en los dos sentidos para que se pueda repetir.
  if (cajaCl.classList.contains("tema-claro")) {
    cajaCl.classList.replace("tema-claro", "tema-oscuro");
    reportarCl("classList.replace('tema-claro', 'tema-oscuro')");
  } else {
    cajaCl.classList.replace("tema-oscuro", "tema-claro");
    reportarCl("classList.replace('tema-oscuro', 'tema-claro')");
  }
}

// contains: pregunta si la clase está presente (true/false). No cambia nada.
function clContains() {
  const hay = cajaCl.classList.contains("destacado");
  reportarCl("classList.contains('destacado')  →  " + hay +
    (hay ? "  (sí la tiene)" : "  (no la tiene; pulsa add primero)"));
}

// Mensaje común: muestra el estado actual de las clases tras cada acción.
function reportarCl(accion) {
  mostrar("salida-cl",
    accion + "\n\n" +
    "className  →  " + JSON.stringify(cajaCl.className) + "\n" +
    "classList  →  [" + Array.from(cajaCl.classList).join(", ") + "]");
}

function reiniciarClassList() {
  cajaCl.className = "caja-estilo tema-claro";   // estado inicial
  limpiarSalida("salida-cl");
}


/* ============================================================
   getComputedStyle  (el estilo realmente aplicado)
   ============================================================ */

// style solo ve lo "en línea"; getComputedStyle ve lo que de verdad se aplica.
function leerComputado() {
  const enLinea  = cajaCss.style.backgroundColor;                 // "" (no hay style="...")
  const computado = getComputedStyle(cajaCss);                    // el estilo real, resuelto

  mostrar("salida-computed",
    "cajaCss.style.backgroundColor              →  " + JSON.stringify(enLinea) +
    "   (vacío: el color viene del CSS, no de un style en línea)\n" +
    "getComputedStyle(cajaCss).backgroundColor  →  " + JSON.stringify(computado.backgroundColor) +
    "   (el color REAL, en rgb)\n" +
    "getComputedStyle(cajaCss).fontSize         →  " + JSON.stringify(computado.fontSize) +
    "   (siempre resuelto a px)\n\n" +
    "getComputedStyle es SOLO LECTURA: sirve para consultar, no para asignar.");
}


/* ============================================================
   AYUDANTES
   ============================================================ */

// Escribe en la "consola" de la demo y también en la consola real (F12).
function mostrar(idSalida, mensaje) {
  document.getElementById(idSalida).textContent = mensaje;
  console.log(mensaje);
}

// Limpia una de las consolas de demo.
function limpiarSalida(idSalida) {
  document.getElementById(idSalida).textContent = "";
}
