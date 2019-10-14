# EJEMPLO NGINX

Compose de ejemplo de balanceo de carga

![alt text](img/nginx.png)
![alt text](img/gunicorn.jpg)
![alt text](img/python.png)

## PRUEBAS

* correr con `docker-compose up`
* una vez levantado ir a ***localhost***
* recargar la pagina con F5 varias veces, el json de respuesta deberia 
cambiar porque nginx esta balanceando la carga entre los 2 proyectos de python

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
