FROM node:9.5.0

#Author
MAINTAINER dangminhtruong

WORKDIR /app
ADD . /app
RUN npm install

#Install nodemon

RUN npm i -g nodemon
CMD ["nodemon", "-L"]

EXPOSE 3000