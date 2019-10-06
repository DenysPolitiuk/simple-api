#! /bin/sh
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin && \
docker build -t denyspolitiuk/simple-api . && \
docker push denyspolitiuk/simple-api
