# Apache DRUID

imagen de druid

![alt text](img/druid.jpeg)

## ACCESOS

Por ahora sin seguridad


## Volumes

* **tmp**: apuntando los archivos temporales a /tmp
* **logs**: guardado dentro del docker en "/volumes/logs/" sirve para ver los logs de druid (broker,middleManager,etc)
* **conf**: guardado dentro del docker en "/volumes/conf/" sirve para modificar la configuracion de druid

## CONFIGURACION

### Suponiendo las siguientes variables:

* **M:** Memoria aprox que usa druid
* **C:** Numero de cores
* **B:** Tamaño en bytes de buffer de operaciones intermedias
* **MB:** Numero de buffers de merge (en estos buffers se hacen operaciones especiales como group by)
* **T:** Numero de hilos de proceso
* **TH:** Numero de threads de http
* **H:** Memoria aprox de heap de JVM

### Entonces una recomenadacion es que la configuracion sea de la siguiente manera:

* **T =** C-1 (siempre tiene que quedar un cpu libre para manejar la carga)
* **M =** B*(MB+C)
* **Mdef =** B*(2+C)----(si tenemos 4 cores)--->Mdef=6*B
* **MBdef =** max(2,T/4)---->(por default va a tener 2)
* **THdef =** max(160,1.06*C+2)+30--->40
* **H =** 250mb*T---->Hdef=750mb

## ACLARACIONES

* **Logging**: La cantidad de logs que genera druid es increible, para mitigar esto cambiar la linea **\<Root level="info"\>** por **\<Root level="error"\>** en archivo volumes/conf/druid/cluster/_common/log4j2.xml

## Paginas

https://hub.docker.com/r/fokkodriesprong/docker-druid/