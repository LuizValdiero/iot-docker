FROM node:dubnium-alpine

COPY ./ /home/node/app

WORKDIR /home/node/app

RUN npm install

COPY . .


CMD ["npm","start"]