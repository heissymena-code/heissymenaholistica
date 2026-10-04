#!/bin/sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
OUTPUT_PATH=${1:-"$SCRIPT_DIR/releases/heissy-mena-caprover.tar"}

case "$OUTPUT_PATH" in
  /*) ;;
  *) OUTPUT_PATH="$PWD/$OUTPUT_PATH" ;;
esac

REQUIRED_PATHS="
captain-definition
Dockerfile
nginx.conf
.dockerignore
index.html
styles.css
app.js
favicon.png
assets
programa
sobre
testimonios
contacto
"

for relative_path in $REQUIRED_PATHS; do
  if [ ! -e "$SCRIPT_DIR/$relative_path" ]; then
    printf 'Error: falta el archivo o directorio requerido: %s\n' "$relative_path" >&2
    exit 1
  fi
done

OUTPUT_DIR=$(dirname -- "$OUTPUT_PATH")
mkdir -p "$OUTPUT_DIR"

TEMP_ARCHIVE=$(mktemp "${TMPDIR:-/tmp}/heissy-mena-caprover.XXXXXX")
BUILD_DIR=$(mktemp -d "${TMPDIR:-/tmp}/heissy-mena-build.XXXXXX")
trap 'rm -f "$TEMP_ARCHIVE"; rm -rf "$BUILD_DIR"' EXIT HUP INT TERM

for relative_path in $REQUIRED_PATHS; do
  cp -R "$SCRIPT_DIR/$relative_path" "$BUILD_DIR/$relative_path"
done

node "$SCRIPT_DIR/scripts/prepare-production.mjs" "$BUILD_DIR"

tar -cf "$TEMP_ARCHIVE" \
  -C "$BUILD_DIR" \
  captain-definition \
  Dockerfile \
  nginx.conf \
  .dockerignore \
  index.html \
  styles.css \
  app.js \
  favicon.png \
  assets \
  programa \
  sobre \
  testimonios \
  contacto

if ! tar -tf "$TEMP_ARCHIVE" | grep -qx 'captain-definition'; then
  printf 'Error: captain-definition no quedó en la raíz del paquete.\n' >&2
  exit 1
fi

mv -f "$TEMP_ARCHIVE" "$OUTPUT_PATH"
rm -rf "$BUILD_DIR"
trap - EXIT HUP INT TERM

printf 'Paquete de producción para CapRover creado correctamente:\n%s\n' "$OUTPUT_PATH"
