const express = require('express');
const router = express.Router();
const EventModel = require('../models/event-model.js');


router.get('/zipresults', (req, res, next) => {

           // <input name="searchTerm">
  const myTerm = req.query.searchTerm;
  const myZipcode = req.query.zipcode;

    EventModel.find({ zipcode: myZipcode}, (err, results) => {
      if(err){
        next(err);
        return;
      }
    res.render('zip-results.ejs', {
      theSearch: myTerm,
      events: results
    });
  });
});

module.exports = router;
