/* ============================================================
   LECCIÓN 8 · Eventos
   ------------------------------------------------------------
   Tipos de eventos, las tres formas de registrar handlers,
   addEventListener / removeEventListener, el objeto Event y
   preventDefault().
   ============================================================ */

// Referencias a los elementos "objetivo" de las demos.
const zonaTipos      = document.getElementById("zona-tipos");
const coords         = document.getElementById("coords");
const btnProp        = document.getElementById("btn-prop");
const btnMulti       = document.getElementById("btn-multi");
const btnOnce        = document.getElementById("btn-once");
const btnRemoveTarget = document.getElementById("btn-remove-target");
const zonaEvent      = document.getElementById("zona-event");


/* ============================================================
   TIPOS DE EVENTOS
   La misma zona escucha varios tipos a la vez.
   ============================================================ */

// Eventos discretos: los registramos en el log según ocurren.
zonaTipos.addEventListener("mouseenter", () => registrar("salida-tipos", "mouseenter: el puntero ENTRÓ"));
zonaTipos.addEventListener("mouseleave", () => registrar("salida-tipos", "mouseleave: el puntero SALIÓ"));
zonaTipos.addEventListener("click",      () => registrar("salida-tipos", "click"));
zonaTipos.addEventListener("dblclick",   () => registrar("salida-tipos", "dblclick (doble clic)"));
zonaTipos.addEventListener("keydown",    (event) => registrar("salida-tipos", "keydown: tecla '" + event.key + "'"));

// mousemove dispara muchísimo: en vez de llenar el log, actualizamos
// una sola línea con la posición DENTRO de la zona (offsetX/offsetY).
zonaTipos.addEventListener("mousemove", (event) => {
  coords.textContent = "x: " + event.offsetX + ", y: " + event.offsetY;
});


/* ============================================================
   FORMA 1 · handler en el HTML  (onclick="holaDesdeHTML()")
   ============================================================ */

function holaDesdeHTML() {
  mostrar("salida-html",
    "Este handler está escrito en el HTML:\n" +
    '  <button onclick="holaDesdeHTML()">\n\n' +
    "Cómodo para algo rápido, pero mezcla HTML y JS y solo admite un handler.");
}


/* ============================================================
   FORMA 2 · propiedad .onclick  (solo guarda UNA función)
   ============================================================ */

// Asignar la propiedad onclick guarda UNA sola función.
function asignarSaludo() {
  btnProp.onclick = function () {
    mostrar("salida-prop", "Hola (este handler es 'saludo').");
  };
  mostrar("salida-prop", "Hice btnProp.onclick = saludo.\nAhora pulsa el «Botón objetivo».");
}

// Asignar OTRA función pisa la anterior (no se acumulan).
function asignarDespedida() {
  btnProp.onclick = function () {
    mostrar("salida-prop", "Adiós (este handler es 'despedida').");
  };
  mostrar("salida-prop",
    "Hice btnProp.onclick = despedida.\n" +
    "PISÓ al saludo: la propiedad onclick solo guarda una función.\nPulsa el «Botón objetivo».");
}

// Asignar null deja al botón sin handler.
function quitarProp() {
  btnProp.onclick = null;
  mostrar("salida-prop", "btnProp.onclick = null → el «Botón objetivo» ya no hace nada.");
}


/* ============================================================
   FORMA 3 · addEventListener  (admite VARIOS handlers)
   ============================================================ */

// Dos funciones distintas, ambas escuchando el mismo "click".
function escuchaUno() { registrar("salida-multi", "listener 1 ejecutado"); }
function escuchaDos() { registrar("salida-multi", "listener 2 ejecutado"); }

// Con addEventListener, registrar dos NO pisa: corren los dos.
btnMulti.addEventListener("click", escuchaUno);
btnMulti.addEventListener("click", escuchaDos);

// --- Opción { once: true }: se ejecuta una sola vez y se quita solo ---
function saludoUnaVez() {
  registrar("salida-once", "¡Soné! Con { once: true } ya me quité solo. No volveré hasta reactivarme.");
}

