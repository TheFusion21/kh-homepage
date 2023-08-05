require('dotenv').config();
const express = require('express');
const https = require('https');
const app = express();
const port = 80;

//website
app.get('/apps/weather', (req, res) => {
  res.sendFile(__dirname + '/public/apps/weather.html')
});
app.get('/apps/calculator', (req, res) => {
  res.sendFile(__dirname + '/public/apps/calculator.html')
});
app.get('/imprint', (req, res) => {
  res.sendFile(__dirname + '/public/imprint.html')
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
app.use(express.static('public'));
// redirect everything else to index.html
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});