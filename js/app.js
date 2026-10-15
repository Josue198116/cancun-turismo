/* =========================================================
   app.js - Comportamiento de Cancún Caribe Escapes
   Se carga con "defer", así que el DOM ya existe al ejecutarse.
   Parte A: JavaScript puro  |  Parte B: jQuery
   ========================================================= */

/* ---------------------------------------------------------
   PARTE A - JAVASCRIPT PURO
   --------------------------------------------------------- */

// Variables con const (no cambian) y let (cambian)
const formulario = document.getElementById("formInfo");
const alerta = document.getElementById("resultadoForm");
const selectDestino = document.getElementById("destino");
const inputPersonas = document.getElementById("personas");
const inputNoches = document.getElementById("noches");
const inputFecha = document.getElementById("fecha");
const textoTotal = document.getElementById("totalEstimado");
let totalActual = 0; // último total calculado

/* ---- A1. Fecha mínima: no se puede elegir una fecha pasada ---- */
const hoy = new Date();
const hoyISO = hoy.toISOString().split("T")[0]; // formato AAAA-MM-DD
inputFecha.setAttribute("min", hoyISO);

/* ---- A2. Estimado en vivo (eventos change e input) ---- */
function calcularEstimado() {
  const opcion = selectDestino.options[selectDestino.selectedIndex];
  const precioBase = Number(opcion.dataset.precio); // precio por persona por noche (ejemplo)
  const personas = Number(inputPersonas.value);
  const noches = Number(inputNoches.value);

  // Condicional if/else: si faltan datos, se pide completar
  if (!precioBase || personas < 1 || noches < 1) {
    textoTotal.textContent = "elige una oferta";
    totalActual = 0;
    return;
  }

  let total = precioBase * personas * noches;

  // Operador ternario: descuento de 10% para grupos de 4 o más
  const descuento = personas >= 4 ? 0.1 : 0;
  total = total - total * descuento;
  totalActual = total;

  const texto = total.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
  textoTotal.textContent = descuento > 0 ? `${texto} (incluye 10% por grupo)` : texto;
}

selectDestino.addEventListener("change", calcularEstimado);
inputPersonas.addEventListener("input", calcularEstimado);
inputNoches.addEventListener("input", calcularEstimado);

/* ---- A3. Contador de caracteres del comentario (evento input) ---- */
const mensaje = document.getElementById("mensaje");
const contadorMensaje = document.getElementById("contadorMensaje");
mensaje.addEventListener("input", () => {
  contadorMensaje.textContent = mensaje.value.length;
});

/* ---- A4. Validación y respuesta al enviar (evento submit) ---- */
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); // no recargar la página

  // Validación nativa de HTML5 (required, type, min, max, pattern)
  if (!formulario.checkValidity()) {
    formulario.classList.add("was-validated"); // Bootstrap muestra los mensajes de error
    mostrarAlerta("danger", "<strong>Revisa el formulario.</strong> Hay campos obligatorios sin completar o con datos incorrectos.");
    return;
  }

  // Validación adicional con JavaScript: la fecha no puede ser pasada
  if (inputFecha.value < hoyISO) {
    inputFecha.classList.add("is-invalid");
    mostrarAlerta("danger", "La fecha de llegada no puede ser anterior a hoy.");
    return;
  }
  inputFecha.classList.remove("is-invalid");

  // Resumen de datos (sin backend: NO se envía nada a un servidor)
  const datos = new FormData(formulario);
  const resumen = `
    <strong>Solicitud lista, ${datos.get("nombre")}.</strong>
    <ul class="mb-0 mt-2">
      <li>Oferta: ${selectDestino.options[selectDestino.selectedIndex].text}</li>
      <li>Llegada: ${datos.get("fecha")} &middot; ${datos.get("noches")} noches &middot; ${datos.get("personas")} personas (${datos.get("tipo")})</li>
      <li>Estimado de ejemplo: ${textoTotal.textContent}</li>
    </ul>
    <small class="d-block mt-2">Este es solo un resumen en tu navegador. Este sitio de práctica no tiene servidor, así que tu información no se envió a ningún lado.</small>`;

  mostrarAlerta("success", resumen);
  formulario.reset();
  formulario.classList.remove("was-validated");
  contadorMensaje.textContent = "0";
  calcularEstimado();
});

