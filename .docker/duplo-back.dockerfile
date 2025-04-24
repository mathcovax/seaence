FROM node:22.15.0-alpine3.21

RUN apk add --no-cache coreutils

WORKDIR /home/node/project

COPY ../ .

EXPOSE 80

RUN npm install