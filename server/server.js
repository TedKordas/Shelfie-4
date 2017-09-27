require('dotenv').config();

const express = require('express'),
  cors = require('cors'),
  massive = require('massive'),
  bodyParser = require('body-parser'),
  config = require('./config/config.js'),
  PORT = process.env.PORT || config.PORT;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/shelf/:shelf', (req, res, next) => {
  const db = req.app.get('db');

  db.showFullBins([req.params.shelf]).then(results => {
    res.send(results);
  });
});

app.get('/shelf/:shelf/:bin', (req, res, next) => {
  const db = req.app.get('db');

  db.showBin([req.params.shelf, req.params.bin]).then(results => {
    res.send(results);
  });
});

app.post('/item/:shelf/:bin', (req, res, next) => {
  const db = req.app.get('db');
  const binItem = req.body;

  db
    .createBinItem([
      binItem.item_name,
      binItem.item_price,
      req.params.shelf,
      req.params.bin
    ])
    .then(results => {
      res.send(results);
    });
});

app.put('/shelf/:shelf/:bin', (req, res, next) => {
  const db = req.app.get('db');
  const binItem = req.body;

  db
    .updateBinItem([
      binItem.item_name,
      binItem.item_price,
      req.params.shelf,
      req.params.bin
    ])
    .then(results => {
      res.send(results);
    });
});

app.delete('/shelf/:shelf/:bin', (req, res, next) => {
  const db = req.app.get('db');

  db.deleteBinItem([req.params.shelf, req.params.bin]).then(results => {
    res.send(results);
  });
});

massive(
  process.env.massiveConnectionString || config.massiveConnectionString
).then(db => {
  app.set('db', db);
  app.listen(PORT, () => console.log(`listening on port ${PORT}`));
});
