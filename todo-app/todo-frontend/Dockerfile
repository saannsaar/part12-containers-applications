FROM node:16 AS base

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV REACT_APP_BACKEND_URL=http://localhost:3000

FROM base AS test

RUN CI=true npm test

FROM base AS build-stage

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
