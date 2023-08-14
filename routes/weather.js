var express = require('express');
const router = express.Router();
const https = require('https');

router.get('/weather', (req, res) => {
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
router.get('/direct', (req, res) => {
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
router.get('/forecast', (req, res) => {
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

module.exports = router;