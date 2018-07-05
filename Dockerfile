FROM node:9.11.1-alpine

RUN npm install -g vue-cli

COPY . /opt/philly-fliers
WORKDIR /opt/philly-fliers
