FROM node:lts-alpine

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .

# Build
RUN npm build

#Execute
VOLUME ["/app/config"]
CMD [ "node", "lib/index.js" ]