/* ============================================================
   LECCIÓN 6 · Crear e insertar nodos
   ------------------------------------------------------------
   createElement, configurar con className/innerHTML, insertar
   con append/prepend/before/after/replaceWith, borrar con
   remove, mover nodos y agrupar con DocumentFragment.
   ============================================================ */

// Referencias a los "lienzos" (contenedores) de cada demo.
const lienzoCrear   = document.getElementById("lienzo-crear");
const lienzoLista   = document.getElementById("lienzo-lista");
const lienzoBA      = document.getElementById("lienzo-ba");
const lienzoReplace = document.getElementById("lienzo-replace");
const lienzoRemove  = document.getElementById("lienzo-remove");
const zonaA         = document.getElementById("zona-a");
const zonaB         = document.getElementById("zona-b");
const lienzoFrag    = document.getElementById("lienzo-frag");

// Contador para numerar los items que vamos creando.
let contador = 0;


/* ============================================================
   FÁBRICA DE ITEMS
   Una pequeña función que crea un nodo ya configurado.
   Así no repetimos createElement + className en cada demo.
   ============================================================ */

// Crea un <div class="item ..."> con el texto indicado y lo DEVUELVE
// (suelto: todavía no está insertado en ningún sitio).
// claseExtra: "nuevo" (verde, por defecto), "ancla" (naranja) o "" (azul base).
function nuevoItem(texto, claseExtra = "nuevo") {
  const div = document.createElement("div");              // 1) crear el nodo
  div.className = claseExtra ? "item " + claseExtra : "item"; // 2) darle sus clases
  div.textContent = texto;                                // 2) darle contenido
  return div;                                             // (lo inserta quien lo llame)
}


/* ============================================================
   createElement + className + innerHTML
   ============================================================ */

function crearYAgregar() {
  // 1) CREAR: el nodo nace suelto, en memoria. Aún no se ve.
  const caja = document.createElement("div");

  // 2) CONFIGURAR: className pone TODAS sus clases de una vez (en un string).
  caja.className = "item nuevo";

  // 2) CONFIGURAR: innerHTML acepta etiquetas HTML dentro del texto.
  contador++;
  caja.innerHTML = "Nodo <strong>#" + contador + "</strong> creado con JS";

  // 3) INSERTAR: hasta aquí no se veía; al hacer append entra al documento.
  lienzoCrear.append(caja);

  mostrar("salida-crear",
    "1) document.createElement('div')   → nodo suelto (no se ve)\n" +
    "2) caja.className = 'item nuevo'    → le pusimos clases\n" +
    "2) caja.innerHTML = '...<strong>#" + contador + "</strong>...'  → contenido con HTML\n" +
    "3) lienzoCrear.append(caja)         → AHORA sí aparece en la página");
}

function reiniciarCrear() {
  lienzoCrear.innerHTML = "";           // vaciar el lienzo
  limpiarSalida("salida-crear");
}


/* ============================================================
   append() y prepend()  (insertan DENTRO, como hijos)
   ============================================================ */

// append: el nuevo item entra como ÚLTIMO hijo (al final).
function agregarAlFinal() {
  const item = nuevoItem("append #" + (++contador));
  lienzoLista.append(item);
  mostrar("salida-lista", "lienzoLista.append(item)\n→ el item entra como ÚLTIMO hijo (al final).");
}

// prepend: el nuevo item entra como PRIMER hijo (al inicio).
function agregarAlInicio() {
  const item = nuevoItem("prepend #" + (++contador));
  lienzoLista.prepend(item);
  mostrar("salida-lista", "lienzoLista.prepend(item)\n→ el item entra como PRIMER hijo (al inicio).");
}

// Estado inicial: dos items de referencia (A y B).
function reiniciarLista() {
  lienzoLista.innerHTML = "";
  lienzoLista.append(nuevoItem("A", ""));
  lienzoLista.append(nuevoItem("B", ""));
  limpiarSalida("salida-lista");
}


/* ============================================================
   before() y after()  (insertan AL LADO, como hermanos)
   ============================================================ */

// before: el nuevo item se coloca como hermano, JUSTO ANTES del ancla.
function insertarAntes() {
  const ancla = document.getElementById("item-ancla");
  ancla.before(nuevoItem("before #" + (++contador)));
  mostrar("salida-ba", "ancla.before(item)\n→ se coloca como HERMANO, justo antes del ancla (no dentro).");
}

// after: el nuevo item se coloca como hermano, JUSTO DESPUÉS del ancla.
function insertarDespues() {
  const ancla = document.getElementById("item-ancla");
  ancla.after(nuevoItem("after #" + (++contador)));
  mostrar("salida-ba", "ancla.after(item)\n→ se coloca como HERMANO, justo después del ancla (no dentro).");
}

