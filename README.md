# COLLECT-BRIDGE
Simple forwarding service for the reformatting POST calls using x-www-urlencoded forms to expected JSON body POST calls for Tealium Collect endpoint.

# USAGE
## POST With Query String Params
PATH: `/post/urlencodedform`
Any query string param will be appended to the requests x-www-urlencoded body.

- Example URL: /post/urlencodedform?tealium_account=test&tealium_profile=main
- Example original request body: { "aFormKey" : "aFormValue" }
- Example output JSON body: { "aFormKey" : "aFormValue" , "tealium_account" : "test", "tealium_profile" : "main"}

## POST With Paths
PATH: `/post/urlencodedform/:account/:profile/:event`
URL Params will be added into the requrest's x-www-urlencoded body.

- Example URL: /post/urlencodedform/test/main/a_descriptive_name
- Example original request body: { "aFormKey" : "aFormValue" }
- Example output JSON body: { "aFormKey" : "aFormValue" , "tealium_account" : "test", "tealium_profile" : "main", "tealium_event" : "a_descriptive_name" }

# DEPLOYING
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
