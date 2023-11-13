#!/usr/bin/env bash

docker build -t cscphilip/brilliantwear-backend:latest .
docker stack deploy -c compose-backend.yml bw-backend

# To create one container:
#docker run -p 7000:7000 --add-host=mongoservice:172.17.0.1 -d cscphilip/brilliantwear-backend
