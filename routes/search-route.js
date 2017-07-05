const express = require('express');
const router = express.Router();
const EventModel = require('../models/event-model.js');

// STEP #1 of our search form submission
router.get('/search', (req, res, next) => {
  res.render('search.ejs');
});

// STEP #2 of our search form submission
// <form method="get" action="/results">
//                |               |
//   --------------               |
//   |       ----------------------
//   |       |
router.get('/results', (req, res, next) => {

           // <input name="searchTerm">
           //
  const myTerm = req.query.searchTerm;
  const myZipcode = req.query.zipcode;
  const myCheckbox1 = req.query.interestTech;
  const myCheckbox2 = req.query.interestMuseum;
  const myCheckbox3 = req.query.interestArt;

  if (myZipcode === '11111') {
    res.render('zip-results.ejs', {
      theSearch: myTerm
    });
  }

  if (myCheckbox1 === 'on') {
    res.render('tech-results.ejs', {
      theSearch: myTerm
    });
  }

  if (myCheckbox2 === 'on') {
    res.render('museum-results.ejs', {
      theSearch: myTerm
    });
  }

  if (myCheckbox3 === 'on') {
    res.render('art-results.ejs', {
      theSearch: myTerm
    });
  }

  else {
    res.render('search.ejs', {
    });
  }
});

module.exports = router;