// Estado inicial: solo el ancla (item naranja de referencia).
function reiniciarBeforeAfter() {
  lienzoBA.innerHTML = "";
  const ancla = nuevoItem("ANCLA (referencia)", "ancla");
  ancla.id = "item-ancla";              // le damos id para encontrarlo luego
  lienzoBA.append(ancla);
  limpiarSalida("salida-ba");
}


/* ============================================================
   replaceWith()  (sustituir un nodo por otro)
   ============================================================ */

function reemplazar() {
  const viejo = document.getElementById("item-replace");
  const nuevo = nuevoItem("soy el REEMPLAZO");
  nuevo.id = "item-replace";            // hereda el id para poder repetir la demo
  viejo.replaceWith(nuevo);             // saca al viejo y deja al nuevo en su lugar exacto
  mostrar("salida-replace", "viejo.replaceWith(nuevo)\n→ el nodo viejo sale del árbol y el nuevo ocupa su lugar.");
}

function reiniciarReemplazo() {
  lienzoReplace.innerHTML = "";
  const item = nuevoItem("nodo original", "");
  item.id = "item-replace";
  lienzoReplace.append(item);
  limpiarSalida("salida-replace");
}


/* ============================================================
   remove()  (borrar un nodo, sin necesitar al padre)
   ============================================================ */

function poblarRemovibles() {
  lienzoRemove.innerHTML = "";
  // Creamos varios items; cada uno se borra A SÍ MISMO al hacerle clic.
  for (let i = 1; i <= 4; i++) {
    const item = nuevoItem("Quítame " + i);
    item.style.cursor = "pointer";
    item.addEventListener("click", function () {
      item.remove();                    // el propio nodo se quita; no tocamos al padre
      mostrar("salida-remove", "item.remove()\n→ el elemento se borra solo. Quedan " +
        lienzoRemove.children.length + " items.");
    });
    lienzoRemove.append(item);
  }
  limpiarSalida("salida-remove");
}


/* ============================================================
   MOVER nodos  (un nodo solo puede estar en un sitio)
   ============================================================ */

// Al hacer append de un nodo que YA está en el DOM, se MUEVE (no se copia).
function moverAB() {
  const item = document.getElementById("item-movible");
  zonaB.append(item);                   // estaba en A → ahora está en B (desaparece de A)
  mostrar("salida-mover", "zonaB.append(item)\n→ el item ya existía, así que se MOVIÓ de A a B.\n" +
    "Un mismo nodo no puede estar en dos lugares: por eso desaparece de A.");
}

function moverBA() {
  const item = document.getElementById("item-movible");
  zonaA.append(item);                   // y de vuelta a A
  mostrar("salida-mover", "zonaA.append(item)\n→ el mismo nodo vuelve a A. Sigue siendo el de siempre, solo cambió de sitio.");
}

// Estado inicial: la caja viajera empieza en la zona A.
function reiniciarMover() {
  zonaA.innerHTML = "";
  zonaB.innerHTML = "";
  const item = nuevoItem("caja viajera");
  item.id = "item-movible";
  zonaA.append(item);
  limpiarSalida("salida-mover");
}


/* ============================================================
   DocumentFragment  (juntar muchos nodos e insertarlos de una vez)
   ============================================================ */

function agregarConFragment() {
  // El fragment es un contenedor temporal en memoria; NO está en la página.
  const frag = document.createDocumentFragment();

  for (let i = 1; i <= 5; i++) {
    frag.append(nuevoItem("frag " + i));  // se van acumulando en el fragment
  }

  // Una SOLA inserción en el documento real. Solo entran los HIJOS del fragment:
  // no queda ningún envoltorio, y el fragment se vacía tras insertarse.
  lienzoFrag.append(frag);

  mostrar("salida-frag",
    "1) frag = createDocumentFragment()  → contenedor en memoria (fuera de la página)\n" +
    "2) frag.append(item) x5             → metimos 5 nodos ahí dentro\n" +
    "3) lienzoFrag.append(frag)          → UNA sola inserción; entran solo sus 5 hijos\n\n" +
    "El fragment no deja envoltorio y queda vacío. Hijos en el lienzo: " + lienzoFrag.children.length);
}

function reiniciarFragment() {
  lienzoFrag.innerHTML = "";
  limpiarSalida("salida-frag");
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


/* ============================================================
   ESTADO INICIAL
   El <script> está al final del body, así que el DOM ya existe.
   Dejamos cada demo en su punto de partida.
   ============================================================ */
reiniciarLista();
reiniciarBeforeAfter();
reiniciarReemplazo();
poblarRemovibles();
reiniciarMover();
