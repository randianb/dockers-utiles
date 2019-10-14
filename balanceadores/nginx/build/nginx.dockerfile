FROM nginx

ARG NGINX_NOMBRE_UPSTREAM
ARG PYTHON_PUERTO
ARG NGINX_HOST
ARG NGINX_PORT

RUN useradd foo && chown -R foo /etc/nginx/
COPY ./volumes/nginx/config/proxy.conf /etc/nginx/conf.d/proxy.conf
