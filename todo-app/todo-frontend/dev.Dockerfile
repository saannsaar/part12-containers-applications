FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV REACT_APP_BACKEND_URL='localhost:3000'

CMD ["npm", "start"]