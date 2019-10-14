![alt text](springboot.png)
![alt text](maven.png)

# SPRINGBOOT

Imagen basada en maven con un proyecto en springboot para un despliegue rapido de un microservicio 


## PUERTOS
	
*   8080


## VOLUMES

*  **codigo**: donde se encuentra el codigo fuente, el pom debe encontrarse en esta ruta
*	**logs**: ubiccion del log de springboot, se almacena como un archivo llamado spring-boot.log
*	**m2**: carpeta con las dependencias descargadas por maven


## CONFIGURACION
en el archivo *.env* se encuentra las variables de entorno para configurar springboot


## IMPORTANTE!!!

* Es crucial que se le otorguen **permisos de escritura** a las carpetas de los volumes	
* En caso de correr **spring-boot 2** cambiar la linea *command* del compose de *-Drun.arguments* a *-Dspring-boot.run.arguments=*
