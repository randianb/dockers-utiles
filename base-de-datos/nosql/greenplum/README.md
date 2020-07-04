
# Greenplum

> Imagen de greenplum

![alt text](img/greenplum.png)

## Requerimientos

* docker
* docker-compose

## Ejecucion

* ejecutar `docker-compose up -d`
* ejecutar el script `./scripts/gpadmin.sh`
* una vez dentro del container ejecutar `psql`

## Accesos

* **user**: gpadmin
* **pass**: pivotal

## Puertos

* **DB**: 5432

## Volumes

* **greenplum**: con los datos guardados por greenplum

## Scripts

Se tienen que correr desde la raiz del proyecto, ejemplo:
`./scripts/gpadmin.sh`

* **gpadmin**: te permite ejecutar *psql* una vez adentro

## Paginas

* [Imagen docker hub](https://hub.docker.com/r/datagrip/greenplum)
* [Repo oficial con imagen de docker](https://github.com/kongyew/greenplum-oss-docker/tree/master/gpdb)
