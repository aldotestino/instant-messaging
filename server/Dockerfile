FROM node
WORKDIR /usr/app/server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ./run.sh