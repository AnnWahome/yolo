# Kubernetes Deployment for my YOLO Application on Google Kubernetes Engine  

This project deploys a full-stack application (frontend, backend, and MongoDB database) on Google Kubernetes Engine (GKE).  

---

## Table of Contents  
1. [Prerequisites](#prerequisites)  
2. [Deployment Steps](#deployment-steps)  
3. [Accessing the Application](#accessing-the-application)  
4. [Explanation of Implementation](#explanation.md)  

---
## Prerequisites  
1. **Google Cloud Account** with free credits or billing enabled.  
2. **Docker Hub Account** for hosting custom images.  
3. **Google Cloud SDK** and `kubectl` installed.  
4. **Docker** installed for image management.  
5. Clone this repository:  
   ```bash  
   git clone https://git@github.com:AnnWahome/yolo.git 

## Deployment Steps
1. **Create a GKE Cluster**

``` bash
gcloud container clusters create yolo-cluster
   --zone africa-south1-a  \ 
   --num-nodes 5   \
   --machine-type e2-medium  \ 
   --enable-autoscaling   \
   --min-nodes 1   \
   --max-nodes 5
```

2. **Apply Kubernetes Manifests**

``` bash
# Backend (API)  
kubectl apply -f ip4/manifests/backend-deployment.yaml  
kubectl apply -f ip4/manifests/backend-service.yaml  

# MongoDB Database (StatefulSet)  
kubectl apply -f ip4/manifests/database-statefulset.yaml  
kubectl apply -f ip4/manifests/database-service.yaml  

# Frontend (React Client)  
kubectl apply -f ip4/manifests/frontend-deployment.yaml  
kubectl apply -f pi4/manifests/frontend-service.yaml  

# Persistent Storage  
kubectl apply -f ip4/manifests/persistent-volume-claim.yaml  
```
3. **Verify Deployment**

``` bash
kubectl get pods                  # Check running pods  
kubectl get svc                   # List services (Frontend displays the EXTERNAL-IP)  
kubectl get pvc                   #  persistent volume claims will be visible  
```

## Accessing the Application
1. **Frontend:**
``` bash
kubectl get svc
```
Output

NAME               TYPE            CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE

ann-yolo-backend   ClusterIP      34.118.231.122   <none>         5000/TCP         127m
ann-yolo-client    LoadBalancer   34.118.231.195   34.35.47.192   3000:31990/TCP   127m
kubernetes         ClusterIP      34.118.224.1     <none>         443/TCP          4h32m
yolo-mongo         ClusterIP      34.118.236.163   <none>         27017/TCP        128m

``` bash
kubectl get svc ann-yolo-client  
```
Access the application at: http://34.35.47.192:3000

1. **Backend API (Local Access):**
``` bash
kubectl port-forward svc/ann-yolo-backend 5000:5000  
```
Access via: http://localhost:5000
1. **MongoDB:**
``` bash
kubectl port-forward svc/yolo-mongo 27017:27017  
```
Connect to: mongodb: http://localhost:27017 

