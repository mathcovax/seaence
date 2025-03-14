FROM node:22.14-alpine3.20

ENV NODE_ENV=production

WORKDIR /home/node/project

COPY . .

USER 1000

RUN npm install

CMD ["npm", "run"]