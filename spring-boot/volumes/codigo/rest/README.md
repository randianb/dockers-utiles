![alt text](https://cdn-images-1.medium.com/max/716/1*jMQ9lkY5SBnbcOlJB4aizg.png)

# Rest Template

Template para un proyecto basico en Spring Boot vacio con un ejemplo de REST


## Para empezar

Clonar el proyecto de git o descargar en archivo .zip/.tar.gz y descomprimir


## Prerrequisitos

* JVM 1.8 o superior
* Maven


## Despliegue

### Localmente con Maven

Para levantar el proyecto solo es necesario ejecutar:
```
mvn clean install spring-boot:run
```

### Desde Jboss o Tomcat

Compilar el proyecto con Maven de la siguiente forma:
```
mvn clean install
```
y luego deployar el **.war** generado dependiendo del server

### Prueba

Realizar un **GET** a http://localhost:8080/alive para recibir un status **200** con body:
```
ALIVE!
```

## Tests

Para correr los test se debe ejecutar el siguiente comando en Maven:
```
mvn test -Dtest=Test*
```
Esto corre todos los test cuyas clases comiencen con *"Test"*


## SonarQube

Para correrlo en SonarQube es necesario ejecutar el siguiente comando **con SonarQube levantado en localhost:9000**
```
mvn sonar:sonar
```


## Configuracion

En la ruta *../src/main/resources/* se encuentran los archivos de properties de spring y la app

