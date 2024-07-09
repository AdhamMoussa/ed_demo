# EdDemo

## Requirements

- Nodejs v20 or higher
- Docker

## Installation

1. Clone the repository
2. Run `docker compose up` to start the database
3. run `cp apps/api/.env.example apps/api/.env` to create the environment file
4. run `cp apps/frontend/.env.example apps/frontend/.env` to create the environment file
5. Run `npm install` to install the dependencies
6. Run `npm run db:migrate` to apply DB migrations
7. Run `npm run db:seed` to seed the database
8. Run `npm run dev` to start the server
9. Visit `http://localhost:3000` to view the application
