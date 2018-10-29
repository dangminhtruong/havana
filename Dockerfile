FROM ubuntu:16.04

#Author
MAINTAINER dangminhtruong

#Work dir 

WORKDIR /app
ADD . /app

#Install curl 
RUN apt-get update && apt-get install -y curl

# Install Nodejs, Nodemon, Eslint, Babel-.., Yarn
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g nodemon eslint babel-eslint eslint-plugin-react yarn
# install packages
RUN npm install

# install mongoDB

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/4.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.0.list

RUN apt update -y && apt-get install -y mongodb-org

CMD ["sh","-c","service mongod start ; nodemon -L; cd database/seeder && node category_seeder.js && node product_seeder.js"]

EXPOSE 3000