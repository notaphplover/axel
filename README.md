[![Build status](https://github.com/notaphplover/axel/workflows/ci/badge.svg)](https://github.com/notaphplover/axel/workflows/ci/badge.svg)

# Axel

The not-an-mtg-engine open project! (In progress)

## Status of the project

This project was born as a test to try new software architecture approaches DDD based.

This project is now a WIP with no roadmap, so ***don't put your faith in it*** (for now).

## Getting started

1. Clone the repo.
2. Install the dependencies:

```
npm ci
```

3. Build the source code:

```
npm run build
```

4. Run the setup script

```
npm run setup:local
```

5. Launch docker images:

```
docker-compose up
```

6. Start local server

```
npm run start
```

7. Enjoy!

### Tests

Tests can be passed with the test script

```
npm t
```

***Note***: Non unit tests may require all the docker images up

```
npm run docker:up:test
```

## Launching services

Services can be launched in multiple ways.

### Using dockerized services

Just follow the steps on the `Getting started` section and start run the docker-compose build:

```
docker-compose up
```

Once the docker services are up, just start the local server:

```
npm run start:prod
```

### Using kubernetes services

This project includes a kubernetes config to launch a cluster at the `kubernetes` folder. You can use minikube to launch the cluster.

```
minikube start
```

Keep in mind ingress addon must be enabled. You can enable this addoin with the following command:

```
minikube addons enable ingress
```

The backend deployment is accesed through an ingress. The following command is required to allow the backend service to be reachable from the host machine:

```
minikube tunnel
```

Now you can load the config

```
kubectl apply -f ./kubernetes
```

Wait for the pods to be ready. Once they are, the API should be accesed through the external IP of the `backend-service` service

```
kubectl get services backend-service
```
