# AUDITORÍA — GG SILENCE v4
**Fecha:** 2026-07-02 · **Rama:** audit/nocturna-20260702 · **Alcance:** index.html, styles.css, assets, config Netlify

---

## 1. Coherencia de contenido

| # | Problema | Severidad | Detalle |
|---|----------|-----------|---------|
| C1 | Fechas contradictorias Oct/Nov 2026 | ALTO · PENDIENTE-DECISIÓN | `<title>`, meta description, JSON-LD (`availabilityStarts 2026-10-11`), modal ACCESS DENIED ("11 · October 2026") y línea del drop dicen **October**. Las product cards ("November 2026 · 11 units"), `openWaitlist()` (añade "· November 2026") y el mensaje de éxito ("We'll notify you in November") dicen **November**. Recomendación: unificar a la fecha real del drop; si es 11 de octubre, cambiar los 4 puntos de November. |
| C2 | Unidades contradictorias 50 vs 150 vs 11 | ALTO · PENDIENTE-DECISIÓN | Hero del drop: "DROP 001/050" y "50/50 · No restock" (50 uds). Misma tabla: "50 M · 50 L · 50 XL" (=150 uds). Waitlist modal: "50 M · 50 L · 50 XL". Cards: "11 units". Recomendación: si son 50 totales, la talla debería ser algo como "20 M · 20 L · 10 XL"; "11 units" en las cards parece resto de otra versión. |
| C3 | Precio | OK | €160 unificado en JSON-LD, tabla del drop, waitlist y las 2 cards (corregido 2026-07-02, commit 110584f). |
| C4 | Dos product cards para la misma prenda | BAJO · PENDIENTE-DECISIÓN | "Producto 01" y "Producto 02" son la misma Insignia T-Shirt con foto distinta. Si Drop 001 es una sola pieza, valorar unificar en una card con galería. |

## 2. Assets

| # | Problema | Severidad | Detalle |
|---|----------|-----------|---------|
| A1 | Journal usa picsum.photos (4 imágenes aleatorias externas) | CRÍTICO | Marca de lujo sirviendo fotos aleatorias de terceros que cambian sin control y añaden DNS/req externas. **ARREGLADO**: sustituidas por fotos propias de ciudades nocturnas (ya en el repo, on-brand, mismo filtro CSS). |
| A2 | PNGs sin optimizar (~8,5 MB en imágenes) | ALTO | ciudad-*.png ≈1,4 MB ×5 y drop-001-main.png 1 MB. **ARREGLADO**: convertidas a WebP q82 (22–40 KB cada una, ≈-97%) vía `<picture>` + fallback PNG. Nota: prenda-001.png (1,8 MB) y prenda-002.jpeg NO se referencian en el HTML — archivos huérfanos; no se borran por regla de auditoría (PENDIENTE-DECISIÓN). |
| A3 | Ninguna imagen tiene width/height (CLS) | ALTO | **ARREGLADO**: añadidos atributos de dimensiones a todas las imágenes de contenido. |
| A4 | Journal sin loading="lazy" | MEDIO | **ARREGLADO** (el resto ya lo tenía). |
| A5 | Journal con alt="" | MEDIO | **ARREGLADO**: alts descriptivos. |
| A6 | Vídeo hero sin poster | MEDIO | **ARREGLADO**: poster JPG extraído del primer frame del vídeo B/N. |
| A7 | Modelo 3D (shirt.glb) no está en el repo | CRÍTICO | El hero 3D dependía de una única URL CDN no verificada → en producción no se veía nada. **ARREGLADO**: modelo descargado y auto-hospedado + cadena de fallbacks CDN. |

## 3. Funcionalidad

| # | Problema | Severidad | Detalle |
|---|----------|-----------|---------|
| F1 | Waitlist → Netlify Forms | OK | Ya estaba bien montado: `data-netlify`, `form-name`, POST fetch a `/`, mensaje de éxito, focus trap. Nada que tocar. |
| F2 | Newsletter "Community" no envía a ningún sitio | ALTO | `handleSub()` solo simula éxito en el placeholder. **ARREGLADO**: conectado a Netlify Forms (form `newsletter` oculto para detección + POST por fetch), mismo feedback visual. |
| F3 | Carrito decorativo | MEDIO · PENDIENTE-DECISIÓN | Sidebar siempre "Your cart is empty", botón Checkout no hace nada. Decisión de negocio: o se conecta a un checkout real (Stripe Payment Links sería lo mínimo) o se quita el icono hasta el drop. No tocado. |
| F4 | Modal ACCESS DENIED | OK | Funciona, accesible (role, aria, focus trap, ESC). |
| F5 | Drag 360° del hero | ARREGLADO | Ver A7. Respeta prefers-reduced-motion y degrada sin romper si no hay WebGL. |

