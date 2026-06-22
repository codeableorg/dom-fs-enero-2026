# 🏋️ Ejercicio · Mini catálogo (Temas 1 a 4)

Este ejercicio integra los **4 primeros temas** del curso en un mini-proyecto: un
pequeño **catálogo de productos**. El objetivo es escribir el JavaScript que le da vida.

> Temas:
> 1. **DOM y BOM** — leer información del navegador (`window`, `navigator`, `location`).
> 2. **Buscar elementos** — `getElementById`, `querySelector`, `getElementsByClassName`.
> 3. **Navegar entre elementos** — `parentElement`, `children`, hermanos.
> 4. **Propiedades de un nodo** — `textContent` vs `innerHTML`, `nodeType`, `nodeName`.

## Cómo trabajar

1. El archivo `ejercicio.html` se abre en el navegador (doble clic o Live Server).
2. El código se completa en `ejercicio.js`, en las funciones marcadas con `// TODO:`.
3. Cada botón imprime su resultado en la consola verde (`.salida`) y en la consola del
   navegador (tecla **F12**).
4. El archivo `solucion.js` contiene una solución posible para comparar.

---

## Reto 1 · DOM y BOM → `mostrarEntorno()`

La función `mostrarEntorno()` llena el "panel de entorno" con datos reales del navegador.
Debe leer:

- `window.innerWidth` y `window.innerHeight` (tamaño de la ventana en píxeles).
- `navigator.language` (idioma) y `navigator.platform` (sistema).
- `location.pathname` (la ruta del archivo actual).

Cada valor se escribe dentro de su `<span>` con `getElementById` + `.textContent`.

**Resuelto cuando:** el panel deja de mostrar `—` y aparecen los valores reales del navegador.

## Reto 2 · Buscar elementos → `contarProductos()` y `buscar()`

- `contarProductos()`: cuenta cuántos productos hay (`.producto`) y cuántos están en oferta
  (`.destacado`). Pista: `querySelectorAll(".producto")` expone `.length`.
- `buscar()`: lee el texto del input `#buscador` y resalta los productos cuyo nombre lo
  contenga, agregándoles la clase `resaltado-verde` (ya existe en `styles.css`).

**Resuelto cuando:** el contador da `5 productos, 2 en oferta` y al buscar "tecla" se resalta el teclado.

## Reto 3 · Navegar entre elementos → `inspeccionar(card)`

Al hacer clic en una tarjeta, el elemento `.producto` llega en el parámetro `card`. Desde ahí,
la función muestra su "vecindario" en el DOM:

- `card.parentElement.id` → el padre del producto.
- `card.parentElement.children.length` → cuántos hijos tiene el padre.
- `card.previousElementSibling` y `card.nextElementSibling` → los hermanos.

El primer producto no tiene `previousElementSibling` (devuelve `null`): es el primero de la lista.

**Resuelto cuando:** al hacer clic en un producto se ven su padre, sus hermanos y el total de hijos.

## Reto 4 · Propiedades de un nodo → `leerContenido()` y `renombrarSeguro()`

- `leerContenido()`: sobre el nombre de la Laptop (`#prod-laptop .nombre`), muestra la diferencia
  entre `.textContent` (solo el texto) y `.innerHTML` (el texto con la etiqueta `<span>` de la
  insignia incluida). También muestra su `nodeType` (vale `1`) y su `nodeName`.
- `renombrarSeguro(nuevo)`: cambia el nombre del Mouse (`#prod-mouse .nombre`) usando
  `.textContent` (no `.innerHTML`).

`textContent` trata el valor como texto plano. Si el texto proviniera de un usuario, `innerHTML`
permitiría inyectar etiquetas `<script>` (ataque XSS); por eso `.textContent` es la opción segura.

**Resuelto cuando:** `innerHTML` incluye `<span class="insignia">`, `textContent` no, y el nombre
del Mouse cambia con el valor escrito.

---

### Notas

- Existe un helper `mostrar(zona, texto)` que escribe en la `.salida` y en la consola.
- Conviene buscar cada elemento una sola vez y guardarlo en una variable.
- Un resultado `null` no es un error: significa que ese elemento no existe y debe contemplarse.
