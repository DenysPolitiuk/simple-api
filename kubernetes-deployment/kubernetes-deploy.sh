#! /bin/sh
set -e

echo "$KUBERNETES_CLUSTER_CERTIFICATE" | base64 --decode > cert.crt
./kubectl --kubeconfig=/dev/null --server=$KUBERNETES_SERVER --certificate-authority=cert.crt --token=$KUBERNETES_TOKEN \
	apply -f ./kubernetes/deployment.yaml
