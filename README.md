# COLLECT-BRIDGE
Simple forwarding service for the reformatting POST calls using x-www-urlencoded forms to expected JSON body POST calls for Tealium Collect endpoint.

# USAGE
## With Query String Params
PATH: /post/urlencodedform
Any query string param will be appended to the requests x-www-urlencoded body.

Example URL: /post/urlencodedform?tealium_account=test&tealium_profile=main
Example original request body: { "aFormKey" : "aFormValue" }
Example output JSON body: { "aFormKey" : "aFormValue" , "tealium_account" : "test", "tealium_profile" : "main"}

## With Paths
PATH: /post/urlencodedform/:account/:profile/:event
URL Params will be added into the requrest's x-www-urlencoded body.

Example URL: /post/urlencodedform/test/main/a_descriptive_name
Example original request body: { "aFormKey" : "aFormValue" }
Example output JSON body: { "aFormKey" : "aFormValue" , "tealium_account" : "test", "tealium_profile" : "main", "tealium_event" : "a_descriptive_name" }


## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
