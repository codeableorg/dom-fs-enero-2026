# 🏋️ Ejercicio · Tablero de tareas (Temas 5 a 7)

Este ejercicio integra los **temas 5, 6 y 7** en un mini-proyecto: un pequeño
**tablero de tareas** (estilo lista de pendientes). Mientras los temas 1-4 trataban de
*leer* el DOM, estos tratan de **modificarlo y construirlo**.

> Temas:
> 5. **Atributos y propiedades** — `dataset`, `getAttribute`/`setAttribute`, `classList`.
> 6. **Crear e insertar nodos** — `createElement`, `append`, `remove`.
> 7. **Estilos y clases** — `classList.toggle`, `style`, `getComputedStyle`.

## Cómo trabajar

1. El archivo `ejercicio.html` se abre en el navegador (doble clic o Live Server).
2. El código se completa en `ejercicio.js`, en las funciones marcadas con `// TODO:`.
3. Un clic sobre una tarea la selecciona (se pinta de azul). Casi todos los retos actúan
   sobre la tarea seleccionada.
4. Cada botón imprime su resultado en la consola verde (`.salida`) y en la del navegador (**F12**).
5. El archivo `solucion.js` contiene una solución posible para comparar.

---

## Reto 5 · Atributos y propiedades → `verAtributos()` y `cambiarPrioridad()`

- `verAtributos()`: sobre la tarea seleccionada, muestra sus `data-*` con `dataset`
  (`dataset.id`, `dataset.prioridad`) y comprueba que `getAttribute("data-prioridad")`
  devuelve lo mismo que `dataset.prioridad`.
- `cambiarPrioridad()`: alterna `dataset.prioridad` entre `"alta"` y `"normal"`. El CSS
  reacciona solo: una tarea con `data-prioridad="alta"` se pinta de naranja y muestra un 🔥.
  El atributo cambia cómo se ve la tarea.

**Resuelto cuando:** al cambiar la prioridad, la tarea se vuelve naranja (o regresa a normal).

## Reto 6 · Crear e insertar nodos → `agregarTarea()` y `borrarSeleccionada()`

- `agregarTarea()`: lee el texto de `#nueva-tarea`, crea una tarea nueva con
  `document.createElement`, le asigna su clase y su contenido, y la inserta en `#tablero`
  con `append`. El patrón es: 1) crear → 2) configurar → 3) insertar.
- `borrarSeleccionada()`: quita la tarea seleccionada del DOM con `.remove()`.

Una tarea recién creada con `createElement` no se ve hasta que se inserta con `append`:
nace "suelta" en memoria.

**Resuelto cuando:** un texto nuevo genera una tarea al final, y la tarea seleccionada se puede borrar.

## Reto 7 · Estilos y clases → `marcarHecha()` y `leerEstiloReal()`

- `marcarHecha()`: sobre la tarea seleccionada, usa `classList.toggle("hecha")` para
  tacharla o destacharla. La clase `hecha` ya está definida (tachado + verde).
- `leerEstiloReal()`: con `getComputedStyle(tarea)` lee el color de fondo real que el
  navegador aplicó (el calculado, no el inline). Lo muestra.

`classList.toggle` devuelve `true` si la clase queda puesta y `false` si queda quitada.
`getComputedStyle` es solo lectura: sirve para consultar, no para asignar.

**Resuelto cuando:** una tarea se tacha o destacha al alternar, y se ve su color de fondo en `rgb(...)`.

---

### Notas

- Ya están provistos: el helper `mostrar(idSalida, mensaje)`, el helper `exigirSeleccion()`
  (devuelve la tarea seleccionada o avisa cuando falta elegir una) y el listener que
  selecciona la tarea con un clic.
- `data-precio-final` (con guiones) se lee como `dataset.precioFinal` (camelCase).
- Si `dataset.algo` no existe, devuelve `undefined`: no es un error, es que ese atributo no está.
