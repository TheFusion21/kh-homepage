const path = require('path');
require('dotenv').config({
  path: path.join(__dirname, '.env')
});
const express = require('express');
const livereload = require('livereload');
const connectLiveReload = require("connect-livereload");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const weather = require('./routes/weather');
const steam = require('./routes/steam');

// live reload
if (!process.env.RENDER) {
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, 'public'));
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 100);
  });

  app.use(connectLiveReload());
}
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/weather', weather);
app.use('/api/steam', steam);

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

app.get('/health', (req, res) => {
  res.send('OK');
});

// redirect everything else to index.html
app.get('*', (req, res) => {
  res.redirect('/');
});

// start server on ipv4 and ipv6
app.listen(port, '::', () => {});