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
  const myCheckbox = req.query.interestBox;


  if (myZipcode === 33140) {
    EventModel.find({ zipcode: 33140}, (err, results) => {
      if(err){
        next(err);
        return;
      }
    res.render('zip-results.ejs', {
      theSearch: myTerm,
      events: results
      });
    });
  }

  else if (myCheckbox === 'Tech') {

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

  else if (myCheckbox === 'Museum') {

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

  else if (myCheckbox === 'Art') {

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

  else if (myCheckbox === 'Social') {

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

  else if (myCheckbox === 'Fitness') {

    EventModel.find({ category: 'Fitness'}, (err, results) => {
      if(err){
        next(err);
        return;
      }
      res.render('fitness-results.ejs', {
        theSearch: myTerm,
        events: results
      });
    });
  }

  else if (myCheckbox === 'Volunteering') {

    EventModel.find({ category: 'Volunteering'}, (err, results) => {
      if(err){
        next(err);
        return;
      }
      res.render('volunteer-results.ejs', {
        theSearch: myTerm,
        events: results
      });
    });
  }

  else {
    res.redirect('/search');
  }

});

module.exports = router;
