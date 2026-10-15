# Cancún Caribe Escapes

**Temática:** Turismo y servicios (ofertas, galería, preguntas frecuentes y solicitud de información).
**Curso:** Desarrollo Web Front-End (HTML5, CSS3, JavaScript/jQuery y Bootstrap 5.3.x).

## Funciones principales
- **Portada con carrusel** de fotos y datos rápidos (clima, playas, vuelo, temporada).
- **Ofertas** en tarjetas, con filtro por tipo de viaje y estimado de precio en vivo.
- **Hoy en Cancún**: clima con interruptor °C/°F y agenda del día.
- **Carrusel de actividades del día** (en "Hoy en Cancún"): fotos con la hora y el nombre de cada actividad del resort.
- **Galería** con ventana ampliada (modal) y un **video sin sonido** ("Un paseo en yate").
- **Preguntas frecuentes** en acordeón.
- **Formulario** "Solicitar información" con validación.
- **Tema claro y oscuro**, con botón en la barra de navegación.
- **Diseño adaptable (responsive)**: se ve bien en computadora, tableta y celular.

## Cómo ejecutarlo



### Opción 1: con XAMPP (servidor local)
1. Copia la carpeta `cancun-turismo` a `C:\xampp\htdocs`.
2. Abre el **XAMPP Control Panel** y presiona **Start** en Apache.
3. Escribe en el navegador `http://localhost/cancun-turismo/`. Si tu Apache usa el puerto 89: `http://localhost:89/cancun-turismo/`.

### Opción 2: verlo en el celular (GitHub Pages)
`localhost` en un celular se refiere al propio celular, por eso no abre la página de tu computadora. Para verla en cualquier teléfono:
1. Sube la carpeta a un repositorio de GitHub (`git add .`, `git commit -m "mensaje"`, `git push`).
2. En el repositorio entra a **Settings → Pages**, elige la rama `main` y presiona **Save**.
3. Espera uno o dos minutos y abre el enlace que muestra GitHub (termina en `github.io`).

> Siempre se necesita **conexión a internet** para cargar por CDN Bootstrap 5.3.3, jQuery 3.7.1 y las fuentes de Google (Fraunces y Figtree). Las fotos y el video se cargan desde la propia carpeta.

## Estructura
```
cancun-turismo/
├── index.html          Página completa (HTML5 + componentes Bootstrap)
├── README.md           Esta documentación
├── css/
│   └── styles.css      Estilos, variables de color y tema oscuro
├── js/
│   └── app.js          JavaScript puro, jQuery y control del tema
├── img/                Fotografías optimizadas (JPG) en varios tamaños
│   └── nombre-480.jpg, nombre-960.jpg, nombre-1600.jpg ... (una por tamaño)
└── video/
    ├── paseo-yate.mp4   Video sin audio (formato MP4/H.264)
    └── poster.jpg         Imagen que se ve antes de reproducir
```

## Diseño adaptable (celular, tableta y laptop)
La página usa `<meta name="viewport">`, la rejilla de Bootstrap y media queries propias (al final de `css/styles.css`).

| Pantalla | Qué cambia |
|---|---|
| Monitor grande (1600 px o más) | El contenido se ensancha a 1400 px y la portada es más alta |
| Laptop (992 a 1599 px) | Menú completo en una línea, tarjetas de 3 en 3, galería en 3 columnas |
| Tableta (576 a 991 px) | Tarjetas de 2 en 2, galería en 2 columnas, datos rápidos en 2 columnas |
| Celular (menos de 576 px) | Menú plegable, tarjetas y galería en 1 columna, botones a todo el ancho |
| Celular horizontal | La portada ocupa toda la altura y se oculta el texto largo para que quepa |

La portada usa `svh` (altura real visible), así que no se corta con la barra del navegador del celular.

