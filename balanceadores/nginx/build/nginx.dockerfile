FROM nginx

ARG PYTHON1_PUERTO
ARG PYTHON2_PUERTO
ARG NGINX_PORT
ARG NGINX_NOMBRE_UPSTREAM

RUN useradd foo && chown -R foo /etc/nginx/
COPY ./volumes/nginx/config/proxy.conf /etc/nginx/conf.d/proxy.conf