## 4. Performance

| # | Problema | Severidad | Detalle |
|---|----------|-----------|---------|
| P1 | GSAP + ScrollTrigger bloqueantes en head | MEDIO · NO TOCADO | El script principal inline depende de gsap en parse-time; añadir defer requeriría reordenar la ejecución con riesgo de romper la secuencia de entrada. Recomendado para siguiente iteración. |
| P2 | Peso de imágenes | ALTO | Ver A2 (arreglado). |
| P3 | Fuentes | OK | Google Fonts con display=swap y preconnect. |
| P4 | Tailwind compilado local (18 KB) | OK | Sin CDN runtime, correcto. |
| P5 | Canvas de polvo + cursor custom en RAF continuo | BAJO · NO TOCADO | Coste asumible y es parte de la estética. |

## 5. SEO

| # | Problema | Severidad | Detalle |
|---|----------|-----------|---------|
| S1 | Sin favicon | ALTO | Pestaña sin marca + 404 de /favicon.ico. **ARREGLADO**: favicon.svg con el símbolo • ▌▐ (bone sobre negro) + link en head. |
| S2 | Sin robots.txt ni sitemap.xml | MEDIO | **ARREGLADO**: ambos creados (sitemap de 1 URL). |
| S3 | JSON-LD solo Product | MEDIO | **ARREGLADO**: añadido schema Organization (nombre, logo, url). |
| S4 | og:locale en_US | BAJO · PENDIENTE-DECISIÓN | La marca es de Barcelona pero todo el copy es inglés → en_US es defendible. Si el público objetivo es España, cambiar a es_ES y valorar copy ES. No tocado. |
| S5 | Canonical, OG, Twitter Card | OK | Correctos. |

## 6. Accesibilidad

| # | Problema | Severidad | Detalle |
|---|----------|-----------|---------|
| X1 | Botones de icono sin nombre accesible | ALTO | Carrito (nav), menú móvil (abrir), cierre del carrito: sin aria-label. **ARREGLADO**. |
| X2 | Input newsletter sin label | ALTO | **ARREGLADO**: aria-label añadido. |
| X3 | Carrito sidebar sin semántica de diálogo | MEDIO | **ARREGLADO**: role="dialog" + aria-label + ESC para cerrar. |
| X4 | Contraste texto (off-white/10–/25 sobre negro) | MEDIO · NO TOCADO | Es una decisión estética deliberada de la marca (texto "susurrado"). Cambiarlo alteraría el diseño — prohibido por las reglas de esta auditoría. |
| X5 | Modales waitlist/manifesto/drop-date | OK | role, aria-modal, aria-labelledby, focus trap, restauración de foco y ESC ya implementados. |
| X6 | prefers-reduced-motion | OK | Cubierto en CSS global, ken-burns y en la escena 3D. Las timelines GSAP no lo consultan (BAJO, siguiente iteración). |

## 7. Código

| # | Problema | Severidad | Detalle |
|---|----------|-----------|---------|
| J1 | Selectores GSAP muertos | BAJO | `#hero img` y `#manifesto .ma img` no matchean nada (el hero es vídeo, manifesto no tiene img). **ARREGLADO**: eliminados. |
| J2 | `openProduct()` sin uso | BAJO | **ARREGLADO**: eliminada. |
| J3 | node_modules y .netlify commiteados en master | ALTO · PENDIENTE-DECISIÓN | Entraron en el commit 110584f por un `git add -A` sin .gitignore. **Mitigado en esta rama**: .gitignore creado. Sacarlos del índice (`git rm -r --cached`) cambia el historial visible de master → lo dejo a tu decisión mañana (recomendado hacerlo). |
| J4 | Doble disparo de runEntry | OK | Es un fallback intencional con guard `entryDone`. |

## 8. Seguridad

| # | Problema | Severidad | Detalle |
|---|----------|-----------|---------|
| G1 | Sin headers de seguridad | MEDIO | No había netlify.toml en la raíz (el de .netlify/ es estado local del CLI, no se despliega). **ARREGLADO**: netlify.toml raíz con X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy mínima. CSP NO añadida: con los estilos/scripts inline y 3 CDNs actuales una CSP estricta rompería la web; requiere refactor previo (siguiente iteración). |
| G2 | Secretos en el código | OK | Ninguno encontrado (revisados index.html, styles.css, package.json). |
