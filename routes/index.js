var express = require('express');
var router = express.Router();

require('../models/connection');
const Place = require('../models/places');
const { checkBody } = require('../modules/checkBody');


router.post('/places', (req, res) => {
    if (!checkBody(req.body, ['nickname', 'name','longitude', 'latitude'])) {
      res.json({ result: false, error: 'Missing or empty fields' });
      return;
    }
  
    // Check if the place has not already been registered
    Place.findOne({ name: req.body.name }).then(data => {
      if (data === null) {
  
        const newPlace = new Place({
          nickname: req.body.nickname,
          name: req.body.name,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
        });
  
        newPlace.save().then(newDoc => {
          res.json({ result: true });
        });
      } else {
        // Place already exists in database
        res.json({ result: false, error: 'Place already exists' });
      }
    });
  });


  router.get('/places/:nickname', (req, res) => {
    Place.find({ nickname: req.params.nickname }).then(data => {
      if (data) {
        res.json({ result: true, places: data });
      } else {
        res.json({ result: false, error: 'Place not found' });
      }
    });
  });


  router.delete('/places', (req, res) => {
    Place.deleteOne({ nickname: req.body.nickname, name: req.body.name }).then(() => {
        res.json({ result: true });

        })
    });
    

module.exports = router;