## Imágenes optimizadas
- Cada foto existe en varios tamaños (`-480`, `-960`, `-1600`...). En el HTML se usan `srcset` y `sizes`, así el **celular descarga la versión pequeña** (carga rápido y gasta pocos datos) y la **laptop descarga la grande** (se ve nítida).
- Las fotos de abajo de la página usan `loading="lazy"`: se cargan hasta que se acercan en pantalla. La primera de la portada tiene prioridad alta.
- Se guardan con tamaño (`width` y `height`) para que la página no se mueva mientras carga.
- **Si una foto se ve pixelada**, es porque la original es pequeña. Una foto no gana detalle al agrandarla. Para la portada usa originales de **1920 px de ancho o más**, y para tarjetas de 960 px o más.
- **Para agregar una foto nueva:** guárdala en `img/` como `nombre-480.jpg`, `nombre-960.jpg` y `nombre-1600.jpg` (JPG, calidad 80 en cualquier editor o en squoosh.app) y usa en el HTML el mismo `srcset` que las demás.
- **Sitios gratuitos de fotos de buena calidad:** Unsplash, Pexels y Pixabay (revisa su licencia). Busca "Cancun beach", "Caribbean sea" o "Tulum".

## Tema claro y oscuro
- **Cómo funciona:** el botón de la barra (`#btnTema`) cambia el atributo `data-bs-theme` del elemento `<html>` entre `light` y `dark`. Bootstrap 5.3 adapta sus componentes (tarjetas, formulario, modal, acordeón) automáticamente.
- **Colores propios:** en `css/styles.css` hay variables que cambian con el tema: `--fondo`, `--fondo-alt`, `--superficie`, `--titulo` y `--texto`. Los valores del tema oscuro están en el bloque `[data-bs-theme="dark"]`.
- **Se recuerda la elección:** se guarda en `localStorage` con la clave `tema`. Si el visitante no ha elegido, se usa el tema de su sistema (`prefers-color-scheme`).
- **Sin parpadeo:** un pequeño script en el `<head>` aplica el tema guardado antes de que se pinte la página.
- **Código del botón:** al final de `js/app.js`.

## Video
- Etiqueta `<video>` con `autoplay muted loop playsinline controls`: empieza solo, sin sonido, se repite y no abre pantalla completa automáticamente en iPhone.
- El archivo no tiene pista de audio y pesa cerca de 0.5 MB para cargar rápido con datos móviles.
- Algunos navegadores bloquean la reproducción automática; en ese caso se usa el botón de play de los controles.

## Cómo modificar el contenido
- **Cambiar una foto:** reemplaza el archivo en `img/` conservando el nombre, o cambia la ruta en `index.html`. Usa imágenes de **al menos 1600 px de ancho** para la portada; las más pequeñas se ven pixeladas al estirarse.
- **Cambiar el video:** reemplaza `video/paseo-yate.mp4` y `video/poster.jpg`. Para quitar el audio y comprimirlo: `ffmpeg -i entrada.mp4 -an -c:v libx264 -crf 27 -movflags +faststart paseo-yate.mp4`.
- **Agregar una actividad al carrusel:** copia un bloque `<div class="carousel-item">` dentro de `#carruselActividades`, cambia la foto, la hora y el título, y agrega otro botón en `.carousel-indicators` con el siguiente número en `data-bs-slide-to`. Usa fotos en formato 16:9 (por ejemplo 1600 x 900 px).
- **Agregar una oferta:** copia un bloque `<div class="col-12 col-md-6 col-lg-4 oferta" data-categoria="...">` y cambia imagen, título, descripción y precio. Las categorías son `romantico`, `familia` y `aventura`.
- **Cambiar la paleta:** edita las variables de la sección `:root` en `css/styles.css`.

## Solución de problemas
| Problema | Causa probable | Solución |
|---|---|---|
| La página sale sin estilos | Sin internet (CDN) o ruta incorrecta | Revisa la conexión y que `css/styles.css` exista |
| `Not found` en XAMPP | Carpeta fuera de `htdocs` o nombre distinto | Verifica la ruta y escribe el nombre igual en la dirección |
| En el celular dice "no pudo conectarse al servidor" | Se usó `localhost` | Publica en GitHub Pages o usa la IP de tu computadora en la misma red |
| El video no arranca solo | El navegador bloquea el autoplay | Presiona play en los controles |
| El tema no cambia después de actualizar archivos | Copia guardada del navegador | Recarga con **Ctrl + F5** |
| Fotos pixeladas | Imagen de baja resolución estirada | Usa fotos de mayor resolución (ver sección anterior) |

