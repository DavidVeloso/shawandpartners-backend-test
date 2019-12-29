## Shaw and partners back-end test
Full test description: [https://shawandpartners.com/full-back-front-test/](https://shawandpartners.com/full-back-front-test/)

This structure is based on my [Hapi Boilerplate project](https://github.com/DavidVeloso/Hapi-Api-Boilerplate)

## Technology
- **Hapi** - Server side framework
- **Docker** - Docker container support
- **Lab** - Unit test framework
- **Joi** - Schema validation
- **Dotenv** - Environment variable emulator
- **Good** - Logger mechanism

## .env config
To set up environment variables, please copy '.env.example' file to '.env' file at the root location and define the following properties:

```
NODE_ENV=development    // Node environment 
PORT=3000    // Server Port
SERVER_HOST=0.0.0.0   // Hapi Server host
ALLOWED_DOMAINS=http://localhost:8080 // (Cors) Add all allowed domains origins separated by a comma
GITHUB_API_URL=https://api.github.com 
```

## Running the server in Docker Container
Docker and docker compose must be installed on the system.

  1.  Enter on project dir
  2. Build containers using 
  ```shell 
     $ docker-compose build
   ```
  3. Run conteiners:
   ```shell 
     $ docker-compose up -d // use '-d' for run containers in the background
   ```
  4. To stop conteiners use:  
   ```shell 
     $ docker-compose down
   ```

##To Run locally

**Check if you have a recent version of [Node.js](https://nodejs.org/) (which comes bundled with [npm](https://www.npmjs.com/), a JavaScript package manager):**

```bash
$ node -v
```

```bash
$ npm -v
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development mode using nodemon
$ npm run dev

# normal mode
$ npm start

```

## Testing
   This boilerplate supports unit test cases using 'lab' and 'code' packages.

To run all the test cases:
```sh
$ yarn test
```

## License
   MIT
