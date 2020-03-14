####################################
# VARIABLES
####################################
URL="GET http://localhost:5000/test"
DURACION=10s
PETICIONES_POR_SEGUNDO=10000
HILOS=20
TIEMPO_ESPERA=4s

DOCKER_VEGETA=peterevans/vegeta

####################################
# EJECUCION
####################################
docker pull $DOCKER_VEGETA
docker run --rm -it --network bridge $DOCKER_VEGETA sh -c \ "echo $URL | vegeta attack  -timeout $TIEMPO_ESPERA -workers $HILOS -rate=$PETICIONES_POR_SEGUNDO -duration=$DURACION | vegeta report"

