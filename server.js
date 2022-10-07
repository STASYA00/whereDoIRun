// const fetch = (...args) =>
//   import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const baseUrl = "http://www.strava.com";
const apiV3 = "api/v3";
const oauthUrl1 = "oauth/authorize?";
const oauthUrl2 = "oauth/token?";
const clientId = "89141";
const clientSecret = "76193f3141500530befa8a0e15482667f3d94bb2";
let accessToken = "initial_value";
let bearerToken = "2b56d93ef9dea4445a6d087ea90e6a689f4b2fec"; //"initial_value";
let userId = "initial_value";
let token_type = "initial_value";

const activitiesReqUrlEndpoint = "athlete/activities";
const authAthleteReqUrlEndpoint = "athlete";
let athleteReqUrlEndpoint = `/athletes/${userId}/stats`;

//const webserverUrl = '127.0.0.1';
const webserverUrl = "http://localhost";
const port = 3000;

const express = require('express');

const fs = require('fs');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require("cors");
const { send } = require('process');
const { v4: uuidv4 } = require('uuid');

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
  let accessToken = req.query["code"];
  let authUrl = `${baseUrl}/${oauthUrl2}client_id=${clientId}&client_secret=${clientSecret}&code=${accessToken}&grant_type=authorization_code`
  console.log(authUrl);
  let method = "POST";
  sendRequest(authUrl, method, getMainTokens);
  
})

app.get('/activities', (req, res) => {
  url = `${baseUrl}/${apiV3}/${activitiesReqUrlEndpoint}?per_page=80`;
  sendRequest(url, "GET", sendBack, res);
})

app.get('/athlete', (req, res) => {
  url = `${baseUrl}/${apiV3}/${authAthleteReqUrlEndpoint}`;
  sendRequest(url, "GET", sendBack, res);
})

app.get('/activity/:id', (req, res) => {
  console.log("Param: ", req.params.id);
  let activityReqUrlEndpoint = `activities/${req.params.id}`;
  url = `${baseUrl}/${apiV3}/${activityReqUrlEndpoint}`;
  sendRequest(url, "GET", sendBack, res);
})

app.get('/has_token', (req, res) => {
  let result = (bearerToken=="initial_value") ? "0" : "1";
  res.send(result);
})

app.get('/uuid', (req, res) => {
  
  res.send({"ID": uuidv4()});
})

app.get('/segments/:id', (req, res) => {
  console.log("Param: ", req.params.id);
  let activityReqUrlEndpoint = `segments/${req.params.id}`;
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
}

function sendRequest(url, method, callback, res){
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

app.get('/test/activities', (req, res) => {
  /*
  Test asset that returns a list of runner's activities from Strava API
  Simulates functionality of a request to get all the user activities
  */
  let rawdata = fs.readFileSync('./assets/activities.json');
  let r = JSON.parse(rawdata);
  res.send(r["activities"]);
})

app.get('/test/countries', (req, res) => {
  /*
  Test asset that returns a list of countries relevant to the runner's activity from overpass API
  Simulates functionality of a request to get the countries where a person has run
  */
  let rawdata = fs.readFileSync('./assets/countries.json');
  let r = JSON.parse(rawdata);
  res.send(r);
})

app.get('/test/sverige_coords', (req, res) => {
  /*
  Test asset that returns Sverige's boundary from nominatim API
  Simulates functionality of a request to get geometrical boundary of a country
  */
  let rawdata = fs.readFileSync('./assets/sverige_bounds.json');
  let r = JSON.parse(rawdata);
  res.send(r);
})

app.get('/test/norge_coords', (req, res) => {
  /*
  Test asset that returns Norway's boundary from nominatim API
  Simulates functionality of a request to get geometrical boundary of a country
  */
  let rawdata = fs.readFileSync('./assets/norge_bounds.json');
  let r = JSON.parse(rawdata);
  res.send(r);
})

app.get('/test/cities', (req, res) => {
  /*
  Test asset that returns a list of cities with their bounding boxes and properties from overpass API
  Simulates functionality of a request to get a list of cities within a specific country from overpass API
  */
  let rawdata = fs.readFileSync('./assets/sverige_cities.json');
  let r = JSON.parse(rawdata);
  res.send(r);
})

app.get('/test/zones/sthlm/whole', (req, res) => {
  /*
  Test asset that returns a list of cities with their bounding boxes and properties from overpass API
  Simulates functionality of a request to get a list of cities within a specific country from overpass API
  */
  let rawdata = fs.readFileSync('./assets/sthlm_zones.json');
  let r = JSON.parse(rawdata);
  res.send(r);
})

app.get('/test/zones/sthlm/ltd', (req, res) => {
  /*
  Test asset that returns a list of cities with their bounding boxes and properties from overpass API
  Simulates functionality of a request to get a list of cities within a specific country from overpass API
  */
  let rawdata = fs.readFileSync('./assets/sthlm_zones_ltd.json');
  let r = JSON.parse(rawdata);
  res.send(r);
})

app.get('/test/sthlm_bounds', (req, res) => {
  /*
  Test asset that returns a list of cities with their bounding boxes and properties from nominatim API
  Simulates functionality of a request to get a list of cities within a specific country from overpass API
  */
  let rawdata = fs.readFileSync('./assets/sthlm_bounds.json');
  let r = JSON.parse(rawdata);
  res.send(r);
})

app.get('/test/sodermalm_bounds', (req, res) => {
  /*
  Test asset that returns a list of cities with their bounding boxes and properties from nominatim API
  Simulates functionality of a request to get a list of cities within a specific country from overpass API
  */
  let rawdata = fs.readFileSync('./assets/sodermalm_bounds.json');
  let r = JSON.parse(rawdata);
  res.send(r);
})

