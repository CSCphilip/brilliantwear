FROM node:18

WORKDIR /app

COPY . .

# Create directory to store dumps which will be mounted to the host
RUN mkdir /app/dump

# Install mongodump amongst ohters
RUN wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | apt-key add -
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-6.0.list
RUN apt-get update
RUN apt install mongodb-org-tools -y

CMD [ "node", "backup.js" ]
