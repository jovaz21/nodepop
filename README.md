> RESTful API using NodeJS, Express and Mongoose for 'nodepop' Mobile App

## Features

 - **Users Management** - Only for Registered Users (the API provides a registration service for App users)
 - **JSON Web Token** - JWT-based Authentication & Authorization mechanism
 - **Ads Querying** - Complete listing, searching and filtering interface including pagination capability
 - **I18N Errors** - Error Messages are provided in the requested language (if supported/provided, 'en' otherwise)
 - **Clustering** - The server starts up 1 worker instance per CPU to fully make use of the available hardware capacity

## Commands

After you generate your project, the following commands are available in `package.json`.

```bash
npm run mongod # run the MongoDB server
npm run nodepop_db_setup # setup the 'nodepop' database (drop and reload 'users', 'tags' and 'ads' datasets)
npm run start # run the API Server (default mode)
npm run dev # run the API Server in development mode (uses `nodemon` with `--inspect` option set)
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
## Database Setup

The service is backed by a [MongoDB](https://www.mongodb.com/) database instance which must be ran in a terminal instance. To do so, just tap the following command:

```bash
$ npm run mongod
```
Once the database is running, then populate it with some 'users', 'tags' and 'ads' sample datasets using the following command:

```bash
$ npm run nodepop_db_setup
```
You're ready to start up the server!...

## Starting the Server

The Node.JS server our RESTful API uses is an [Express Server](https://www.expressjs.com/) which mus be run in another terminal instance. We provide 2 ways to start it up...

1./ Default Mode

```bash
$ npm run start
```
2./ Development Mode (uses `nodemon` with the --inspect option set)

```bash
$ npm run dev
```
Once this is done, you're ready to play with the API!

## Playing with the RESTful API

Authenticate (sign in) with the default provided `guest` account:
```bash
$ curl -X POST http://localhost:8080/nodepop/apiv1/users/authenticate -i -d "email=guest@foo.bar&password=guest"
```

It will return something like:
```bash
HTTP/1.1 200 OK
...
{
  "success": true,
  "result": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTJlZjYwYmZhZjdiMzU1ZjQ5YTU3MWEiLCJpYXQiOjE1MTMwNzkwMjQsImV4cCI6MTUxMzE2NTQyNH0.eNTTpqPT1cfQPD8lKvVQ3ed5cgmafHxt4yikWKOaX3o"
  }
}
```
Then, to be allowed to use the Ads API you must provide in each request this returned JSON Web Token. Let's see some of the implemented API requests:

Listing all the available `Tags`:
```bash
$ curl -X GET http://localhost:8080/nodepop/apiv1/tags -i -d "token=JSON_TOKEN_HERE"
```

Listing all the `Tags` actually used in the `Ads` collection:
```bash
$ curl -X GET http://localhost:8080/nodepop/apiv1/ads/tags -i -d "token=JSON_TOKEN_HERE"
```

Listing published `Ads`:
```bash
$ curl -X GET http://localhost:8080/nodepop/apiv1/ads -i -d "token=JSON_TOKEN_HERE"
```

## Registering New Users

The API implements an Account Registration service so that new users can be registered in the `users` database collection:
```bash
$ curl -X POST http://localhost:8080/nodepop/apiv1/users -i -d "name=jovaz&email=jovaz21@gmail.com&password=1234"
```

It will return something like:
```bash
HTTP/1.1 200 OK
...
{
  "success": true,
  "result": {
    "_id": "5a2fc5abd38ce436a89c4cb0",
    "name": "jovaz",
    "email": "jovaz21@gmail.com",
    "created": "2017-12-12T12:03:55.337Z"
  }
}
```
Then, the user can authenticate with:
```bash
$ curl -X POST http://localhost:8080/nodepop/apiv1/users/authenticate -i -d "email=guest@foo.bar&password=guest"
```

This returns a private JSON Web Token that must be included in every API request the user does.


## Ads Querying API

### Fields Extraction

Each `Ad` in the `ads` database collection has the following data:

```bash
{
  "type":           # Type of Ad (`sale`|`purchase`)
  "status":         # Status (`draft`|`published`)
  "statusDate":     # Last Status update Date
  "article": {
    "name":         # Name of the Article
    "description":  # Description
    "photo":        # Photo (JPEG archive in `public/images/articles/` folder)
  },
  "contact": {
    "type":         # Type of Contact (`professional`|`individual`)
    "name":         # Name of the contact
    "nickname":     # Nickname
    "phone":        # Phone number
    "country":      # Country Code (ex. '34' for Spain)
    "street":       # Street address
    "city":         # City
    "zipCode":      # Zip Code
    "web":          # Web URL
  },
  "amount":         # Price
  "stats": {
    "views":        # Number of accesses to this Ad
    "contacts":     # Number of contacts requested
  },
  "tags":           # Array of Tags
}
```
By default listing queries extract the following fields:

```bash
{
  "type":           # Type of Ad (`sale`|`purchase`)
  "article": {
    "name":         # Name of the Article
    "description":  # Description
    "photo":        # Photo (JPEG archive in `public/images/articles/` folder)
  },
  "contact": {
    "type":         # Type of Contact (`professional`|`individual`)
    "nickname":     # Nickname
  },
  "amount":         # Price
}
```
But if needed, the API allows to select the desired fields. For example, to extract only the `_id` and `tags` field:

```bash
$ curl -X GET "http://localhost:8080/nodepop/apiv1/ads?select=_id+tags" -i -d "token=JSON_TOKEN_HERE"
```

### Paginating

The pagination feature is based on the use of `skip` and `limit` parameters:

```bash
$ curl -X GET "http://localhost:8080/nodepop/apiv1/ads?skip=2&limit=2&select=tags" -i -d "token=JSON_TOKEN_HERE"
```

### Filtering by Article `Name` and/or `Tag` and/or by Ad `Type` (`sale`|`purchase`)

The API offers the `name`, `tag` and `type` parameters:

```bash
# All the Ads with names starting with `iphone`:
$ curl -X GET "http://localhost:8080/nodepop/apiv1/ads?name=iphone" -i -d "token=JSON_TOKEN_HERE"

# All the Ads with Articles for sale:
$ curl -X GET "http://localhost:8080/nodepop/apiv1/ads?type=sale" -i -d "token=JSON_TOKEN_HERE"

# All the Ads with `lifestyle` within their `Tags List`:
$ curl -X GET "http://localhost:8080/nodepop/apiv1/ads?tag=lifestyle" -i -d "token=JSON_TOKEN_HERE"
```

### Filtering by `Amount` (ranges of prices)

```bash
# All the Ads for 50 euros:
$ curl -X GET "http://localhost:8080/nodepop/apiv1/ads?range=50" -i -d "token=JSON_TOKEN_HERE"

# All the Ads with prices between 50 and 200 euros:
$ curl -X GET "http://localhost:8080/nodepop/apiv1/ads?range=50-200" -i -d "token=JSON_TOKEN_HERE"

# All the Ads with prices less than 500 euros:
$ curl -X GET "http://localhost:8080/nodepop/apiv1/ads?range=-500" -i -d "token=JSON_TOKEN_HERE"

# All the Ads with prices over 1000 euros:
$ curl -X GET "http://localhost:8080/nodepop/apiv1/ads?range=1000-" -i -d "token=JSON_TOKEN_HERE"
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

-	I18N Error Messages
-	Clustering

## Credits

Thanks to all [contributors](https://github.com/jovaz21/nodepop/graphs/contributors)

## License

MIT © [Johann Vázquez](https://github.com/jovaz21)