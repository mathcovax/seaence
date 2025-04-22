FROM nginx:1.27.5-alpine3.21

COPY ./dist /spotter

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80