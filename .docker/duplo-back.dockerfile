# syntax = devthefuture/dockerfile-x

FROM ./node.dockerfile

WORKDIR /home/node/project

COPY ../ .

EXPOSE 80

RUN npm install