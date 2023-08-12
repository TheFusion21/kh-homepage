const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env')
});
const express = require('express');
const livereload = require('livereload');
const connectLiveReload = require("connect-livereload");
const https = require('https');
const cors = require('cors');
const apicache = require('apicache');
const app = express();
const port = 3000;

let cache = apicache.middleware;
// live reload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, '/public'));
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

app.use(connectLiveReload());
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));

//website
app.get('/apps/weather', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/apps/weather.html'));
});
app.get('/apps/ssc', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/apps/ssc.html'));
});
app.get('/apps/ssc/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/apps/ssc.html'));
});
app.get('/imprint', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/imprint.html'));
});

// weather api calls
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

// steam api calls
app.get('/api/featured', cache('1 minute'), (req, res) => {
  // get country code and language from request header
  const accepted = req.headers['accept-language'].split(',')[0];
  const country = accepted.split('-')[1];
  const language = 'english';
  https.request({
    host: 'store.steampowered.com',
    path: `/api/featured?cc=${country}&l=${language}`,
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

app.get('/api/featuredcategories', cache('1 minute'), (req, res) => {
  const accepted = req.headers['accept-language'].split(',')[0];
  const country = accepted.split('-')[1];
  const language = 'english';

  https.request({
    host: 'store.steampowered.com',
    path: `/api/featuredcategories?cc=${country}&l=${language}`,
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

app.get('/api/appdetails/:appid', cache('1 minute'), (req, res) => {
  const appid = req.params.appid;
  const accepted = req.headers['accept-language'].split(',')[0];
  const country = accepted.split('-')[1];
  const language = 'english';
  https.request({
    host: 'store.steampowered.com',
    path: `/api/appdetails?cc=${country}&l=${language}&appids=${appid}`,
    method: 'GET',
  }, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      // check if data is json
      try {
        JSON.parse(data);
      } catch (e) {
        res.status(500).send('Internal Server Error');
        return;
      }
      res.send(data);
    });
    response.on('error', (err) => {
      res.send(err);
    });
  }).end();
});

app.get('api/trailerslideshow', (req, res) => {
  const accepted = req.headers['accept-language'].split(',')[0];
  const country = accepted.split('-')[1];
  const language = 'english';
  https.request({
    host: 'store.steampowered.com',
    path: `api/trailerslideshow/?cc=${country}&l=${language}`,
    method: 'GET',
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

app.get('/api/search/:query', (req, res) => {
  const q = req.params.query;
  const accepted = req.headers['accept-language'].split(',')[0];
  const country = accepted.split('-')[1];
  const language = 'english';
  console.log(`/actions/SearchApps/${encodeURIComponent(q)}?cc=${country}&l=${language}`);
  https.request({
    host: 'steamcommunity.com',
    path: `/actions/SearchApps/${encodeURIComponent(q)}?cc=${country}&l=${language}`,
    method: 'GET',
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

// redirect everything else to index.html
app.get('*', (req, res) => {
  res.redirect('/');
});


module.exports = app;