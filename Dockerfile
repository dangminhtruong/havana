FROM node:9.5.0
MAINTAINER dangminhtruong
WORKDIR /app
ADD . /app
RUN npm install
RUN npm i -g nodemon
RUN cd databse/seeder/
RUN node category_seeder
RUN node product_seeder
RUn node user_seeder
RUn node bill_seeder

CMD ["nodemon", "-L"]
EXPOSE 3000