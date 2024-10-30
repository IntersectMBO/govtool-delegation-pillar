FROM node:lts-hydrogen

WORKDIR /dist

COPY package*.json ./

RUN npm install

COPY . /dist

RUN npm run build

ENTRYPOINT ["/bin/sh", "-c", "npm run start:prod"]