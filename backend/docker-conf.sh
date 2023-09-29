docker build -t cscphilip/brilliantwear-backend .
docker run -p 7000:7000 --add-host=mongoservice:172.17.0.1 -d cscphilip/brilliantwear-backend # To create one container
docker stack deploy --compose-file brilliantwear-backend-docker-compose-file.yml bw-stack # To create a stack of containers