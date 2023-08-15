var express = require('express');
const router = express.Router();
const apicache = require('apicache');

const bodyParser = require('body-parser');
const https = require('https');

router.use(bodyParser.json());

const cacheOptions = {
  statusCodes: {
    include: [200],
    exclude: [404, 500],
  },
}
const cache = apicache.options(cacheOptions).middleware;

const store = 'store.steampowered.com';
const api = 'api.steampowered.com';
const key = process.env.STEAM_API_KEY;
const headers = {
  'Accept': 'application/json',
  'User-Agent': 'SteamAPI/1.0.0 (kayhennig.de)'
};
const request = (path, host) => 
  new Promise((resolve, reject) => {
    https.request({
    host,
    path: `${path}${path.includes('?') ? '&' : '?'}key=${key}`,
    method: 'GET',
    headers
  }, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      if (response.headers['content-type'].includes('application/json')) {
        resolve(JSON.parse(data));
      } else {
        resolve(data);
      }
    });
    response.on('error', (err) => {
      reject(err);
    });
  }).end();
});


router.get('/featuredgames', cache('10 minutes'), (req, res) => {
  request('/api/featured', store).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/featuredcategories', cache('10 minutes'), (req, res) => {
  request('/api/featuredcategories', store).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/gamedetails/:appid', cache('10 minutes'), (req, res) => {
  request(`/api/appdetails/?appids=${req.params.appid}`, store).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/gamenews/:appid', cache('10 minutes'), (req, res) => {
  request(`/ISteamNews/GetNewsForApp/v2?appid=${req.params.appid}`, api).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/gameplayers/:appid', cache('10 minutes'), (req, res) => {
  request(`/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=${req.params.appid}`, api).then((data) => {
    res.send(data.toString());
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/gamereviews/:appid', (req, res) => {
  if (!req.body) {
    res.status(400).send('Missing required fields');
    return;
  }
  const start_date = req.body.start_date || -1;
  const end_date = req.body.end_date || -1;
  const date_range_type = req.body.date_range_type || 'all';
  const filter = req.body.filter || 'summary';
  const language = req.body.language || 'english';
  const review_type = req.body.review_type || 'all';
  const purchase_type = req.body.purchase_type || 'all';
  const playtime_filter_min = req.body.playtime_filter_min || 0;
  const playtime_filter_max = req.body.playtime_filter_max || 0;
  const filter_offtopic_activity = req.body.filter_offtopic_activity || 0;

  const path = `/api/appreviews/${req.params.appid}?json=1&start_date=${start_date}&end_date=${end_date}&date_range_type=${date_range_type}&filter=${filter}&language=${language}&review_type=${review_type}&purchase_type=${purchase_type}&playtime_filter_min=${playtime_filter_min}&playtime_filter_max=${playtime_filter_max}&filter_offtopic_activity=${filter_offtopic_activity}`;
  
  request(path, store).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/gamehover/:appid', cache('10 minutes'), (req, res) => {
  request(`/api/apphoverpublic/${req.params.appid}?json=1`, store).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/appsingenre/:genre', cache('10 minutes'), (req, res) => {
  request(`/api/getappsingenre/?genre=${req.params.genre}`, store).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
}); 

//cat_newreleases
//cat_topsellers
//cat_comingsoon
//cat_specials
router.get('/appsincategory/:category', cache('10 minutes'), (req, res) => {
  request(`/api/getappsincategory/?category=${req.params.category}`, store).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
}); 

router.get('/search', (req, res) => {
  if (!req.body || !req.body.term) {
    res.status(400).send('Missing required fields');
    return;
  }
  const term = req.body.term;
  const os = req.body.os || [];
  const tags = req.body.tags || [];
  const specials = req.body.specials || false;
  const hidef2p = req.body.hidef2p || false;
  const maxprice = req.body.maxprice || 0;

  const path = `/search/results/?term=${term}${os.length > 0 ? `&os=${os.join(',')}` : ''}${tags.length > 0 ? `&tags=${tags.join(',')}` : ''}&specials=${specials ? '1' : '0'}&hidef2p=${hidef2p ? '1' : '0'}${maxprice != 0 ? `&maxprice=${maxprice}` : ''}&json=1&ignore_preferences=1`;
  console.log(path);
  request(path, store).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
}); 

router.get('/allcategories', cache('24 hours'), (req, res) => {
  request('/actions/ajaxgetstorecategories', store).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});
router.get('/alltags', cache('24 hours'), (req, res) => {
  request('/actions/ajaxgetstoretags', store).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/allgenres', cache('24 hours'), (req, res) => {
  request('/api/getgenrelist', store).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/stats', cache('1 minute'), (req, res) => {
  request('/about/stats', 'www.valvesoftware.com').then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/slideshows', cache('1 hour'), (req, res) => {
  request('/api/trailerslideshow', store).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/user/:id', cache('1 minute'), (req, res) => {
  request(`/ISteamUser/GetPlayerSummaries/v2?steamids=${req.params.id}`, api).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

module.exports = router;