function activarOnce() {
  // Si lo activas varias veces seguidas se acumularían; para la demo basta una.
  btnOnce.addEventListener("click", saludoUnaVez, { once: true });
  mostrar("salida-once", "Listener { once: true } activado. Pulsa el «Botón objetivo» (funciona UNA vez).");
}


/* ============================================================
   removeEventListener  (necesita la MISMA función con nombre)
   ============================================================ */

// Función con NOMBRE: guardamos su referencia para poder quitarla luego.
function handlerRemovible() {
  registrar("salida-remove", "click atendido por handlerRemovible");
}

function agregarListener() {
  btnRemoveTarget.addEventListener("click", handlerRemovible);
  mostrar("salida-remove", "Listener AGREGADO. Pulsa el «Botón objetivo»: responde.");
}

function quitarListener() {
  // Pasamos la MISMA referencia (handlerRemovible) que usamos al agregar.
  btnRemoveTarget.removeEventListener("click", handlerRemovible);
  mostrar("salida-remove",
    "Listener QUITADO. El «Botón objetivo» ya no responde.\n\n" +
    "Por esto el handler debe tener nombre: una función anónima no se puede quitar\n" +
    "porque no guardas su referencia.");
}


/* ============================================================
   EL OBJETO EVENT
   El handler recibe automáticamente un objeto con información.
   ============================================================ */

function inspeccionarEvento(event) {
  mostrar("salida-event",
    "event.type          → " + event.type + "\n" +
    "event.target        → <" + event.target.tagName.toLowerCase() + ">   (DONDE hiciste clic)\n" +
    "event.currentTarget → <" + event.currentTarget.tagName.toLowerCase() + ">   (donde está el listener)\n" +
    "event.clientX / Y   → " + event.clientX + ", " + event.clientY + "   (posición en la ventana)\n" +
    "event.timeStamp     → " + Math.round(event.timeStamp) + " ms desde que cargó la página");
}

zonaEvent.addEventListener("click", inspeccionarEvento);


/* ============================================================
   preventDefault()  (cancelar la acción por defecto)
   ============================================================ */

// El enlace apunta a "#": su acción por defecto sería subir al inicio.
function manejarEnlace(event) {
  const cancelar = document.getElementById("chk-prevent-link").checked;

  if (cancelar) {
    event.preventDefault();               // cancela la navegación
    mostrar("salida-link",
      "Hice event.preventDefault(): el enlace NO navegó.\n" +
      "event.defaultPrevented → " + event.defaultPrevented);
  } else {
    mostrar("salida-link", "Sin preventDefault: el navegador siguió el enlace (saltó a «#»).");
  }
}

// El formulario, por defecto, se envía y RECARGA la página.
function manejarFormulario(event) {
  const cancelar = document.getElementById("chk-prevent-form").checked;

  if (cancelar) {
    event.preventDefault();               // evita el envío y la recarga
    const valor = document.getElementById("campo-nombre").value;
    mostrar("salida-form",
      "event.preventDefault(): el formulario NO recargó la página.\n" +
      "Lo manejamos con JS. Valor escrito: " + JSON.stringify(valor));
  }
  // Si NO se cancela, dejamos que ocurra la acción por defecto: la página se recargará.
}


/* ============================================================
   AYUDANTES
   ============================================================ */

// Reemplaza el contenido de una "consola" de demo (y lo imprime en F12).
function mostrar(idSalida, mensaje) {
  document.getElementById(idSalida).textContent = mensaje;
  console.log(mensaje);
}

// Añade una línea al final del log, conservando lo anterior (para ver secuencias).
function registrar(idSalida, linea) {
  const salida = document.getElementById(idSalida);
  salida.textContent += (salida.textContent ? "\n" : "") + linea;
  console.log(linea);
}

// Vacía una de las consolas de demo.
function limpiarSalida(idSalida) {
  document.getElementById(idSalida).textContent = "";
}
