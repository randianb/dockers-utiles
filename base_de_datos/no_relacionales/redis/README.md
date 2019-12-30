
# REDIS

Imagen de redis, contiene scripts para levantar el compose del server y del cliente

![alt text](img/redis.png)


## PUERTOS

* **DB**: 6379


## ACCESOS

***nada por aca***


## VOLUMES

* **data**: con los datos guardados por redis
* **config**: contiene la configiguracion para redis-server


**IMPORTANTE!!!**
Darle permisos de lectura y escritura a las carpetas de los volumes de forma recursiva


## SCRIPTS

Se tienen que correr desde la raiz del proyecto, ejemplo:
`./scripts/redis-cli.sh`

* **redis-cli**: ejecuta el comando de redis-cli con docker compose  


## PAGINA

[Imagen docker hub](https://hub.docker.com/_/redis)
