FROM nginx:1.27.5-alpine3.21

WORKDIR /home/nginx/project

COPY ../ .

EXPOSE 80