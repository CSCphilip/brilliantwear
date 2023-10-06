#!/usr/bin/env bash

docker build -t cscphilip/brilliantwear-backend:latest .
docker stack deploy -c brilliantwear-backend-docker-compose-file.yml bw-stack

# Old:
# To create one container:
#docker run -p 7000:7000 --add-host=mongoservice:172.17.0.1 -d cscphilip/brilliantwear-backend
