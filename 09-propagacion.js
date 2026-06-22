/* ============================================================
   LECCIÓN 9 · Propagación de eventos
   ------------------------------------------------------------
   Burbujeo, target vs currentTarget, stopPropagation, la fase
   de captura y, como cierre, la delegación de eventos.
   ============================================================ */


/* ============================================================
   AYUDANTES (declarados primero porque los usamos enseguida)
   ============================================================ */

// Nombre legible de una caja: usamos su data-nombre ("abuelo"/"padre"/"hijo").
function nombre(el) {
  return el.dataset.nombre || el.tagName.toLowerCase();
}

// Hace "destellar" la caja cuyo handler se acaba de disparar,
// para VER el orden en que se ejecutan.
function destello(el) {
  el.classList.add("activa");
  setTimeout(() => el.classList.remove("activa"), 450);
}

// Añade una línea al final del log (conserva lo anterior para ver la secuencia).
function registrar(idSalida, linea) {
  const salida = document.getElementById(idSalida);
  salida.textContent += (salida.textContent ? "\n" : "") + linea;
  console.log(linea);
}

function limpiarSalida(idSalida) {
  document.getElementById(idSalida).textContent = "";
}


/* ============================================================
   BURBUJEO + target vs currentTarget
   Un listener en cada caja. Al hacer clic en el hijo, el evento
   SUBE: hijo → padre → abuelo.
   ============================================================ */

function alBurbujear(event) {
  const yo = event.currentTarget;     // la caja de ESTE handler
  destello(yo);
  registrar("salida-bubbling",
    "Subiendo por <" + nombre(yo) + ">" +
    "   |   target = <" + nombre(event.target) + ">" +
    "   ·   currentTarget = <" + nombre(yo) + ">");
}

// Sin tercer parámetro → fase de burbujeo (la de por defecto).
document.getElementById("b-abuelo").addEventListener("click", alBurbujear);
document.getElementById("b-padre").addEventListener("click", alBurbujear);
document.getElementById("b-hijo").addEventListener("click", alBurbujear);


/* ============================================================
   stopPropagation()
   Si el hijo corta la propagación, el evento NO sube.
   ============================================================ */

function alPropagar(event) {
  const yo = event.currentTarget;
  destello(yo);

  // Solo el hijo corta, y solo si la casilla está marcada.
  if (nombre(yo) === "hijo" && document.getElementById("chk-stop").checked) {
    event.stopPropagation();            // el evento deja de viajar hacia arriba
    registrar("salida-stop",
      "Clic en <hijo> → stopPropagation()\n" +
      "El evento se detiene aquí: padre y abuelo NO se enteran.");
    return;
  }

  registrar("salida-stop", "Recibido en <" + nombre(yo) + ">");
}

document.getElementById("s-abuelo").addEventListener("click", alPropagar);
document.getElementById("s-padre").addEventListener("click", alPropagar);
document.getElementById("s-hijo").addEventListener("click", alPropagar);


/* ============================================================
   FASE DE CAPTURA (el viaje completo)
   Cada caja tiene DOS listeners: uno en captura (bajada) y otro
   en burbujeo (subida). Orden al hacer clic en el hijo:
   captura abuelo → padre → hijo  y luego  burbujeo hijo → padre → abuelo.
   ============================================================ */

function enCaptura(event) {
  destello(event.currentTarget);
  registrar("salida-fases", "BAJADA  (captura)  en <" + nombre(event.currentTarget) + ">");
}

function enBurbujeo(event) {
  destello(event.currentTarget);
  registrar("salida-fases", "SUBIDA  (burbujeo) en <" + nombre(event.currentTarget) + ">");
}

const fAbuelo = document.getElementById("f-abuelo");
const fPadre  = document.getElementById("f-padre");
const fHijo   = document.getElementById("f-hijo");

// El tercer parámetro `true` = escuchar en la fase de CAPTURA.
fAbuelo.addEventListener("click", enCaptura, true);
fPadre.addEventListener("click", enCaptura, true);
fHijo.addEventListener("click", enCaptura, true);

// Sin tercer parámetro = fase de BURBUJEO. (Registramos el hijo primero
// para que, en el propio objetivo, la bajada salga antes que la subida.)
fHijo.addEventListener("click", enBurbujeo);
fPadre.addEventListener("click", enBurbujeo);
fAbuelo.addEventListener("click", enBurbujeo);


/* ============================================================
   DELEGACIÓN DE EVENTOS
   UN solo listener en el contenedor atiende a todos los items,
   incluso a los que se crean después. Usa event.target.
   ============================================================ */

const listaDeleg = document.getElementById("lista-deleg");

// El listener vive en el CONTENEDOR, no en cada item.
listaDeleg.addEventListener("click", function (event) {
  // closest sube desde donde se hizo clic hasta encontrar un item.
  const item = event.target.closest(".item");
  if (!item) return;                    // clic en el contenedor pero fuera de un item

  registrar("salida-deleg",
    "Clic en: " + JSON.stringify(item.textContent) +
    "   (lo resolvió 1 solo listener del contenedor, vía event.target)");
});

// Crea un item nuevo. Fíjate: NO le ponemos listener propio.
function agregarItemDeleg() {
  const n = listaDeleg.children.length + 1;
  const div = document.createElement("div");
  div.className = "item";
  div.style.cursor = "pointer";
  div.textContent = "Item " + n;
  listaDeleg.append(div);
  registrar("salida-deleg", "Agregué «Item " + n + "» (sin listener propio: el del contenedor lo cubre).");
}


/* ============================================================
   ESTADO INICIAL
   Arrancamos la demo de delegación con tres items.
   ============================================================ */
agregarItemDeleg();
agregarItemDeleg();
agregarItemDeleg();
limpiarSalida("salida-deleg");
