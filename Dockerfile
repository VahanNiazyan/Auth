FROM node:17-alpine as base
WORKDIR /app
COPY . /app
RUN yarn install && yarn run build

FROM nginx:alpine
COPY --from=base /app/dist /usr/share/nginx/html
