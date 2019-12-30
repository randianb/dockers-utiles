source ./scripts/docker/ambiente.sh

echo "$TOKEN" | docker login --username $USER --password-stdin
docker push $USER/$IMAGEN:$TAG