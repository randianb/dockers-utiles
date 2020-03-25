
# Go cd

> Imagen con Go cd, contiene el server y el agent para realizar las pruebas

![alt text](img/gocd.png)

## Puertos

* **gocd**: 8153

## Volumes

### Server

* **~/volumes/gocd-server/home/**: carpeta *home* del servidor de Go
* **~/volumes/gocd-server/godata/**: datos del servidor de Go

### Agente

* **~/volumes/gocd-server/home**: carpeta *home* del servidor de Go
* **~/volumes/gocd-agent/godata/**: datos del agente de Go

## Paginas

[Imagen docker hub](https://hub.docker.com/r/gocd/gocd/)
[Pagina oficial](https://www.gocd.org/)
