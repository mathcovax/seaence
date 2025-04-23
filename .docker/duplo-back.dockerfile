FROM node:22.14-alpine3.20

WORKDIR /home/node/project

COPY ../ .

EXPOSE 80