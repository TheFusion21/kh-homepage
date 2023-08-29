var express = require('express');
const router = express.Router();
const https = require('https');


let seed = Math.round(Math.random() * 10000);
const seededRandom = (min, max) => {
  // generate random number between min and max
  // using the seed and reseed
  let t = min + 0x6D2B79F5 * seed;
  seed = t >>> 0;
  t = Math.abs(t);
  return min + (t % (max - min));
}
// random usernames for the posts
const usernames = [
  'puddlingfocus',
  'identicalpristine',
  'chilismust',
  'northernreflect',
  'possessionlaugh',
  'garboardreplace',
  'expectextensive',
  'feltsurvive',
  'emeraldvagabond',
  'sweetscapable',
  'scopesinge',
  'motorwayfear',
  'asslament',
  'danonehis',
  'highjumpbagels',
  'uponcrop',
  'decaydrawers',
  'possesstoward',
  'foldsmithing',
  'slalomarchitect',
  'gambleremotional',
  'componenttrustee',
  'detectorexaltation',
  'lookwildebeest',
  'fluidfastnet',
  'northmember',
  'tranquilevasive',
  'tntefficient',
  'bestsuey',
  'biologicalnaked',
  'horriblehesitant',
  'positionanimated',
  'dietwatchful',
  'hatchcharcoal',
  'singleexception',
  'kentledgeweapon',
  'nightshirtallege',
  'usuallyfray',
  'regardlessrepel',
  'activatorwicked',
  'glideliberated',
  'footballbelt',
  'crabbytaut',
  'seasonmilk',
  'usedprosecutor',
  'thousandbasketball',
  'formulaunwitting',
  'pestopropose',
  'barrelbond',
  'philosophypop',
  'handsomedisc',
  'sneakyexception',
  'workabletannenbaum',
  'ibexetraffic',
  'barracudapussface',
  'esteemedalembic',
  'wornevening',
  'sedgemoth',
  'surpriseyeoman',
  'ghostcucumbers',
  'disputestyle',
  'chowderportrait',
  'exposejab',
  'obedienttwisting',
  'brewingfactory',
  'winningjudgment',
  'caribouknowledge',
  'damagepatter',
  'kimonowhistle',
  'pettybegan',
  'feelingcrane',
  'wheelcaterer',
  'honoruncovered',
  'proceduremoneybag',
  'covertgnat',
  'lingeringletter',
  'panarea',
  'necklacepicayune',
  'hopelessfisher',
  'charmartichoke',
  'decreasingcampus',
  'sulkymaniacal',
  'airamend',
  'hughebrides',
  'horrorengineer',
  'verifiablenerd',
  'tearerst',
  'pickassess',
  'blowfishhill',
  'accessiblestork',
  'truthsunglasses',
  'doyltdigress',
  'berserkbluepeter',
  'contextrolex',
  'stockingwell',
  'unlikelyglove',
  'voicetouchy',
  'loggerraise',
  'birdmisguided',
  'tablespoontrogle',
  'competesantander',
  'telephonenewly',
  'finallycranky',
  'inactivemitt',
  'loggerrichness',
  'artisteford',
  'strikeoxbird',
  'halibutmycelium',
  'ominousdetail',
  'mightypushy',
  'ratingphobic',
  'jabbertension',
  'dualstipulate',
  'trickbangbang',
  'sombreroonce',
  'peafowlcivil',
  'wornredundant',
  'lodgepackage',
  'directionshut',
  'closetround',
  'cowardiceticktock',
  'narrowjolly',
  'bulwarkbecoming',
  'heelsexpert',
  'bornuppity',
  'skiconsonant',
  'heinekenorchid',
  'drugvictim',
  'wordgoldfinch',
  'priestmerveille',
  'frockguarded',
  'fashionindignant',
  'cheeseburgerfluttering',
  'previousexternal',
  'endermanparkour',
  'paragraphreality',
  'overratedhoop',
  'begsubdued',
  'prospectsod',
  'pigmankris',
  'toothsomeamusing',
  'stripedmess',
  'pythoncopy',
  'exxonthorns',
  'meddlesomestash',
  'systemmusician',
  'cinnabargruesome',
  'wildcatmaple',
  'bevybarrage',
  'cachetoboggan',
]

const desc = [
  'Happy Birthday',
  'Happy Anniversary',
  'Happy New Year',
  'Happy Halloween',
  'Was a great day',
  'Great evening with friends',
  'With da boyz',
  'Ladies night',
  'With the family',
  'Just relaxing',
  'Just chilling',
  '#nofilter',
  'Just me',
  'Just the two of us',
  '#selfie',
  'Just a selfie',
  '#ai',
  '#stablediffusion',
  '#nature',
];

