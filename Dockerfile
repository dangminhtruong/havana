FROM node:9.5.0
WORKDIR /app
ADD . /app
RUN npm install
RUN npm i -g nodemon
CMD ["npm", "start"]
EXPOSE 3000