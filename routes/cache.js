const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cache = require('../models/Cache');
const util = require('util');

/* SAVE Cache */
router.post('/', function (req, res, next) {
  //beacon can send string only
  let data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  console.log(data);
  Cache.create(data, function (err, post) {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
});

//todo make light version of  LOOKUP for xmplay ui, without steps and requests
/* LOOKUP Cache */
router.post('/lookup', function (req, res, next) {
  // console.log('req.body');
  // console.log(req.body);
  // const obj = {};
  // obj[req.body.key] = req.body.value;
  console.log(req.body);
  Cache.find(req.body)
    .sort({'time_finished': -1})
    .limit(50)
    .exec(
      function (err, result) {
        if (!err && !result) {
          err = 'reason unknown';
        }
        if (err) {
          console.error('error');
          console.error(err);
          res.json({error: `ERROR in lookup {${JSON.stringify(req.body)}}, ${err}`});
        } else {
          res.json({total: result.length, result: result});
        }
      });
});

/* GET data for Cache*/
// size refers for logical allocation (this is seen by database engine)
// storageSize refers for physical file space allocation
router.get('/data.js', function (req, res, next) {

  const cacheId = req.query.cacheId;
  res.setHeader('content-type', 'text/javascript');
  Cache.find({cacheId: cacheId})
    .sort({'time_finished': -1})
    .limit(3)
    .exec(
      function (err, result) {
        if (!err && !result) {
          err = 'reason unknown';
        }
        if (err) {
          res.write(`window.xmplay = xmplay || {};`);
          res.write('\n\r');
          res.write(`xmplay.replayData=null;`);
          res.write('\n\r');
          res.write(`console.error("data not found for cacheId ${cacheId}")`);
        } else {
          let _result = result[0];
          if (!_result) {
            res.write(`window.xmplay = xmplay || {};`);
            res.write('\n\r');
            res.write(`xmplay.replayData=null;`);
            res.write('\n\r');
            res.write(`console.error("data not found for cacheId ${cacheId}")`);
          } else {
            // delete _result._id;
            // delete _result.__v;
            // _result.time_started = 123;
            // _result.time_finished = _result.time_finished.toString();
           // res.write(`xmplay.replayData=${util.inspect(_result.toJSON(), false, 10)}`);
            res.write(`window.xmplay = xmplay || {};`);
            res.write('\n\r');
            res.write(`window.xmplay.replayData=${JSON.stringify(_result)};`);
            res.write('\n\r');
            res.write(`console.warn("data found for cacheId ${cacheId}")`);
          }

          res.end();
        }
      });


});


/* GET stats for Caches*/
// size refers for logical allocation (this is seen by database engine)
// storageSize refers for physical file space allocation
router.get('/stats', function (req, res, next) {
  Cache.collection.stats(function (err, results) {
    res.json(results);
  });
});


/* GET ALL Caches*/
router.get('/', function (req, res, next) {
  Cache
    .find()
    .sort({'time_finished': -1})
    .limit(50)
    .exec(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
});


/* GET SINGLE Cache BY ID */
router.get('/:id', function (req, res, next) {
  Cache.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* UPDATE Cache */
router.put('/:id', function (req, res, next) {
  Cache.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Cache */
router.delete('/:id', function (req, res, next) {
  Cache.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;
