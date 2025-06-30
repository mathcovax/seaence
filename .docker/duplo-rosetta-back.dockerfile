FROM mcr.microsoft.com/playwright:v1.53.1-noble

WORKDIR /home/node/project

COPY ../ .

EXPOSE 80

RUN npm install