/* ============================================================
   LECCIÓN 2 · Navegar entre elementos
   ------------------------------------------------------------
   Aprenderemos a "caminar" por el árbol del DOM saltando de un
   elemento a su padre, sus hijos o sus hermanos.
   ============================================================ */

// Elementos de la interfaz que vamos a usar.
const raiz          = document.getElementById("raiz");           // contenedor del árbol
const etiquetaActual = document.getElementById("actual");        // texto "Elemento seleccionado: ..."
const salidaNav     = document.getElementById("salida-nav");     // consola de la demo
const salidaComparar = document.getElementById("salida-comparar");

// Variable que recuerda CUÁL elemento está seleccionado ahora mismo.
let seleccionado = null;


/* ------------------------------------------------------------
   1) SELECCIONAR un elemento al hacer clic
   Usamos "delegación de eventos": un solo listener en la raíz
   que atiende los clics de todos los nodos de su interior.
   ------------------------------------------------------------ */
raiz.addEventListener("click", function (evento) {
  // evento.target es el elemento exacto donde se hizo clic.
  // .closest(".nodo") sube hasta el ".nodo" más cercano (incluido él mismo).
  const nodo = evento.target.closest(".nodo");
  if (nodo) {
    seleccionar(nodo);
  }
});

// Marca un elemento como "seleccionado" (lo pinta de azul).
function seleccionar(elemento) {
  // Primero quitamos cualquier resaltado anterior de todo el árbol.
  limpiarResaltados();
  // Guardamos la referencia y lo pintamos de azul.
  seleccionado = elemento;
  elemento.classList.add("resaltado-azul");
  // Mostramos su nombre en pantalla (lo leemos del atributo data-nombre).
  etiquetaActual.textContent = elemento.dataset.nombre;
}


/* ------------------------------------------------------------
   2) NAVEGAR a un familiar del elemento seleccionado
   Recibe el nombre de la propiedad ("parentElement", etc.)
   y la usa para saltar al elemento relacionado.
   ------------------------------------------------------------ */
function irA(propiedad) {
  // Si no hay nada seleccionado, avisamos y salimos.
  if (!seleccionado) {
    salidaNav.textContent = "👆 Primero haz clic en una caja para seleccionarla.";
    return;
  }

  // Aquí ocurre la magia: leemos la propiedad pedida del elemento actual.
  // Por ejemplo: seleccionado["parentElement"] es lo mismo que seleccionado.parentElement
  const destino = seleccionado[propiedad];

  // Muchas de estas propiedades devuelven null cuando no existe el familiar
  // (por ejemplo, el primer hijo de algo que no tiene hijos).
  if (!destino || !destino.dataset || destino.dataset.nombre === undefined) {
    salidaNav.textContent =
      "seleccionado." + propiedad + " → null\n\n" +
      "No existe ese familiar para «" + seleccionado.dataset.nombre + "». ¡Es normal!\n" +
      "Por eso siempre conviene comprobar si el resultado es null antes de usarlo.";
    return;
  }

  // Si encontramos el elemento, lo resaltamos en verde un instante…
  limpiarResaltados();
  destino.classList.add("resaltado-verde");
  salidaNav.textContent =
    "seleccionado." + propiedad + "\n" +
    "Desde:    " + seleccionado.dataset.nombre + "\n" +
    "Llegaste: " + destino.dataset.nombre;

  // …y después de un momento lo convertimos en el nuevo seleccionado (azul),
  // así puedes encadenar saltos y recorrer todo el árbol.
  setTimeout(function () {
    seleccionar(destino);
  }, 700);
}


/* ------------------------------------------------------------
   3) LISTAR los hijos del elemento seleccionado (.children)
   ------------------------------------------------------------ */
function listarHijos() {
  if (!seleccionado) {
    salidaNav.textContent = "👆 Primero selecciona una caja.";
    return;
  }

  // .children es una colección (parecida a un array) de los elementos hijos.
  const hijos = seleccionado.children;

  if (hijos.length === 0) {
    salidaNav.textContent =
      "«" + seleccionado.dataset.nombre + "».children → (vacío)\n" +
      "Este elemento no tiene elementos hijos.";
    return;
  }

  // Recorremos la colección y juntamos los nombres de cada hijo.
  let texto = "«" + seleccionado.dataset.nombre + "».children tiene " + hijos.length + " hijo(s):\n";
  for (let i = 0; i < hijos.length; i++) {
    texto += "  [" + i + "] " + hijos[i].dataset.nombre + "\n";
  }
  salidaNav.textContent = texto;
}


/* ------------------------------------------------------------
   4) COMPARAR children vs childNodes (nodos de texto)
   Demuestra por qué preferimos las versiones "...Element".
   ------------------------------------------------------------ */
function compararNodos() {
  // Tomamos el primer grupo del árbol (el de "Cítricos").
  const grupo = raiz.firstElementChild; // saltamos texto y vamos al primer ELEMENTO

  const texto =
    "Mirando el grupo: " + grupo.dataset.nombre + "\n\n" +
    "grupo.children.length   → " + grupo.children.length +
    "   (solo las frutas: elementos reales)\n" +
    "grupo.childNodes.length → " + grupo.childNodes.length +
    "   (frutas + nodos de texto invisibles)\n\n" +
    "Los espacios y saltos de línea del HTML cuentan como nodos de texto.\n" +
    "Por eso childNodes da un número mayor. Para trabajar con etiquetas,\n" +
    "usa SIEMPRE children, firstElementChild, nextElementSibling, etc.";

  salidaComparar.textContent = texto;
  console.log(texto);
}


/* ------------------------------------------------------------
   AYUDANTES
   ------------------------------------------------------------ */

// Quita los colores de resaltado de todos los nodos del árbol.
function limpiarResaltados() {
  const todos = raiz.querySelectorAll(".nodo");
  todos.forEach(function (nodo) {
    nodo.classList.remove("resaltado-azul", "resaltado-verde");
  });
}

// Botón "Reiniciar": deselecciona todo y limpia la pantalla.
function reiniciar() {
  limpiarResaltados();
  seleccionado = null;
  etiquetaActual.textContent = "(ninguno: haz clic en una caja)";
  salidaNav.textContent = "";
}
