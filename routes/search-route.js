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
  const myTerm = req.query.searchTerm;
  const myZipcode = req.query.zipcode;
  const myCheckbox1 = req.query.interestTech;
  const myCheckbox2 = req.query.interestMuseum;
  const myCheckbox3 = req.query.interestArt;
  const myCheckbox4 = req.query.interestSocial;


  if (myZipcode === '11111') {
    res.render('zip-results.ejs', {
      theSearch: myTerm
    });
  }

  if (myCheckbox1 === 'on') {

    EventModel.find({ category: 'Tech'}, (err, results) => {
      if(err){
        next(err);
        return;
      }
      res.render('tech-results.ejs', {
        theSearch: myTerm,
        events: results
      });
    });
  }

  if (myCheckbox2 === 'on') {

    EventModel.find({ category: 'Museum'}, (err, results) => {
      if(err){
        next(err);
        return;
      }
    res.render('museum-results.ejs', {
      theSearch: myTerm,
      events: results
      });
    });
  }

  if (myCheckbox3 === 'on') {

    EventModel.find({ category: 'Art'}, (err, results) => {
      if(err){
        next(err);
        return;
      }
    res.render('art-results.ejs', {
      theSearch: myTerm,
      events: results
      });
    });
  }

  if (myCheckbox4 === 'on') {

    EventModel.find({ category: 'Social'}, (err, results) => {
      if(err){
        next(err);
        return;
      }
      res.render('social-results.ejs', {
        theSearch: myTerm,
        events: results
      });
    });
  }

  else {
    res.render('error.ejs', {
    });
  }
});

module.exports = router;
