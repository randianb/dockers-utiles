# EJEMPLO NGINX

Compose de ejemplo de balanceo de carga

![alt text](img/nginx.png)
![alt text](img/gunicorn.jpg)
![alt text](img/python.png)

## CONFIGURACION

* En el archivo ***.env*** se encuentran las variables de entorno para docker

## VOLUMES

### nginx

* **config**: configuracion del proxy
* **logs**: logs

### python

* **${NOMBRE_CARPETA_PROYECTO}**: el codigo python

## PAGINAS

<https://hub.docker.com/_/nginx>
<https://hub.docker.com/_/python>
