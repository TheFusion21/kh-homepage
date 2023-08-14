var express = require('express');
const router = express.Router();
const SteamAPI = require('steamapi');
const steam = new SteamAPI(process.env.STEAM_API_KEY);
const apicache = require('apicache');
const cache = apicache.middleware;
const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/featuredgames', cache('10 minutes'), (req, res) => {
  steam.getFeaturedGames().then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/featuredcategories', cache('10 minutes'), (req, res) => {
  steam.getFeaturedCategories().then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/gamedetails/:appid', cache('10 minutes'), (req, res) => {
  steam.getGameDetails(req.params.appid).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/gamenews/:appid', cache('1 minutes'), (req, res) => {
  steam.getGameNews(req.params.appid).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/gameachievements/:appid', cache('10 minutes'), (req, res) => {
  steam.getGameAchievements(req.params.appid).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/gameplayers/:appid', cache('1 minutes'), (req, res) => {
  steam.getGamePlayers(req.params.appid).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/gameSchema/:appid', cache('10 minutes'), (req, res) => {
  steam.getGameSchema(req.params.appid).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/appsingenre/:genre', cache('10 minutes'), (req, res) => {
  steam.get(`/getappsingenre/?genre=${req.params.genre}`, 'https://store.steampowered.com/api').then((data) => {
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
  steam.get(`/getappsincategory/?category=${req.params.category}`, 'https://store.steampowered.com/api').then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
}); 

router.post('/search', (req, res) => {
  if (!req.body || !req.body.term) {
    console.log(req.body)
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
  steam.get(path, 'https://store.steampowered.com').then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
}); 

router.get('/allcategories', cache('24 hours'), (req, res) => {
  steam.get('/actions/ajaxgetstorecategories', 'https://store.steampowered.com').then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});
router.get('/alltags', cache('24 hours'), (req, res) => {
  steam.get('/actions/ajaxgetstoretags', 'https://store.steampowered.com').then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

router.get('/stats', cache('1 minutes'), (req, res) => {
  steam.get('/about/stats', 'https://www.valvesoftware.com').then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send(err.toString());
  });
});

module.exports = router;