Current IP.
---
To setup the provisioning and deployment using Ansible and docker, you will follow the steps below. 

## Explanation of Roles and Tasks

This project uses Ansible playbooks and roles to automate the deployment of a full-stack YOLO e-commerce application on a Vagrant-managed virtual machine. 
Below is a detailed explanation of each component.

### Vagrantfile
- **Purpose**: Provisions an Ubuntu 20.04 virtual machine using the `geerlingguy/ubuntu2004` box.
- **Key Configurations**:
  - Port forwarding maps the host's port 3000 to the guest's port 3000 for frontend access.
  - The virtual machine is allocated 1024 MB of memory and 1 CPU.
  - Ansible provisioning automatically runs `playbook.yml` to set up the environment.

### playbook.yml
- **Purpose**: Main playbook to orchestrate the deployment.
- **Roles**:
  - `frontend-deployment`: Deploys the frontend.
  - `setup-mongodb`: Sets up the MongoDB database.
  - `backend-deployment`: Deploys the backend.

### Roles

#### Role: frontend-deployment
- **Task: Pull frontend Docker image**
  - Uses `docker_container` to pull and start the frontend service.
  - Maps port 3000 on the host to port 3000 in the container.
  - Container name: `ann-yolo-client`.

#### Role: setup-mongodb
- **Task: Pull MongoDB Docker image**
  - Uses `docker_container` to pull and start the MongoDB service.
  - Maps port 27017 on the host to port 27017 in the container.
  - Uses a volume `app-mongo-data` to persist database data.
  - Container name: `app-mongo`.

#### Role: backend-deployment
- **Task: Pull backend Docker image**
  - Uses `docker_container` to pull and start the backend service.
  -
.......................................................................................
Ignore the below since it was used to explain the previous IP.
### 1. Choice of Base Image

For the containerized application, the following base images were chosen:

- **Client**: `node:16-alpine3.16`  
  This lightweight image, based on Alpine Linux, is used for building the client-side application.  
- **Backend**: `node:16-alpine3.16`  
  Similarly, the backend is also based on the `node:16-alpine3.16` image to maintain consistency and ensure a smaller footprint.
- **MongoDB**: `mongo:6.0`  
  The MongoDB container uses the official `mongo:6.0` image to ensure compatibility with modern MongoDB versions.

---

### 2. Dockerfile Directives Used in the Creation and Running of Each Container

Two Dockerfiles are used, one for the **Client** and another for the **Backend**. Below are the details:

#### **Client Dockerfile**:

```Dockerfile
# Build stage
FROM node:16-alpine3.16 as build-stage

# Set working directory
WORKDIR /client

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --only=production && \
    npm cache clean --force && \
    rm -rf /tmp/*

# Copy application files
COPY . .

# Build the application and remove dev dependencies
RUN npm run build && \
    npm prune --production

# Production stage
FROM node:16-alpine3.16 as production-stage
WORKDIR /client

# Copy necessary files from build stage
COPY --from=build-stage /client/build ./build
COPY --from=build-stage /client/public ./public
COPY --from=build-stage /client/src ./src
COPY --from=build-stage /client/package*.json ./

# Set environment to production
ENV NODE_ENV=production

# Expose the required port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

#### **Backend Dockerfile**:

```Dockerfile
# Set base image
FROM node:16-alpine3.16

# Set working directory
WORKDIR /backend

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --only=production && \
    npm cache clean --force && \
    rm -rf /tmp/*

# Copy the rest of the application code
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Expose the required port
EXPOSE 5000

# Remove unnecessary development dependencies
RUN npm prune --production && \
    npm cache clean --force && \
    rm -rf /tmp/*

# Start the application
CMD ["npm", "start"]
```

---

### 3. Docker Compose Networking

The `docker-compose.yaml` file defines the necessary services, networking, and port allocations. The services are connected through a bridge network (`app-net`), and the application ports are mapped as follows:

```yaml
services:
  backend:
    image: annsonnie1/ann-yolo-backend:v1.0.0
    ports:
      - "5000:5000"
    networks:
      - app-net

  client:
    image: annsonnie1/ann-yolo-client:v1.0.0
    ports:
      - "3000:3000"
    networks:
      - app-net

  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    networks:
      - app-net

networks:
  app-net:
    driver: bridge
```

- **Backend**: Exposed on port 5000
- **Client**: Exposed on port 3000
- **MongoDB**: Exposed on port 27017

All containers are connected to the `app-net`, a custom bridge network, enabling seamless communication between them.

---

### 4. Docker Compose Volume Definition and Usage

To ensure persistent storage for MongoDB data, a named volume is defined in the `docker-compose.yaml`:

```yaml
volumes:
  app-mongo-data::
    driver: local
```

This volume ensures that MongoDB data persists even if the container is stopped or deleted.

---

### 5. Git Workflow to Achieve the Task

The following Git workflow was followed to achieve the task:

1. **Fork and Clone** the repository:
   - Fork the repository from the original source.
   - Clone the repository:  
     `git clone git@github.com:AnnWahome/yolo.git`
  
2. **Setup the Project**:
   - Create a `.gitignore` file to exclude unnecessary files (e.g., `.vscode`).
  
3. **Add Dockerfiles**:
   - Add Dockerfile for the Client:  
     `git add client/Dockerfile`
   - Add Dockerfile for the Backend:  
     `git add backend/Dockerfile`
  
4. **Commit the Changes**:
   - Commit the Dockerfile changes:  
     `git commit -m "Add Dockerfiles for Client and Backend"`
  
5. **Add Docker Compose File**:
   - Add `docker-compose.yaml` file:  
     `git add docker-compose.yaml`
  
6. **Commit the Docker Compose File**:
   - Commit the docker-compose changes:  
     `git commit -m "Add Docker Compose configuration file"`
  
7. **Push Changes** to GitHub:
   - Push the changes to the repository:  
     `git push`

8. **Build the Docker Images**:
   - Build the images using Docker Compose:  
     `docker-compose -f docker-compose.yaml up`

9. **Push the Docker Images** to Docker Hub:
    - `docker login`
   - Push the built images to the Docker registry:  
     `docker-compose push annsonnie1/ann-yolo-client:v1.0.0` 
     `docker-compose push annsonnie1/ann-yolo-backend:v1.0.0` 
     Mongo:latest images already exists in docker hub.

10. **Deploy the Containers**:
    - Deploy the application using Docker Compose:  
      `docker-compose up`

11. **Document the Workflow**:
    - Created an `explanation.md` file explaining the workflow, commit messages, and steps taken.

---

### 6. Docker Image Tagging and DockerHub

For ease of identification and versioning, image tags are used to clearly distinguish between different stages of the project. 

The final deployed images were pushed to DockerHub. Below is a screenshot demonstrating the deployed image version:

![Dockerhub images](<Screenshot from 2024-12-15 23-11-55.png>)

![Dockerhub- yolo-client](<Screenshot from 2024-12-15 23-14-57.png>)

![Dockerhub- yolo-backend](<Screenshot from 2024-12-15 23-13-37.png>)


Persisted data from the function of adding products to the mongodb.

![Added products](<Screenshot from 2024-12-15 23-39-26.png>)







