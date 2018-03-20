FROM node:9.5.0
MAINTAINER dangminhtruong
WORKDIR /app
ADD . /app
RUN npm install
RUN npm i -g nodemon

CMD ["nodemon", "-L", "cd databse/seeder && node category_seeder && node product_seeder && node user_seeder && node bill_seeder"]
EXPOSE 3000