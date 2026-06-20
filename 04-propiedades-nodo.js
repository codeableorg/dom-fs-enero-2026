/* ============================================================
   LECCIÓN 4 · Propiedades de un nodo
   ------------------------------------------------------------
   Aquí comparamos textContent / innerHTML / outerHTML y vemos
   la jerarquía EventTarget → Node → Element → HTMLElement.
   ============================================================ */

// Referencias a la interfaz.
const cajaDemo        = document.getElementById("caja-demo");
const salidaContenido = document.getElementById("salida-contenido");
const inputPrueba     = document.getElementById("input-prueba");
const salidaHerencia  = document.getElementById("salida-herencia");

// Guardamos el HTML original de la caja para poder reiniciar la demo.
const HTML_ORIGINAL = cajaDemo.innerHTML;


/* ============================================================
   LEER CONTENIDO
   ============================================================ */

// textContent → solo el texto, sin etiquetas. Vive en Node.
function leerTextContent() {
  const saludo = document.getElementById("saludo");
  mostrar(salidaContenido,
    "saludo.textContent\n\n" +
    "Devuelve SOLO el texto, sin etiquetas:\n" +
    "→ " + JSON.stringify(saludo.textContent));
}

// innerHTML → el HTML de dentro, con etiquetas. Vive en Element.
function leerInnerHTML() {
  const saludo = document.getElementById("saludo");
  mostrar(salidaContenido,
    "saludo.innerHTML\n\n" +
    "Devuelve el HTML interno (incluye <strong>):\n" +
    "→ " + JSON.stringify(saludo.innerHTML));
}

// outerHTML → el elemento entero, incluyéndose a sí mismo. Vive en Element.
function leerOuterHTML() {
  const saludo = document.getElementById("saludo");
  mostrar(salidaContenido,
    "saludo.outerHTML\n\n" +
    "Devuelve el elemento COMPLETO (incluye el propio <p>):\n" +
    "→ " + JSON.stringify(saludo.outerHTML));
}


/* ============================================================
   ESCRIBIR CONTENIDO
   ============================================================ */

// Con textContent, las etiquetas se muestran como texto literal.
function escribirTexto() {
  const saludo = document.getElementById("saludo");
  const peligroso = "<em>texto con etiqueta</em>";

  saludo.textContent = peligroso;

  mostrar(salidaContenido,
    'saludo.textContent = "' + peligroso + '"\n\n' +
    "Con textContent las etiquetas NO se interpretan:\n" +
    "se ven tal cual, como texto. Es la opción segura.");
}

// Con innerHTML, las etiquetas se convierten en elementos reales.
function escribirHTML() {
  const saludo = document.getElementById("saludo");
  const html = "<em>texto en cursiva real</em>";

  saludo.innerHTML = html;

  mostrar(salidaContenido,
    'saludo.innerHTML = "' + html + '"\n\n' +
    "Con innerHTML el <em> SÍ se interpreta y crea un\n" +
    "elemento real. Útil, pero peligroso con datos de usuario.");
}

// Devuelve la caja a su estado inicial.
function reiniciarCaja() {
  cajaDemo.innerHTML = HTML_ORIGINAL;
  mostrar(salidaContenido, "La caja volvió a su estado original.");
}


/* ============================================================
   HERENCIA · instanceof
   ============================================================ */

// instanceof responde "¿este objeto desciende de esta clase?".
function analizarInput() {
  // Comprobamos la cadena completa de herencia del <input>.
  const cadena = [
    ["EventTarget",      inputPrueba instanceof EventTarget],
    ["Node",             inputPrueba instanceof Node],
    ["Element",          inputPrueba instanceof Element],
    ["HTMLElement",      inputPrueba instanceof HTMLElement],
    ["HTMLInputElement", inputPrueba instanceof HTMLInputElement],
    ["HTMLDivElement",   inputPrueba instanceof HTMLDivElement], // este debe dar false
  ];

  let texto = "El <input> ¿hereda de…?\n\n";
  cadena.forEach(function (par) {
    const nombre = par[0];
    const esInstancia = par[1];
    texto += "  " + (esInstancia ? "sí " : "no ") + " " + nombre + "\n";
  });
  texto += "\nUn <input> SÍ es un HTMLInputElement,\npero NO es un HTMLDivElement.";

  mostrar(salidaHerencia, texto);
}

// nodeName y nodeType vienen de Node: identifican el tipo de nodo.
function mostrarNodeName() {
  mostrar(salidaHerencia,
    "Propiedades heredadas de Node:\n\n" +
    "  nodeName: " + inputPrueba.nodeName + "   (nombre de la etiqueta, en mayúsculas)\n" +
    "  nodeType: " + inputPrueba.nodeType + "          (1 = elemento)\n" +
    "  tagName:  " + inputPrueba.tagName + "    (esta viene de Element)");
}

function limpiarSalidaHerencia() {
  salidaHerencia.textContent = "";
}


/* ============================================================
   AYUDANTE
   ============================================================ */

// Escribe en la "consola" de la demo y también en la consola real (F12).
function mostrar(elementoSalida, mensaje) {
  elementoSalida.textContent = mensaje;
  console.log(mensaje);
}
