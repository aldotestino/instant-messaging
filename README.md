## Instant Messaging

### A simple realtime chat app

### Stack
* Node.js
* Graphql
* Apollo
* Prisma
* React
* Typescript

### Usage

1. In `server` rename `.env.sample` file in `.env` and change JWT_SECRET.
2. Install the dependencies in both `client` and `server`.
  ```sh
  cd server
  npm i
  cd ../client
  npm i
  ```
3. Start Docker and then run the command.
  ```
  docker-compose up
  ```
4. To migrate the database open the `server` container in another terminal.
  ```sh
  docker ps
  docker exec --it server /bin/bash
  ```
5. Run the migration and generation with prisma.
  ```sh
  npm run migrate --name init
  npm run generate
  ```
6. The server will start at `http://localhost:4000` and the client at `http://localhost:3000`.
7. The `docker-compose.yml` file is using volumes for both server and client, so there will be live updates when a file changes.