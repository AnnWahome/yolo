# Explanation of My Kubernetes Deployment project for the IP4

## 1. Choice of the Kubernetes Objects Used for Deployment

I chose **Deployments** for the backend and frontend because they are stateless, easily
scalable, and don&#39;t require persistent storage. I used **StatefulSets** for the database because
it requires stable, persistent storage, and the replica needs a persistent volume to ensure the pod maintains the state across restart or deletion.

## 2. Method Used to Expose my Pods to Internet Traffic

I exposed the frontend services using **LoadBalancer** services to ensure they
are publicly accessible. The backend and database are only accessible internally via a **headless service**,
which allows for stable network identities for each pod in the StatefulSet of the database.

## 3. Use or Lack of Persistent Storage

I used persistent storage for the **database** by utilizing volume claim templates in the
StatefulSet to ensures the database has its own dedicated storage. The backend
and frontend are stateless, so I didn&#39;t use persistent storage for them.

## 4. Git Workflow Used to Achieve the Task

I followed a feature branch model, where each task was done in a separate branch.The specific steps are explained in the README file.
After testing and reviewing, changes were merged into the main branch. I also followed a clear commit
message convention and used Docker image versioning for each release.

## 5. Successful Running of the Application and errors encountered.

The application is running successfully, and the frontend is accessible via the external IP
provided by the LoadBalancer service. The live URL is included in the README.md. During
deployment, I encountered an issue with the database service which I fixed by updating the
StatefulSet configuration.

## 6. Docker Image Tag Naming Standards

I followed semantic versioning for my Docker images (e.g., `ann-yolo-backend:v1.0.0`, `ann-yolo-client:v1.0.0`,
`mongo:latest`). This made it easy to track different versions of the application. I also
ensured consistency across all image names by prefixing them with my Docker Hub username(e.g.,`annsonnie1/ann-yolo-backend:v1.0.0`)

## 7. Project Folder structure
The docker-compose.yaml file in the root folder of yolo was used to create the containerized imagesimages and then images pushed to docker hub.

yolo/ip4

├── manifests/  
│   ├── backend-deployment.yaml  
│   ├── backend-service.yaml  
│   ├── database-statefulset.yaml  
│   ├── database-service.yaml  
│   ├── frontend-deployment.yaml  
│   ├── frontend-service.yaml  
│   └── persistent-volume-claim.yaml    
├── README.md  
├── explanation.md  


## AOB and Thanks
### *I have enjoyed learning DevOps with the TM who has been very helpful.Thank you.* 