# syntax=docker/dockerfile:1
FROM node:18-alpine

WORKDIR /app
COPY package.json .
# install python
RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*
RUN npm install

COPY . .
EXPOSE 3000
CMD ["npm", "start"]