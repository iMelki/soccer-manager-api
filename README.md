# Soccer Manager REST API

> Node.js Nest.js API. Using Postgres & Redis

## Description
A soccer online manager game RESTful API 
An application where football/soccer fans can create fantasy teams and are able to sell or buy players.

### Project Introduction
- Support ES6/ES7 features
- Using Eslint followed [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Husky
- Commitizen
- Docker
- Prettier

## Features
##### Security:
- bcrypt (for password hashing)
##### Authentication:
- passport local strategy
- jwt authentication
- RBAC 
##### Session Storage:
- PostgreSQL
- Redis
##### Integration testing
- mocha
- chai

## Requirements

- node >= 12
- npm >= 6
- postgres >= 13
- typescript >= 3.0

## Installation

First, install [node.js](https://nodejs.org/).
Then install app dependencies, using:

```bash
npm install 
```

Then generate your new project:

```bash
yo nest-js-boilerplate
```

App Skeleton:

```
├── docker
│├── postgres
││   └── ...
│└── App.Dockerfile
├── src
│├── routes
││├── app
│││   └── ...
││└── v1
││ ├── auth
││ │   └── ...
││ ├── users
││ │   └── ...
││ ├── teams
││ │   └── ...
││ ├── players
││ │   └── ...
││ └── ...
│├── data
││├── migrations
│││   └── ...
││└── seed
││    └── ...
│├── interfaces
││   └── ...
│├── interceptors
││   └── ...
│├── decorators
││   └── ...
│├── constants
││   └── ...
│├── config
││   └── ...
│├── filters
││   └── ...
│├── guards
││   └── ...
│├── utils
││   └── ...
│└── main.ts
├── docker-compose.yml
├── index.js
├── nest-cli.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json

```

## Running the API
### Development
To start the application in development mode, run:

```bash
npm run start:dev
```

Start the application in production env:

Install ts pm2 and typescript compiler:
```
npm install -g pm2
pm2 install typescript
```

example start with scale on 2 core:
```
pm2 start ./dist/main.js -i 2 --no-daemon
```

Express server listening on http://localhost:3000/, in development mode
The developer mode will watch your changes then will transpile the TypeScript code and re-run the node application automatically.

### Docker

* [Install Docker](https://docs.docker.com/get-docker/)
* [Install docker-compose](https://docs.docker.com/compose/install/)

To run your app in docker containers :
 
#### Lift up your app in docker 
``` 
  docker-compose up 
```
  
## Set up environment
In root folder you can find `.env.example`. You can use this config or change it for your purposes.
Same goes with the config folder.

        
## Swagger
Swagger documentation will be available on route:
```bash
http://localhost:3000/api
```
![Alt Text1](https://media.giphy.com/media/XEUyeEL03IcaZYw6SB/giphy.gif)

### Jwt auth
![Alt Text2](https://media.giphy.com/media/QUKuolFMyd0WsNFIUH/giphy.gif)

