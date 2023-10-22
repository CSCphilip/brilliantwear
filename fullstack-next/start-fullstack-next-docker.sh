#!/usr/bin/env bash

# Do not run docker build on the AWS EC2 instance since it will crash the instance
#docker build -t cscphilip/brilliantwear-fullstack-next:latest .

docker stack deploy -c fullstack-next-compose.yml next-server-stack
