const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

const baseUrl = "http://www.strava.com";
const apiV3 = "api/v3";
const oauthUrl1 = "oauth/authorize?";
const oauthUrl2 = "oauth/token?";
const clientId = "89141";
const clientSecret = "76193f3141500530befa8a0e15482667f3d94bb2";
let accessToken = "initial_value";
let bearerToken = "initial_value";
let userId = "initial_value";
let token_type = "initial_value";

const activitiesReqUrlEndpoint = "athlete/activities";
let athleteReqUrlEndpoint = `/athletes/${userId}/stats`;

//const hostname = '127.0.0.1';
const webserverUrl = "http://localhost";
const port = 3000;

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require("cors");
const { send } = require('process');

const app = express();
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send("response");
})

app.get('/exchange_token', (req, res) => {
  res.send(req.query["code"]);
  accessToken = req.query["code"];
  let authUrl = `${baseUrl}/${oauthUrl2}client_id=${clientId}&client_secret=${clientSecret}&code=${accessToken}&grant_type=authorization_code`
  let method = "POST";
  sendRequest(authUrl, method, getMainTokens);
  
})

app.get('/activities', (req, res) => {
  url = `${baseUrl}/${apiV3}/${activitiesReqUrlEndpoint}`;
  sendRequest(url, "GET", sendBack, res);
})

app.get('/activity/:id', (req, res) => {
  let activityReqUrlEndpoint = `activities/${req.params.id}`;
  url = `${baseUrl}/${apiV3}/${activityReqUrlEndpoint}`;
  sendRequest(url, "GET", sendBack, res);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function getMainTokens(data, res){
  userId = data["athlete"]["id"];
  token_type = data["token_type"];
  bearerToken = data["access_token"];
}

function sendBack(data, res){
  res.send(data);
  //console.log(data);
}

function sendRequest(url, method, callback, res){
  // console.log("calling " + url);
  fetch(url, {
      method: method, // or 'PUT'
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`
      },
  })
      .then(response => response.json())
      .then(data => {
          if (callback != undefined) {
              callback(data, res);
          }
      })
      .catch((error) => {
          console.error('Error:', error);
      });
}



