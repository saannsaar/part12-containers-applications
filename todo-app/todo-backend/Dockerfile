FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production --omit=dev

ENV DEBUG=todo-backend:*

USER node

CMD npm start