// Muestra/oculta la alerta Bootstrap cambiando clases CSS
function mostrarAlerta(tipo, html) {
  alerta.className = `alert alert-${tipo}`; // quita d-none y aplica el color
  alerta.innerHTML = html;
  alerta.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ---- A5. Modal de galería: carga la foto pulsada ---- */
const modalFoto = document.getElementById("modalFoto");
modalFoto.addEventListener("show.bs.modal", (evento) => {
  const boton = evento.relatedTarget; // botón que abrió el modal
  document.getElementById("modalFotoImg").src = boton.dataset.src;
  document.getElementById("modalFotoImg").alt = boton.dataset.alt;
  document.getElementById("modalFotoTitulo").textContent = boton.dataset.titulo;
});

/* ---- A6. Cambio de °C a °F (evento change + condicional) ---- */
const switchUnidad = document.getElementById("switchUnidad");
switchUnidad.addEventListener("change", () => {
  document.querySelectorAll(".grados").forEach((el) => {
    const celsius = Number(el.dataset.c);
    if (switchUnidad.checked) {
      el.textContent = `${Math.round(celsius * 9 / 5 + 32)} °F`;
    } else {
      el.textContent = `${celsius} °C`;
    }
  });
});

/* ---------------------------------------------------------
   PARTE B - jQuery (uso explícito)
   --------------------------------------------------------- */
$(function () {

  // B1. Filtro de ofertas: selección, eventos, clases y animación con jQuery
  $(".filtro-btn").on("click", function () {
    const filtro = $(this).data("filtro");

    // Cambiar el botón activo (modificación de clases)
    $(".filtro-btn").removeClass("active btn-primary").addClass("btn-outline-primary");
    $(this).addClass("active btn-primary").removeClass("btn-outline-primary");

    // Mostrar u ocultar tarjetas con animación
    if (filtro === "todos") {
      $(".oferta").stop(true, true).fadeIn(250);
    } else {
      $(".oferta").each(function () {
        if ($(this).data("categoria") === filtro) {
          $(this).stop(true, true).fadeIn(250);
        } else {
          $(this).stop(true, true).fadeOut(200);
        }
      });
    }

    // Actualizar el contador (modifica el contenido)
    const visibles = filtro === "todos" ? $(".oferta").length : $(`.oferta[data-categoria="${filtro}"]`).length;
    $("#contador-ofertas").text(`Mostrando ${visibles} ${visibles === 1 ? "oferta" : "ofertas"}.`);
  });

  // B2. Botón "Cotizar": preselecciona la oferta en el formulario
  $(".btn-cotizar").on("click", function () {
    const valor = $(this).data("destino");
    $("#destino").val(valor).trigger("change"); // dispara el cálculo del estimado

    // Resalta brevemente la tarjeta elegida
    $(".oferta").removeClass("resaltada");
    $(this).closest(".oferta").addClass("resaltada");
  });

  // B3. Mensaje de bienvenida en el formulario al cambiar el tipo de viaje
  $("input[name='tipo']").on("change", function () {
    const tipo = $(this).val();
    if (tipo === "Familia") {
      $("#personas").val(4).trigger("input");
    } else if (tipo === "Pareja") {
      $("#personas").val(2).trigger("input");
    }
  });

  // B4. Quitar el estado de error al escribir de nuevo
  $("#formInfo .form-control, #formInfo .form-select").on("input change", function () {
    $(this).removeClass("is-invalid");
  });

  // B5. Cerrar el menú colapsable al elegir un enlace (móvil)
  $("#menuPrincipal .nav-link").on("click", function () {
    // Solo si el menú está abierto (modo móvil), lo cerramos con la API de Bootstrap 5
    if ($("#menuPrincipal").hasClass("show")) {
      bootstrap.Collapse.getOrCreateInstance("#menuPrincipal").hide();
    }
  });

  // Contador inicial
  $("#contador-ofertas").text(`Mostrando ${$(".oferta").length} ofertas.`);
});


/* ---------------------------------------------------------
   TEMA CLARO / OSCURO
   Se guarda la elección en localStorage y se aplica con el
   atributo data-bs-theme de Bootstrap 5.3.
   --------------------------------------------------------- */
(function () {
  const raiz = document.documentElement;
  const boton = document.getElementById("btnTema");
  if (!boton) return;

  function aplicarTema(tema) {
    raiz.setAttribute("data-bs-theme", tema);
    const oscuro = tema === "dark";
    boton.textContent = oscuro ? "☀️ Claro" : "🌙 Oscuro";
    boton.setAttribute("aria-pressed", String(oscuro));
    boton.setAttribute("aria-label", oscuro ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
  }

  aplicarTema(raiz.getAttribute("data-bs-theme") || "light");

  boton.addEventListener("click", function () {
    const nuevo = raiz.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
    aplicarTema(nuevo);
    try { localStorage.setItem("tema", nuevo); } catch (e) {}
  });
})();
