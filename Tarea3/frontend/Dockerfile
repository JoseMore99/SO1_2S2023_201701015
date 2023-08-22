FROM node:19.0.0-alpine as build
# create & set working directory
RUN mkdir -p /src
WORKDIR /src
# copy source files
COPY . /src
# install dependencies
RUN npm install
# start app
RUN npm run build
EXPOSE 3000
# start app
CMD ["npm", "start"]