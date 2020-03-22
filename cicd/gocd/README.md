
# Jenkins

> Imagen con Jenkins para realizar pruebas, usa la version **lts**, pero existe un alpine

![alt text](img/jenkins.png)

## Puertos

* **Jenkins**: 10000

## ACCESOS

### IMPORTANTE

* Copiar la constraseña que aparece en el log cuando se levanta el server porque es necesaria para crear los usuarios.

* En caso de no poder, el archivo esta dentro de `volumes/jenkins/secrets/`, es necesario darle **permisos de acceso** para entrar

## Volumes

* **jenkins**: contiene los datos guardados por jenkins

## Paginas

[Imagen docker hub](https://hub.docker.com/r/jenkins/jenkins/)
