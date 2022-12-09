# Digital Republic Code Challenge

In this readme you will see:

- [Backend](#backend)
  - [Setup and run API](#setup-and-run-api)
  - [API Routes](#api-routes)
- [Frontend](#frontend)
  - [Setup and run frontend](#setup-and-run-frontend)
- [Other commands](#other-commands)
  - [Linter](#linter)
  - [Test](#test)

# Backend

This backend is created using Node.js with Express.js, Prisma ORM and jwt authentication

## Setup and run API

- Clone this repository:
```zsh
git clone https://github.com/KauaLimaMartins/Digital-Republic-Code-Challange.git
```

- Open the project in a terminal and enter the backend folder: 
```zsh
cd backend
```

- Install node_modules:
```zsh
npm install
```

- Now, you need to create an .env file and copy and past this:
```env
JWT_SECRET=segredo
JWT_EXPIRATION=1d

DATABASE_URL="file:./dbs/dev.sqlite"
```

Now, you can run the api in development mode by running
```zsh
npm run dev
```

Or run it in build mode running
```zsh
npm run build && npm run start
```

DO NOT CLOSE THE TERMINAL THAT IS RUNNING THE API

Note: You can only access the API from the frontend, because CORS its only enabled to frontend

Note: you do not need to run a docker database or anything else, because the project runs in a sqlite database to make it easier to run

## API routes

In this API we have 4 routes

- POST ``` /api/register ``` To register a new account. This route need to recive 2 body parameters: "full_name" of type string and "cpf" of type string

- POST ``` /api/login ``` To login in the account. This route need to recive 2 body parameters: "full_name" of type string and "cpf" of type string

- GET ``` /api/account ``` To get logged account full_name and balance. This route do not need to recive any parameter and you must be logged to access this route

- POST ``` /api/account/deposit ``` To deposit a value to your account balance. This route need to recive 1 body parameter: "depositValue" of type number and you must be logged to access this route

- POST ``` /api/account/transfer ``` To transfer a value of your account balance to another account balance. This route need to recive 2 body parameters: "transferValue" of type number and "cpfToTransfer" of type string and you must be logged to access this route

# Frontend

This frontend is created using React.js with Next.js, SSR (server side rendering) and tailwind css

## Setup and run frontend

- Without close the api terminal, open the project in another terminal and enter the frontend folder: 
```zsh
cd frontend
```

- Install node_modules:
```zsh
npm install
```

Note: You do not need to create an .env file to run the frontend

Now, you can run the api in development mode by running
```zsh
npm run dev
```

Or run it in build mode running
```zsh
npm run build && npm run start
```

So, open in your browser ``` http://localhost:3000 ``` to access the website

DO NOT CLOSE THE TERMINAL THAT IS RUNNING THE FRONTEND NOR WHAT IS RUNNING THE BACKEND

Now have fun :)

# Other commands

Both in the backend and the frontend you can run the following commands

## Linter
You can run
```zsh
npm run lint
```
to see if the project has linting errors, if this command do not show nothing, it means that do not has linting errors in the project, but if you change, for example, a double quoted string to a single quoted string and run the command again, the linting will show an error.

## Test
You can also run
```zsh
npm run test
```
to run the tests of the project, and to see the test code it is in "tests" folder