## Tecnologías y versiones
- HTML5, CSS3, JavaScript (ES6)
- Bootstrap **5.3.3** (CDN)
- jQuery **3.7.1** (CDN)
- Google Fonts: Fraunces y Figtree

## Dónde se aplicó cada concepto

### HTML5 (3.1)
| Concepto | Ubicación en `index.html` |
|---|---|
| DOCTYPE, `lang`, UTF-8, viewport, `title` | Líneas iniciales / `<head>` |
| `header`, `nav`, `main`, `section`, `article`, `aside`, `footer` | Todo el documento (ej. `aside` del clima en `#hoy`) |
| Encabezados h1–h3, párrafos, enlaces, imágenes con `alt`, listas `ul`/`ol` | Hero, ofertas, agenda (`ol`), datos rápidos (`ul`) |
| `strong` y `em` | Hero, descripciones, FAQ |
| Enlaces de navegación a secciones | Navbar y pie de página |

### CSS3 (3.2) - `css/styles.css`
| Concepto | Dónde |
|---|---|
| Hoja externa | `<link rel="stylesheet" href="css/styles.css">` |
| Selectores de etiqueta, clase e ID | `body`, `h2`, `.seccion`, `#contenido` |
| Selector de atributo | `.oferta[data-categoria="romantico"]` |
| Descendiente e hijo | `.barra-principal .nav-link`, `.lista-datos > li` |
| Pseudoclases | `:hover`, `:focus`, `:first-child`, `:nth-child()`, `:focus-visible` |
| Pseudoelementos | `::before` (íconos en tarjetas), `::after` (línea del menú) |
| Flexbox | `.pie-enlaces`, `.clima-dia` |
| Grid | `.lista-datos`, `.galeria-grid` |
| Media queries | Al final del archivo (992 px y 576 px) |
| Variables CSS | `:root` (paleta y tipografías) |

### JavaScript (3.3) - `js/app.js`
| Concepto | Dónde |
|---|---|
| Archivo externo con `defer` | `<script src="js/app.js" defer>` |
| `let` y `const` | Parte superior del archivo |
| Condicionales | `if/else` y operador ternario en `calcularEstimado()` y en el interruptor °C/°F |
| Eventos | `submit`, `change`, `input`, `show.bs.modal` |
| Modificar DOM/clases | `mostrarAlerta()`, contador de caracteres, modal |
| jQuery explícito | Bloque `$(function () {...})`: filtro de ofertas (`fadeIn/fadeOut`), botón Cotizar, cambio de tipo de viaje |
| Interacción útil | Filtro de ofertas y estimado de precio en vivo |
| `console.log` | Se usó durante el desarrollo y se retiró antes de la entrega |

### Formulario y Bootstrap (3.4 y 3.5)
- Campos: texto, correo, select, fecha, number, radio, checkbox y textarea.
- `label for` + `id`, y `fieldset` con `legend`.
- Validación nativa: `required`, `type`, `min`, `max`, `minlength`, `pattern` y `maxlength`, más validación en JS (fecha no pasada).
- Clases Bootstrap: `form-label`, `form-control`, `form-select`, `form-check`, `mb-3`, `btn`.
- Respuesta visual con `alert` de Bootstrap y resumen. **No se envía nada a un servidor.**
- Rejilla: `container`, `row`, `col-12 col-md-6 col-lg-4`.
- Utilidades: `d-flex`, `gap-2`, `mt-3`, `mb-3`, `text-center`, `w-100`.
- Componentes interactivos: **navbar colapsable, carousel, modal (galería) y accordion (FAQ)**.
- Tarjetas `card` para las ofertas.

## Fuentes de recursos
- Fotografías, video y pantallas informativas: proporcionados por el autor del proyecto.
- Bootstrap, jQuery y Google Fonts por CDN (licencias abiertas).

## Aviso
Los precios, el clima y la agenda son **datos de ejemplo** con fines académicos.
