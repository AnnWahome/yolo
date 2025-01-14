# YOLO E-Commerce Deployment Project

This repository contains Ansible playbooks and supporting configuration files to automate the deployment of a full-stack e-commerce application using Docker containers. The project provisions a Vagrant-managed virtual machine and deploys a React frontend, Node.js backend, and MongoDB database.

# Requirements
Install the docker engine here:
- [Docker](https://docs.docker.com/engine/install/) 

## Prerequisites

- Vagrant
- VirtualBox
- Ansible
- Docker & Docker Compose

## Getting Started

### Step 1: Clone the Repository
bash
$ git clone https://github.com/your-repo/yolo-project.git
$ cd yolo-project


### Step 2: Start the Virtual Machine
bash
$ vagrant up

This command provisions the virtual machine and runs playbook.yml to deploy the services.

### Step 3: Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Project structure

```
yolo-project/
├── roles/              # Ansible roles directory
│   ├── setup-mongodb/
│   │   ├── tasks/
│   │   │   └── main.yml
│   │   └── vars/
│   │       └── main.yml
│   ├── backend-deployment/
│   │   ├── tasks/
│   │   │   └── main.yml
│   │   └── vars/
│   │       └── main.yml
│   └── frontend-deployment/
│       ├── tasks/
│       │   └── main.yml
│       └── vars/
│           └── main.yml
└── playbook.yml        # Main Ansible playbook
└── Vagrantfile         # Vagrant configuration file
```


## Explanation of Roles

### frontend-deployment
- Pulls and runs the frontend Docker container.
- Exposes port 3000 for browser access.

### setup-mongodb
- Pulls and runs the MongoDB Docker container.
- Exposes port 27017 and persists data using a volume.

### backend-deployment
- Pulls and runs the backend Docker container.
- Exposes port 5000 for API access.
- Depends on the MongoDB container.

## Additional Notes
- Ensure Docker is installed and running on the virtual machine.
- Use vagrant destroy to clean up resources after testing.

## License
This project is licensed under the MIT License.



