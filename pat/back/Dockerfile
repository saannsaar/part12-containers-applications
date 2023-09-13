FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

USER node

RUN npm run tsc -- -v

CMD npm start