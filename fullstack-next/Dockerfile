FROM node:18

WORKDIR /usr/src/brilliantwear-fullstack-next

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

# Will build the next.js fullstack server for production
RUN npm run build

# Will start the next.js server
CMD ["npm", "run", "start"]
