source ./scripts/docker/ambiente.sh

# OBSCURITY IS ROUNDING US

docker exec -it $(docker ps -a -q --filter name=$NOMBRE_DOCKER --format="{{.ID}}") bash

#VALIDO SI ME PASARON UN PARAMETRO
if [ $? -eq 0 ]; then
    success=1 
  else
    docker exec -it $(docker ps -a -q --filter name=$NOMBRE_DOCKER\_$1 --format="{{.ID}}") bash
fi

#VALIDO SI FUNCO EL COMANDO
if [ $? -eq 0 ]; then
    success=1 
else
    docker exec -it $(docker ps -a -q --filter name=$NOMBRE_DOCKER\_1 --format="{{.ID}}") bash
fi
