####################################
# VARIABLES
####################################
URL="GET http://192.168.0.193:11000/prueba"
DURACION=5s
PETICIONES_POR_SEGUNDO=1000
HILOS=10
TIEMPO_ESPERA=900s

DOCKER_VEGETA=peterevans/vegeta

####################################
# EJECUCION
####################################
docker pull $DOCKER_VEGETA
docker run --rm -it --network bridge $DOCKER_VEGETA sh -c \ "echo $URL | vegeta attack  -timeout $TIEMPO_ESPERA -workers $HILOS -rate=$PETICIONES_POR_SEGUNDO -duration=$DURACION | vegeta report"

