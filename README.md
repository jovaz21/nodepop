> RESTful API using NodeJS, Express and Mongoose for 'nonepop' Mobile App

## Features

 - **My Feature** - Short explanation
 - **Another one** - And its short explanation

## Commands

After you generate your project, these commands are available in `package.json`.

```bash
npm run mongod # run the MongoDB server
npm run nodepop_db_setup # setup the 'nodepop' database (drop and reload 'tags' and 'ads' datasets)
npm run start # run the API Server (default mode)
npm run dev # run the API Server in development mode (through nodemon and --inspect option set)
npm run lint # lint using ESLint
```
Make sure, before running `npm run XXX`, to have the following environment variables, correctly set:
```bash
$ MONGODB_IP # the binding IP address for the MongoDB server
$ MONGODB_PORT # the binding PORT for the MongoDB server
$ MONGODB_NAME # the name of the MongoDB database
$ APISERVER_PORT # the binding PORT of the RESTful API server
```
## Playing locally

First, you will need to install and run [MongoDB](https://www.mongodb.com/) in another terminal instance.

```bash
$ mongod
```

Then, run the server in development mode.

```bash
$ npm run dev
Express server listening on http://0.0.0.0:8080, in development mode
```

Bla bla bla bla....
> Note that bla bla bla bla

Doing something:
```bash
The BASH here
```

It will return something like:
```bash
HTTP/1.1 201 Created
...
{
  "id": "57d8160eabfa186c7887a8d3",
  "name": "test",
  "picture":"https://gravatar.com/avatar/55502f40dc8b7c769880b10874abc9d0?d=identicon",
  "email": "test@example.com",
  "createdAt": "2016-09-13T15:06:54.633Z"
}
```

Authenticate the user (sign in):
```bash
curl -X POST http://0.0.0.0:9000/auth -i -u test@example.com:123456 -d "access_token=MASTER_KEY_HERE"
```

It will return something like:
```bash
HTTP/1.1 201 Created
...
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
  "user": {
    "id": "57d8160eabfa186c7887a8d3",
    "name": "test",
    "picture": "https://gravatar.com/avatar/55502f40dc8b7c769880b10874abc9d0?d=identicon",
    "email": "test@example.com",
    "createdAt":"2016-09-13T15:06:54.633Z"
  }
}
```

## Directory structure

### Overview

You can customize the `src` and `api` directories.

```
src/
├─ api/
│  ├─ user/
│  │  ├─ controller.js
│  │  ├─ index.js
│  │  ├─ index.test.js
│  │  ├─ model.js
│  │  └─ model.test.js
│  └─ index.js
├─ services/
│  ├─ express/
│  ├─ facebook/
│  ├─ mongoose/
│  ├─ passport/
│  ├─ sendgrid/
│  └─ your-service/
├─ app.js
├─ config.js
└─ index.js
```

### src/api/

Here is where the API endpoints are defined. Each API has its own folder.

#### src/api/some-endpoint/model.js

It defines the Mongoose schema and model for the API endpoint. Any changes to the data model should be done here.

#### src/api/some-endpoint/controller.js

This is the API controller file. It defines the main router middlewares which use the API model.

#### src/api/some-endpoint/index.js

This is the entry file of the API. It defines the routes using, along other middlewares (like session, validation etc.), the middlewares defined in the `some-endpoint.controller.js` file.

### services/

Here you can put `helpers`, `libraries` and other types of modules which you want to use in your APIs.

## TODO

- Support optional phone authentication
- Support optional email confirmation process
- Support Twitter and other social login methods
- Socket.io support

## Credits

Thanks to all [contributors](https://github.com/jovaz21/nodepop/graphs/contributors)

## License

MIT © [Johann Vázquez](https://github.com/jovaz21)