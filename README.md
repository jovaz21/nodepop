> RESTful API using NodeJS, Express and Mongoose for 'nodepop' Mobile App

## Features

 - **Users Management** - Only for Registered Users (the API provides a registration service for App users)
 - **Ads Querying** - Complete listing, searching and filtering interface including pagination capability
 - **I18N Errors** - Error Messages are provided in the requested language (if supported/provided, 'en' otherwise)

## Commands

After you generate your project, these commands are available in `package.json`.

```bash
npm run mongod # run the MongoDB server
npm run nodepop_db_setup # setup the 'nodepop' database (drop and reload 'tags' and 'ads' datasets)
npm run start # run the API Server (default mode)
npm run dev # run the API Server in development mode (through nodemon and --inspect option set)
npm run lint # lint using ESLint
```
Make sure, before running any of the `npm run XXX` commands, to have at first the following environment variables, correctly set:
```bash
$ NODE_PATH # the pathname to the project's folder
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

```
nodepop/
├─ setenv
├─ setenv.cmd
|
├─ mongodb/
│  ├─ setup_datasets.js
│  ├─ ads-dataset.json
│  ├─ tags-dataset.json
│  └─ users-dataset.json
|
├─ public/
│  └─ images/
│     └─ articles/*.jpg
|
├─ services/
│  └─ nodepop/
│     └─ apiv1/
|     |  ├─ ads.js
|     |  ├─ tags.js
|     |  └─ users.js
│     └─ helpers/
|     |  └─ security/
│     |     ├─ index.js
│     |     └─ authorization.js
│     └─ model/
|        ├─ index.js
|        └─ error.js
│        └─ data/
│           ├─ _DataSource.json
│           ├─ Add.js
│           ├─ Tag.js
│           └─ User.js
├─ lib/
│  └─ txw/
│     ├─ index.json
│     └─ utils/
|        └─ StringUtils.js
|
└─ app.js
```

#### /setenv

Convenience shell script to setup the environment variables used by the NPM scripts.

#### /mongodb/

This is where the MONGO Database Server stuff si registered (at first there are only dataset files).

#### /public/images/articles/*.jpg

The photos of the articles.

#### /services/nodepop/

This is where the implementation of the RESTful API (`apiv1/` subfolder) is located, along with the "Business Model" layer (`model/` subfolder). The model package follows the "Façade Design Pattern" (a simple interface is provided) so that the details and complexities of the "Business Model" layer are perfectly hidden to the clients.

## TODO

-	Implementation of '/nodepop/apiv1/ads' Services (GET|GET:id|PUT|DELETE)
-	Clustering

## Credits

Thanks to all [contributors](https://github.com/jovaz21/nodepop/graphs/contributors)

## License

MIT © [Johann Vázquez](https://github.com/jovaz21)