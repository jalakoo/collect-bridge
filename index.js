const express = require('express')
const request = require('request')
const path = require('path')
const parser = require('body-parser');
const urlencodedparser = require('urlencoded-body-parser')
const PORT = process.env.PORT || 5000
const collect = "https://collect.tealiumiq.com/event"
const source = "collect-bridge"

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(parser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .post('/post/urlencodedform/:account/:profile/:event', (req, res) => convertPathedUrlEncodedForm(req, res) )
  .post('/post/urlencodedform', (req, res) => convertUrlEncodedForm(req, res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

// Adds param paths with body data for new request
function convertPathedUrlEncodedForm(req, res) {
  urlencodedparser(req).then(data => {
    let account = req.params.account
    let profile = req.params.profile
    let event = req.params.event
    let newContent = {tealium_account:account,
                      tealium_profile:profile,
                      tealium_event: event}
    let newBody = Object.assign(newContent, data)
    console.log(JSON.stringify(newBody))
    forward(newBody, res)
  }).catch(function(error){
    res.status(404).send(error)
  })
}

// Aggregates query string params with x-www-form-urlencoded data
function convertUrlEncodedForm(req, res) {
  urlencodedparser(req).then(data => {
    let queries = req.query
    let newBody = Object.assign(queries, data)
    req.body = newBody
    forward(newBody, res)
  }).catch(function(error){
    res.status(404).send(error)
  })
}

// Forwards request to Collect endpoint
function forward(newBody, res) {
  if (bodyValid(newBody) == false ) {
    res.status(400).send("Request body missing tealium_account or tealium_profile")
    return
  }
  newBody['forwarded_by'] = source
  let flattenedBody = flattenObject(newBody)
  request.post(
    collect,
    {json: flattenedBody},
    function(error, response, body){
      if (error) {
        console(error)
      }
      res.status(response.statusCode).send(body)
    }
  )
}

// Checks to see if the new body has the required collect keys
function bodyValid(body) {
  if (body.tealium_account == undefined) {
    return false
  }
  if (body.tealium_account == "") {
    return false
  }
  if (body.tealium_profile == undefined) {
    return false
  }
  if (body.tealium_profile == "") {
    return false
  }
  return true
}

function flattenObject(ob) {
  let toReturn = {};
  let flatObject;
  for (let i in ob) {
  	// console.log(i+ ' ' + typeof(ob[i]));
    if (!ob.hasOwnProperty(i)) {
      continue;
    }
    //Exclude arrays from the final result
    //Check this http://stackoverflow.com/questions/4775722/check-if-object-is-array
    if(ob[i] && Array === ob[i].constructor){
    	continue;
    }
    // Parse
    if ((typeof ob[i]) === 'string' && isJson(ob[i]) == true ){
        ob[i] = JSON.parse(ob[i])
    }
    if ((typeof ob[i]) === 'object') {
      flatObject = flattenObject(ob[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) {
          continue;
        }
        //Exclude arrays from the final result
        if(flatObject[x] && Array === flatObject.constructor){
        	continue;
        }
        toReturn[i + (!!isNaN(x) ? '.' + x : '')] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

function isJson(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}