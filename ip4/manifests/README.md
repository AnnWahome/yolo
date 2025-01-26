kubectl apply -f ip4/manifests/backend-deployment.yaml
kubectl apply -f ip4/manifests/backend-service.yaml
kubectl apply -f ip4/manifests/database-statefulset.yaml
kubectl apply -f ip4/manifests/database-service.yaml
kubectl apply -f ip4/manifests/frontend-deployment.yaml
kubectl apply -f ip4/manifests/frontend-service.yaml
kubectl apply -f ip4/manifests/persistent-volume-claim.yaml