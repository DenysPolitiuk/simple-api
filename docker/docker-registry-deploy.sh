#! /bin/sh
set -e
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t denyspolitiuk/simple-api:$TRAVIS_BUILD_ID .
docker push denyspolitiuk/simple-api:$TRAVIS_BUILD_ID
