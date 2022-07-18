#FROM nginx:1.12-alpine
#COPY build /usr/share/nginx/html
#COPY ./nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80


FROM node:14.17.1-alpine3.13 AS build-step

WORKDIR /build
COPY package.json package-lock.json ./
RUN yarn install --network-timeout 1000000

COPY . .
RUN yarn build

FROM nginx:1.12-alpine
COPY build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

