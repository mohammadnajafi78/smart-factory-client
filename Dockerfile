#FROM node:14.17.1-alpine3.13 AS build-step

#WORKDIR /build
#COPY package.json ./
#ENV NODE_OPTIONS --max_old_space_size=4096
#RUN yarn install --network-timeout 1000000

#COPY . .
#RUN yarn build

#FROM nginx:1.12-alpine
#COPY --from=build-step build/build /usr/share/nginx/html
#COPY ./nginx.conf /etc/nginx/conf.d/default.conf



# Install dependencies only when needed
FROM node:14.17.1-alpine3.13 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn config set cache-folder /.yarn-cache/
RUN yarn install --frozen-lockfile  --network-timeout 1000000

# Rebuild the source code only when needed
FROM node:14.17.1-alpine3.13 AS builder
WORKDIR /app
ENV NODE_OPTIONS --max_old_space_size=4096
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /.yarn-cache /.yarn-cache
RUN yarn config set cache-folder /.yarn-cache
COPY . .
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# nginx serve
FROM nginx:1.12-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN cd /usr/share/nginx/html

COPY --from=builder app/build /usr/share/nginx/html

#COPY --from=builder /app/package.json ./package.json
#COPY --from=builder /app/node_modules ./node_modules
#COPY --from=builder /app/public ./public
#COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
#COPY --from=builder /app/server.js ./server.js
#COPY --from=builder /app/static ./static







