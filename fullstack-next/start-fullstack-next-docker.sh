#!/usr/bin/env bash

docker build -t cscphilip/brilliantwear-fullstack-next:latest .
docker stack deploy -c fullstack-next-compose.yml next-server-stack
