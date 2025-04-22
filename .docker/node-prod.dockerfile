FROM node:22.14-alpine3.20

ENV NODE_ENV=production
ENV ENVIROMENT=PROD

WORKDIR /home/node/project

COPY . .

USER 1000