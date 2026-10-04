# Despliegue en CapRover

El proyecto está preparado como un sitio estático servido por Nginx. No necesita Node.js, dependencias ni proceso de compilación.

## Crear la aplicación

1. En el panel de CapRover, crea una aplicación nueva.
2. No actives `Has Persistent Data`: el contenido está incluido en la imagen Docker.
3. En `HTTP Settings`, asigna el dominio deseado.
4. Activa HTTPS y luego `Force HTTPS` cuando el dominio ya apunte al servidor.

## Desplegar con la CLI

Instala la CLI de CapRover si todavía no la tienes:

```bash
npm install -g caprover
```

Desde la raíz de este proyecto, ejecuta:

```bash
caprover login
caprover deploy
```

Selecciona el servidor y la aplicación que creaste. CapRover detectará `captain-definition`, construirá la imagen con `Dockerfile` y publicará el contenedor en el puerto 80.

## Desplegar desde el panel

Genera un archivo listo para subir ejecutando:

```bash
./build-caprover-tar.sh
```

El resultado se guardará en `releases/heissy-mena-caprover.tar`. Súbelo en la sección `Deployment` de la aplicación. El script comprueba automáticamente que `captain-definition` esté en la raíz del paquete.

También puedes indicar otra ruta de salida:

```bash
./build-caprover-tar.sh ./mi-sitio.tar
```

## Probar antes de publicar

Con Docker instalado:

```bash
docker build -t heissy-mena-web .
docker run --rm -p 8080:80 heissy-mena-web
```

Abre `http://localhost:8080` y comprueba también `http://localhost:8080/health`.

## Actualizaciones

Edita normalmente los archivos HTML, `styles.css`, `app.js` o los recursos de `assets/` y vuelve a ejecutar:

```bash
caprover deploy
```

No se requiere ningún cambio en la configuración de CapRover para futuras ediciones.
