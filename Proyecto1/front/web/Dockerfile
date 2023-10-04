FROM node:19.0.0-alpine as build

RUN mkdir -p /src
WORKDIR /src

COPY . /src

RUN npm install

RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]