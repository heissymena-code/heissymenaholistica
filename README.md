# HeissyMena Holística — réplica vanilla

Sitio multipágina en HTML, CSS y JavaScript sin frameworks ni proceso de compilación.

El proyecto también está listo para desplegarse en CapRover mediante Docker y Nginx. Consulta [`CAPROVER.md`](./CAPROVER.md) para ver los pasos de publicación.

## Estructura editable

- Cada página conserva todo su contenido, navegación, llamadas a la acción y pie de página dentro de su propio `index.html`.
- `styles.css` contiene únicamente la presentación visual y los breakpoints responsive.
- `app.js` contiene únicamente comportamiento: menú móvil, aviso de cookies, animaciones al hacer scroll y confirmación visual de formularios.
- `assets/` contiene logos y fotografías.

Para cambiar un texto, precio, enlace o sección, edita directamente el HTML de la ruta correspondiente. No hay contenido de negocio ni plantillas HTML dentro de JavaScript.

## Ejecutar

Desde esta carpeta:

```bash
python3 -m http.server 8080
```

Luego abre `http://localhost:8080`.

## Rutas

- `/`
- `/programa/`
- `/sobre/`
- `/testimonios/`
- `/contacto/`

Los formularios incluyen validación y confirmación visual local. Para recibir envíos reales hay que conectar el manejador de `submit` en `app.js` con el endpoint o servicio que se elija al publicar.

## Archivos de despliegue

- `captain-definition`: indica a CapRover que debe construir el `Dockerfile` del proyecto.
- `Dockerfile`: crea una imagen Nginx ligera con únicamente los archivos del sitio.
- `nginx.conf`: conserva las rutas multipágina, habilita compresión, caché y encabezados de seguridad.
- `.dockerignore`: evita copiar archivos de desarrollo innecesarios al contexto de construcción.
- `build-caprover-tar.sh`: genera `releases/heissy-mena-caprover.tar`, listo para subir desde el panel de CapRover.
