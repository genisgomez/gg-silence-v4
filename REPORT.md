# INFORME — AUDITORÍA NOCTURNA GG SILENCE v4
**2026-07-02 · rama `audit/nocturna-20260702` · 11 commits · producción NO tocada**

## Resumen ejecutivo
El problema más grave era que la camiseta 3D del hero no se veía en producción (la URL del modelo no existía): ya funciona, con el modelo auto-hospedado y verificado con capturas headless. Se eliminaron las fotos aleatorias de picsum del Journal (sustituidas por tus fotos nocturnas), se recortó ~7,9 MB de imágenes con WebP, y la newsletter ahora guarda los emails de verdad en Netlify Forms (antes se descartaban). Se añadió lo básico que faltaba de SEO (favicon, robots, sitemap, Organization) y headers de seguridad. Quedan 5 decisiones de negocio marcadas como PENDIENTE-DECISIÓN — sobre todo las fechas Oct/Nov contradictorias y el stock 50/150/11 — que solo tú puedes resolver.

## Tabla de resultados
| Problema | Severidad | Estado |
|---|---|---|
| Modelo 3D no visible en producción (URL CDN inexistente) | CRÍTICO | ✅ ARREGLADO (auto-hospedado + fallbacks + encuadre verificado) |
| Journal con picsum.photos (fotos aleatorias de terceros) | CRÍTICO | ✅ ARREGLADO (fotos propias, mismo look) |
| Newsletter descartaba los emails | ALTO | ✅ ARREGLADO (Netlify Forms `newsletter`) |
| ~8 MB de PNGs sin optimizar | ALTO | ✅ ARREGLADO (WebP -97% + fallback) |
| Imágenes sin dimensiones (CLS) / sin lazy / sin alt | ALTO | ✅ ARREGLADO |
| Sin favicon (404 en consola) | ALTO | ✅ ARREGLADO (favicon.svg de marca) |
| Botones de icono sin nombre accesible; carrito sin semántica | ALTO | ✅ ARREGLADO |
| Sin headers de seguridad | MEDIO | ✅ ARREGLADO (netlify.toml raíz; CSP pospuesta, ver AUDIT G1) |
| Sin robots.txt / sitemap / JSON-LD Organization | MEDIO | ✅ ARREGLADO |
| Vídeo sin poster | MEDIO | ✅ ARREGLADO |
| Selectores GSAP muertos (warnings en consola) | BAJO | ✅ ARREGLADO |
| Hint "Drag 360°" mal posicionado (clases TW inexistentes) | BAJO | ✅ ARREGLADO (detectado en verificación) |
| Fechas Oct vs Nov 2026 (title/modal vs cards/waitlist) | ALTO | ⏸ PENDIENTE-DECISIÓN (recomiendo unificar a la fecha real; los textos "November" están en 4 puntos) |
| Stock: 50 uds vs "50 M·50 L·50 XL" (150) vs "11 units" | ALTO | ⏸ PENDIENTE-DECISIÓN (si son 50 totales, repartir tallas p.ej. 20/20/10 y revisar "11 units") |
| Carrito decorativo (checkout no hace nada) | MEDIO | ⏸ PENDIENTE-DECISIÓN (conectar Stripe o quitar icono hasta el drop) |
| node_modules + .netlify trackeados en master (repo público) | ALTO | ⏸ PENDIENTE-DECISIÓN (.gitignore ya añadido; falta `git rm -r --cached node_modules .netlify` en master) |
| prenda-001.png / prenda-002.jpeg huérfanos (~1,9 MB) | BAJO | ⏸ PENDIENTE-DECISIÓN (no se borran archivos por regla) |
| og:locale en_US | BAJO | ❌ NO TOCADO (copy 100% inglés → en_US es coherente) |
| Contraste texto off-white/10–25 | MEDIO | ❌ NO TOCADO (estética deliberada de marca, prohibido cambiarla) |
| GSAP bloqueante en head | MEDIO | ❌ NO TOCADO (reordenar ejecución tiene riesgo de romper la entrada; próxima iteración) |

## Commits (de más antiguo a más reciente)
```
773cf28 fix: modelo 3D del hero auto-hospedado con carga robusta
8352655 fix: escala y encuadre del modelo 3D en el hero
8a1e201 fix: elimina selectores GSAP muertos y funcion sin uso
ce71bda perf: imagenes WebP con fallback PNG y dimensiones explicitas
9500656 content: Journal con fotografia propia en lugar de picsum.photos
98c1c17 fix: newsletter conectada a Netlify Forms
8092eb5 a11y: nombres accesibles, semantica de dialogo en carrito y ESC
00c2f71 seo: favicon, robots.txt, sitemap, JSON-LD Organization y poster
83efc2e fix: headers de seguridad en netlify.toml raiz + .gitignore
795bb92 fix: posicion del hint 'Drag 360' con estilos inline
(+ este commit: informes AUDIT.md y REPORT.md)
```

## Verificación realizada
- Sintaxis JS de los 2 scripts inline validada con `node --check`.
- Página servida en local y verificada con Chrome headless (capturas de hero, journey, drop reveal, shop y journal): sin errores de consola, sin warnings GSAP, sin 404, layout intacto tras los `<picture>`.
- El decal del logo • ▌▐ visible en el pecho de la camiseta 3D, rotación y hint verificados.

## Top 3 para la próxima iteración
1. **Resolver las 2 incoherencias de contenido (fechas y stock)** — es lo único que un cliente atento nota en 30 segundos y mina la credibilidad del "50 units, no restock".
2. **Checkout real o quitar el carrito**: un botón Checkout que no hace nada en una marca de lujo genera desconfianza. Stripe Payment Links se monta en una tarde y encaja con waitlist-only.
3. **Limpiar master**: `git rm -r --cached node_modules .netlify` + push (el .gitignore ya está en esta rama), y de paso decidir sobre los archivos huérfanos prenda-00x.

**Para publicar todo esto:** revisar la rama y hacer merge a master (el auto-deploy hará el resto):
`git checkout master && git merge audit/nocturna-20260702 && git push`
