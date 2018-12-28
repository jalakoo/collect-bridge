const express = require('express')
const request = require('request')
const path = require('path')
const parser = require('body-parser');
const urlencodedparser = require('urlencoded-body-parser')
const PORT = process.env.PORT || 5000
const collect = "https://collect.tealiumiq.com/event"

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(parser.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .post('/post/urlencodedform', (req, res) => convertUrlEncodedForm(req, res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

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
  request.post(
    collect,
    {json: newBody},
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