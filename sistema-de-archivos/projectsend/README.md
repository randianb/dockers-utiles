# REDIS

> Imagen de redis, contiene scripts para levantar el compose del server y del cliente

![alt text](img/redis.png)

## Puertos

* **DB**: 6379

## ACCESOS

***nada por aca***

## Volumes

* **data**: con los datos guardados por redis
* **config**: contiene la configiguracion para redis-server

**IMPORTANTE!!!**
Darle permisos de lectura y escritura a las carpetas de los volumes de forma recursiva

## SCRIPTS

Se tienen que correr desde la raiz del proyecto, ejemplo:
`./scripts/redis-cli.sh`

* **redis-cli**: ejecuta el comando de redis-cli con docker compose  

## Paginas

[Imagen docker hub](https://hub.docker.com/_/red)
[Ejemplos de configs](https://github.com/projectsend/projectsend/tree/master/includes)
