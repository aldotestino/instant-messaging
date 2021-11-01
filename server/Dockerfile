FROM node:14
ARG DATABASE_URL
WORKDIR /usr/app/server
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run migrate:dev --name init
# RUN npm run migrate:deploy
RUN npm run generate
# RUN npm run seed
RUN npm run build
CMD npm start