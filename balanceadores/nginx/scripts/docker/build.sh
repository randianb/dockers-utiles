source ./scripts/docker/ambiente.sh

docker build \
$(for i in `cat $ARCHIVO_ARGUMENTOS`; do out+="--build-arg $i " ; done; echo $out;out="") \
-f $DOCKERFILE \
-t $USER/$IMAGEN:$TAG . \
--no-cache
