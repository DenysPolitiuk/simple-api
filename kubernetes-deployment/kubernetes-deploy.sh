#! /bin/sh
set -e
COMMIT=$TRAVIS_BUILD_ID
export COMMIT=$COMMIT

envsubst <./kubernetes/deployment.yaml > ./kubernetes/deployment.yaml.out
mv ./kubernetes/deployment.yaml.out ./kubernetes/deployment.yaml

echo "$KUBERNETES_CLUSTER_CERTIFICATE" | base64 --decode > cert.crt
./kubectl --kubeconfig=/dev/null --server=$KUBERNETES_SERVER --certificate-authority=cert.crt --token=$KUBERNETES_TOKEN \
	apply -f ./kubernetes/deployment.yaml -n simple-api
