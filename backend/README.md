# Digital Republic Backend Code Challenge

In this readme you will see:

- [How to run the API](#how-to-run-the-api)
- [API routes](#api-routes)
- [Other commands](#other-commands)
  - [Linter](#linter)
  - [Tests](#tests)

## How to run the API

- Clone this repository: ``` git clone https://github.com/KauaLimaMartins/digital-republic-backend-test.git ```

- Open the folder in a terminal and run: ``` npm install ``` to install all dependencies and create node_modules

- Create an .env file following the .env.example file or to a fast api review just copy and paste this:
```
PORT=4000

JWT_SECRET=segredo
JWT_EXPIRATION=1d

DATABASE_URL="file:./dbs/dev.sqlite"

```
Now, you can run the api in development mode running ``` npm run dev ```

Or run it in build mode running ``` npm run build ``` and after ``` npm run start ```

Note: you do not need to run a docker database or anything else, because the project runs in a sqlite database to make it easier to run

## API routes

In this API we have 4 routes

- POST ``` /api/register ``` To register a new account. This route need to recive 2 body parameters: "full_name" of type string and "cpf" of type string

- POST ``` /api/login ``` To login in the account. This route need to recive 2 body parameters: "full_name" of type string and "cpf" of type string

- POST ``` /api/account/deposit ``` To deposit a value to your account balance. This route need to recive 1 body parameter: "depositValue" of type number and you must be logged to access this route

- POST ``` /api/account/transfer ``` To transfer a value of your account balance to another account balance. This route need to recive 2 body parameters: "transferValue" of type number and "cpfToTransfer" of type string and you must be logged to access this route

## Other commands

### Linter
You can run ``` npm run lint ``` to see if the project has linting errors, if this command do not show nothing, it means that do not has linting errors in the project, but if you change, for example, a double quoted string to a single quoted string and run the command again, the linting will show an error.

### Tests
You can also run ``` npm run test ``` to run the tests of the project, and to see the test code it is in "tests" folder
