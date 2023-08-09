const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env')
});
const express = require('express');
const livereload = require('livereload');
const connectLiveReload = require("connect-livereload");
const https = require('https');
const app = express();
const port = 3000;

// live reload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

app.use(connectLiveReload());

//website
app.get('/apps/weather', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/apps/weather.html'));
});
app.get('/apps/spacexmap', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/apps/spaceXMap.html'));
});
app.get('/imprint', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/imprint.html'));
});

// api calls
app.get('/weather', (req, res) => {
  https.request({
    host: 'api.openweathermap.org',
    path: `/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`,
    method: 'GET'
  }, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      res.send(data);
    });
  }).end();
});
app.get('/direct', (req, res) => {
  https.request({
    host: 'api.openweathermap.org',
    path: `/geo/1.0/direct?q=${req.query.q}&appid=${process.env.WEATHER_API_KEY}&units=metric&limit=20`,
    method: 'GET'
  }, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      res.send(data);
    });
  }).end();
});
app.get('/forecast', (req, res) => {
  https.request({
    host: 'api.openweathermap.org',
    path: `/data/2.5/forecast?lat=${req.query.lat}&lon=${req.query.lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`,
    method: 'GET'
  }, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      res.send(data);
    });
  }).end();
});

// serve static files
app.use(express.static(path.join(__dirname, 'public')));
// redirect everything else to index.html
app.get('*', (req, res) => {
  res.redirect('/');
});

// start server on ipv4 and ipv6
app.listen(port, '::', () => {});

console.log(process.env.WEATHER_API_KEY)