#!/bin/bash

PR_NUMBER=$1

# Apply the temporary Kubernetes deployment
kubectl delete deployment -n reports-pr-review develop-karpatkey-dapps-monorepo-${PR_NUMBER}

kubectl delete svc -n reports-pr-review develop-karpatkey-dapps-monorepo-${PR_NUMBER}

kubectl delete ing -n reports-pr-review develop-karpatkey-dapps-monorepo-ingress-${PR_NUMBER}