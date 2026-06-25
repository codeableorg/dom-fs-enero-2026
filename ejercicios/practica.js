/* ============================================================
   Motor compartido de las prácticas interactivas del curso DOM.

   Cada tema (HTML) define window.RETOS con sus validadores y este script
   arma los editores y la validación. Contrato de un reto:

     window.RETOS = {
       "id-del-reto": {
         preparar: function () { ... },        // opcional: deja la vista previa
                                               //   en su estado inicial (se llama
                                               //   antes de cada comprobación)
         validar: function (valor, H) {        // valor = lo que evaluó el código
           return valor === esperado            //   del alumno (última expresión)
             ? H.ok("mensaje")                 // H.ok / H.fail / H.describir
             : H.fail("mensaje");
         }
       }
     };

   El alumno NO necesita escribir return: se evalúa la última expresión.
   La validación compara el resultado REAL (valor evaluado o estado del DOM).
   ============================================================ */
(function () {
  "use strict";

  function ok(msg) { return { ok: true, mensaje: "✅ Correcto. " + msg }; }
  function fail(msg) { return { ok: false, mensaje: "❌ Incorrecto. " + msg }; }
  function describir(v) { try { return JSON.stringify(v); } catch (e) { return String(v); } }
  var HELP = { ok: ok, fail: fail, describir: describir };

  // Evalúa el código del alumno y captura el valor de la última expresión.
  // No hace falta 'return'. Si igual lo usa, eval lanza SyntaxError y se
  // reintenta con Function.
  // ponytail: no es un sandbox de seguridad, es práctica local en el navegador.
  function ejecutar(codigo) {
    try {
      return (0, eval)(codigo);
    } catch (e) {
      if (e instanceof SyntaxError) { return (new Function(codigo))(); }
      throw e;
    }
  }

  var RETOS = window.RETOS || {};

  var cards = document.querySelectorAll(".reto");
  for (var i = 0; i < cards.length; i++) { prepararReto(cards[i]); }

  function prepararReto(card) {
    var id = card.getAttribute("data-reto");
    var reto = RETOS[id] || {};
    var ta = card.querySelector(".codigo");
    var original = ta.value;
    var resultadoDiv = card.querySelector(".resultado");
    var editor = null;

    if (window.CodeMirror) {
      editor = CodeMirror.fromTextArea(ta, {
        mode: "javascript",
        lineNumbers: true,
        tabSize: 2,
        indentUnit: 2,
        theme: "material-darker"
      });
    }

    function leer() { return editor ? editor.getValue() : ta.value; }
    function escribir(v) { if (editor) { editor.setValue(v); } else { ta.value = v; } }

    if (reto.preparar) { reto.preparar(); } // estado inicial de la vista previa

    card.querySelector('[data-accion="comprobar"]').addEventListener("click", function () {
      if (reto.preparar) { reto.preparar(); }
      var res;
      try {
        var valor = ejecutar(leer());
        res = reto.validar ? reto.validar(valor, HELP) : fail("Este reto no tiene validador.");
      } catch (e) {
        res = fail("El código tiene un error: " + e.message);
      }
      resultadoDiv.textContent = res.mensaje;
      resultadoDiv.className = "resultado " + (res.ok ? "ok" : "fail");
    });

    card.querySelector('[data-accion="reiniciar"]').addEventListener("click", function () {
      escribir(original);
      if (reto.preparar) { reto.preparar(); }
      resultadoDiv.textContent = "";
      resultadoDiv.className = "resultado";
    });

    var btnPista = card.querySelector('[data-accion="pista"]');
    if (btnPista) {
      btnPista.addEventListener("click", function () {
        var pista = card.querySelector(".pista-texto");
        pista.hidden = !pista.hidden;
      });
    }
  }
})();
