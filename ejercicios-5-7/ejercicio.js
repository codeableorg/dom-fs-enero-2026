/* ============================================================
   EJERCICIO · Tablero de tareas (Temas 5 a 7)
   Completar las funciones marcadas con // TODO.
   Los helpers y el listener de selección ya están provistos.
   La consigna completa está en enunciado.md
   ============================================================ */

// ---------- Helpers compartidos (ya provistos) ----------
function mostrar(idSalida, mensaje) {
  document.getElementById(idSalida).textContent = mensaje;
  console.log(mensaje);
}

// Próximo data-id para las tareas nuevas (se usa en el Reto 6).
let proximoId = 4;

// ---------- Selección de tarea (ya provista) ----------
// Al hacer clic en una tarea, queda guardada en `tareaSeleccionada`.
let tareaSeleccionada = null;
const tablero = document.getElementById("tablero");

tablero.addEventListener("click", function (evento) {
  const tarea = evento.target.closest(".tarea");
  if (!tarea) return;

  if (tareaSeleccionada) tareaSeleccionada.classList.remove("resaltado-azul");
  tareaSeleccionada = tarea;
  tarea.classList.add("resaltado-azul");

  mostrar("salida-seleccion",
    "Tarea seleccionada: " + tarea.querySelector(".texto").textContent.trim() +
    "  (data-id=" + tarea.dataset.id + ")");
});

// Devuelve la tarea seleccionada, o null (con aviso) si no hay ninguna.
function exigirSeleccion(idSalida) {
  if (!tareaSeleccionada || !tareaSeleccionada.isConnected) {
    mostrar(idSalida, "No hay ninguna tarea seleccionada. Un clic sobre una tarea la selecciona.");
    return null;
  }
  return tareaSeleccionada;
}


/* ============================================================
   RETO 5 · Atributos y propiedades
   ============================================================ */
function verAtributos() {
  const tarea = exigirSeleccion("salida-atributos");
  if (!tarea) return;

  // TODO: mostrar tarea.dataset.id, tarea.dataset.prioridad y comprobar que
  //       tarea.getAttribute("data-prioridad") devuelve lo mismo que dataset.prioridad.

  mostrar("salida-atributos", "Pendiente: completar verAtributos() (Reto 5).");
}

function cambiarPrioridad() {
  const tarea = exigirSeleccion("salida-atributos");
  if (!tarea) return;

  // TODO: alternar tarea.dataset.prioridad entre "alta" y "normal".
  //       El CSS reacciona solo (regla .tarea[data-prioridad="alta"]).
  //       Pista: const nueva = tarea.dataset.prioridad === "alta" ? "normal" : "alta";

  mostrar("salida-atributos", "Pendiente: completar cambiarPrioridad() (Reto 5).");
}


/* ============================================================
   RETO 6 · Crear e insertar nodos
   ============================================================ */
function agregarTarea() {
  const texto = document.getElementById("nueva-tarea").value.trim();
  if (texto === "") {
    mostrar("salida-crear", "El campo de la nueva tarea está vacío.");
    return;
  }

  // TODO: 1) crear un <article> con document.createElement
  //       2) configurar: className = "tarea", dataset.id = proximoId, dataset.prioridad = "normal",
  //          y dentro un <span class="texto"> con textContent = texto
  //       3) insertar en el tablero con tablero.append(...)
  //       Falta también incrementar proximoId y limpiar el input.

  mostrar("salida-crear", "Pendiente: completar agregarTarea() (Reto 6).");
}

function borrarSeleccionada() {
  const tarea = exigirSeleccion("salida-crear");
  if (!tarea) return;

  // TODO: quitar la tarea del DOM con tarea.remove() y poner tareaSeleccionada = null.

  mostrar("salida-crear", "Pendiente: completar borrarSeleccionada() (Reto 6).");
}


/* ============================================================
   RETO 7 · Estilos y clases
   ============================================================ */
function marcarHecha() {
  const tarea = exigirSeleccion("salida-estilos");
  if (!tarea) return;

  // TODO: usar tarea.classList.toggle("hecha") y mostrar si queda puesta o no.

  mostrar("salida-estilos", "Pendiente: completar marcarHecha() (Reto 7).");
}

function leerEstiloReal() {
  const tarea = exigirSeleccion("salida-estilos");
  if (!tarea) return;

  // TODO: con getComputedStyle(tarea) leer y mostrar su backgroundColor real (en rgb).

  mostrar("salida-estilos", "Pendiente: completar leerEstiloReal() (Reto 7).");
}
