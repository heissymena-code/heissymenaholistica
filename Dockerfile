FROM nginx:1.28-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY app.js /usr/share/nginx/html/app.js
COPY favicon.png /usr/share/nginx/html/favicon.png
COPY assets/ /usr/share/nginx/html/assets/
COPY programa/ /usr/share/nginx/html/programa/
COPY sobre/ /usr/share/nginx/html/sobre/
COPY testimonios/ /usr/share/nginx/html/testimonios/
COPY contacto/ /usr/share/nginx/html/contacto/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/health || exit 1

