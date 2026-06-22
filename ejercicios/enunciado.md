# 🏋️ Ejercicio · Mini catálogo (Temas 1 a 4)

Este ejercicio integra los **4 primeros temas** del curso en UN solo mini-proyecto: un
pequeño **catálogo de productos**. Vas a escribir el JavaScript que le da vida.

> Temas que practicás:
> 1. **DOM y BOM** — leer información del navegador (`window`, `navigator`, `location`).
> 2. **Buscar elementos** — `getElementById`, `querySelector`, `getElementsByClassName`.
> 3. **Navegar entre elementos** — `parentElement`, `children`, hermanos.
> 4. **Propiedades de un nodo** — `textContent` vs `innerHTML`, `nodeType`, `nodeName`.

## Cómo trabajar

1. Abrí **`ejercicio.html`** en el navegador (doble clic o Live Server).
2. Editá **`ejercicio.js`**: vas a ver funciones con un comentario `// TODO:`. Esa es tu parte.
3. Probá cada botón. El resultado aparece en su consola verde (`.salida`) y también en la
   consola del navegador (tecla **F12**).
4. ¿Te trabaste? Compará con **`solucion.html`** / **`solucion.js`** (una solución posible).

> ⚠️ **No empieces por la solución.** El objetivo es que VOS resuelvas. Mirar la respuesta
> antes de intentarlo es como mirar el resultado de un partido antes de jugarlo: no aprendés.

---

## Reto 1 · DOM y BOM → `mostrarEntorno()`

Llená el "panel de entorno" con datos reales del navegador. Tenés que leer:

- `window.innerWidth` y `window.innerHeight` (tamaño de la ventana en píxeles).
- `navigator.language` (idioma) y `navigator.platform` (sistema).
- `location.pathname` (la ruta del archivo que estás viendo).

Y escribir cada valor dentro del `<span>` correspondiente usando `getElementById` + `.textContent`.

**Listo cuando:** el panel deja de mostrar `—` y aparecen los valores de TU navegador.

## Reto 2 · Buscar elementos → `contarProductos()` y `buscar()`

- `contarProductos()`: contá cuántos productos hay (`.producto`) y cuántos están en oferta
  (`.destacado`). Pista: `querySelectorAll(".producto")` tiene `.length`.
- `buscar()`: leé el texto del input `#buscador` y resaltá los productos cuyo nombre lo
  contenga, agregándoles la clase `resaltado-verde` (ya existe en `styles.css`).

**Listo cuando:** el contador da `5 productos, 2 en oferta` y al buscar "tecla" se resalta el teclado.

## Reto 3 · Navegar entre elementos → `inspeccionar(card)`

Cuando hacés clic en una tarjeta, ya te pasamos el elemento `.producto` clickeado en `card`.
Desde ahí, mostrá su "vecindario" en el DOM:

- `card.parentElement.id` → ¿quién es su padre?
- `card.parentElement.children.length` → ¿cuántos hijos tiene el padre?
- `card.previousElementSibling` y `card.nextElementSibling` → ¿quiénes son sus hermanos?

> Acordate: el primer producto **no tiene** `previousElementSibling` (devuelve `null`).
> ¡Es normal! Es el primero de la lista.

**Listo cuando:** al clickear un producto ves su padre, sus hermanos y el total de hijos.

## Reto 4 · Propiedades de un nodo → `leerContenido()` y `renombrarSeguro()`

- `leerContenido()`: sobre el nombre de la Laptop (`#prod-laptop .nombre`), mostrá la diferencia
  entre `.textContent` (solo el texto) y `.innerHTML` (el texto **con** la etiqueta `<span>` de la
  insignia adentro). Mostrá también su `nodeType` (debe dar `1`) y su `nodeName`.
- `renombrarSeguro(nuevo)`: cambiá el nombre del Mouse (`#prod-mouse .nombre`) usando
  **`.textContent`** (no `.innerHTML`).

> 🔐 **¿Por qué `textContent` y no `innerHTML`?** Si el texto nuevo viniera de un usuario y usaras
> `innerHTML`, podría inyectar etiquetas `<script>` (ataque XSS). `textContent` trata todo como
> texto plano: seguro por defecto.

**Listo cuando:** ves que `innerHTML` incluye `<span class="insignia">` y `textContent` no, y el
nombre del Mouse cambia al escribir uno nuevo.

---

### Pistas generales

- Ya te dejamos un helper `mostrar(zona, texto)` que escribe en la `.salida` y en la consola.
- Buscá UNA vez y guardá en una variable; no busques el mismo elemento diez veces.
- Si algo da `null`, no es un error tuyo: significa "ese elemento no existe". Manejalo.
