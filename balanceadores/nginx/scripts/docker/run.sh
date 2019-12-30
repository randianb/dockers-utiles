source ./scripts/docker/ambiente.sh

docker network inspect $NETWORK >/dev/null 2>&1 || \
    docker network create  $NETWORK

docker run -d --rm \
--network $NETWORK \
--env-file $ARCHIVO_AMBIENTE \
--name $NOMBRE_DOCKER \
-p $PUERTO_EXTERNO:$PUERTO_INTERNO \
$USER/$IMAGEN:$TAG

#docker network disconnect -f $NETWORK $(docker ps -a -q --filter name=$IMAGEN --format="{{.ID}}")
docker network disconnect -f $NETWORK $NOMBRE_DOCKER

docker network connect $NETWORK $NOMBRE_DOCKER