FROM node:22.14

WORKDIR /home/node/project

COPY ../ .

EXPOSE 80

RUN npm install