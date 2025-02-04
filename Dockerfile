FROM node:20-alpine
WORKDIR /usr/src/app


COPY package.json ./
RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

USER node
EXPOSE 3000

CMD [ "npm", "start" ]