const getUser = (username) => {
  const oldSeed = seed;
  seed = username.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0);
  const user = {
    id: seededRandom(0, 100_000_000),
    username,
    smallImage: 'https://i.pravatar.cc/80?u=' + username,
    mediumImage: 'https://i.pravatar.cc/320?u=' + username,
    link: '/' + username,
    posts: seededRandom(0, 100),
    followers: seededRandom(0, 100_000),
    following: seededRandom(0, 100_000),
    verified: seededRandom(0, 10) > 5,
  };
  seed = oldSeed;
  return user;
}

router.get('/posts', (req, res) => {
  seed = Math.round(Math.random() * 10000);
  // support for infinite scroll
  let start = req.query.start || 0;
  let end = req.query.end || 10;
  let posts = [];
  // generate random posts
  for (let i = start; i < end; i++) {
    const id = seed;
    const un = usernames[seededRandom(0, usernames.length)];
    // random number of images per post 1 - 5
    const imageCount = 1+seededRandom(0, 5);
    // random description or no description
    const description = seededRandom(0, 10) > 5 ? desc[seededRandom(0, desc.length)] : null;
    const user = getUser(un);
    posts.push(
      {
        id: id,
        images: [
          ...Array(imageCount).fill(0).map((_, i) => ({
            id: i,
            url: `https://picsum.photos/seed/${seededRandom(0, 100_000)}/1000`
          })),
        ],
        description,
        user: {
          id: user.id,
          username: user.username,
          profileImage: user.smallImage,
          link: user.link,
          verified: user.verified,
        },
        commentCount: seededRandom(0, 50),
        likes: seededRandom(0, 10_000),
      }
    );
  }
  res.send(posts);
});

router.get('/posts/:username', (req, res) => {
  if (usernames.indexOf(req.params.username) === -1) {
    res.status(404).send('User not found');
    return;
  }
  const user = getUser(req.params.username);
  seed = req.params.username.split('').reduce((acc, cur) => acc + cur.charCodeAt(0), 0);
  // support for infinite scroll
  let start = req.query.start || 0;
  let end = req.query.end || 10;
  end = Math.min(end, user.posts);
  let posts = [];
  // generate random posts
  for (let i = 0; i < user.posts; i++) {
    const id = seed;
    // random number of images per post 1 - 5
    const imageCount = 1+seededRandom(0, 5);
    // random description or no description
    const description = seededRandom(0, 10) > 5 ? desc[seededRandom(0, desc.length)] : null;
    const post = {
      id: id,
      images: [
        ...Array(imageCount).fill(0).map((_, i) => ({
          id: i,
          url: `https://picsum.photos/seed/${seededRandom(0, 100_000)}/1000`
        })),
      ],
      description,
      user: {
        id: user.id,
        username: user.username,
        profileImage: user.smallImage,
        link: user.link,
        verified: user.verified,
      },
      commentCount: seededRandom(0, 50),
      likes: seededRandom(0, 10_000),
    };
    if (i >= start && i < end) {
      posts.push(post);
    }
  }
  res.send({
    posts,
    count: user.posts,
  });
});

router.get('/:username', (req, res) => {
  if (usernames.indexOf(req.params.username) === -1) {
    res.status(404).send('User not found');
    return;
  }
  res.send(getUser(req.params.username));
});

router.get('/post/:id', (req, res) => {
  if (isNaN(req.params.id)) {
    res.status(404).send('Post not found');
    return;
  }
  seed = parseInt(req.params.id);
  const id = seed;
  const un = usernames[seededRandom(0, usernames.length)];
  // random number of images per post 1 - 5
  const imageCount = 1+seededRandom(0, 5);
  // random description or no description
  const description = seededRandom(0, 10) > 5 ? desc[seededRandom(0, desc.length)] : null;
  const user = getUser(un);
  const post = {
    id: id,
    images: [
      ...Array(imageCount).fill(0).map((_, i) => ({
        id: i,
        url: `https://picsum.photos/seed/${seededRandom(0, 100_000)}/1000`
      })),
    ],
    description,
    user: {
      id: id,
      username: user.username,
      profileImage: user.smallImage,
      link: user.link,
      verified: user.verified,
    },
    comments: [
      ...Array(seededRandom(0, 50)).fill(0).map((_, i) => ({
        user: getUser(usernames[seededRandom(0, usernames.length)]),
        comment: Math.random().toString(36),
      })),
    ],
    likes: seededRandom(0, 10_000),
  };
  res.send(post);
});


module.exports = router;