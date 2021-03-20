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
4. Start Docker and then run the command.
  ```sh
  docker-compose up
  ```
4. The server will start at `http://localhost:4000` and the client at `http://localhost:3000`.
5. The `docker-compose.yml` file is using volumes for both server and client, so there will be live updates when a file changes.