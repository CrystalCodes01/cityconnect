const express = require('express');
const router = express.Router();
const EventModel = require('../models/event-model.js');

router.get('/newEvent', (req,res,next) => {
  if(req.user) {
    res.render('add-event.ejs');
  }
  else {
    res.redirect('/login');
  }
});

router.post('/event', (req,res,next) => {
  const theEvent = new EventModel( {
    name: req.body.eventName,
    address: req.body.eventAddress,
    city: req.body.eventCity,
    state: req.body.eventState,
    zipcode: req.body.eventZipcode,
    description: req.body.eventDescription,
    url: req.body.eventUrl,
    category: req.body.eventCategory,
    creationDate: req.body.eventCreationDate,
    geo: req.body.eventGeo,
    photoUrl: req.body.eventPhotoUrl,


    // hasGhosts: Math.floor(Math.random()*2),
    // hasMonstersUnderTheBed: Math.floor(Math.random()*2),
    // Set the owner as the logged-in user's database id
    owner: req.user._id,
  });

  theEvent.save((err) => {
    if(err){
      next(err);
      return;
    }
    res.redirect('/explore');
  });
});


router.get('/explore', (req,res,next) => {
  if(req.user === undefined){
    res.redirect('/login');
    return;
  }
  EventModel.find(
    // find the rooms owned by the logged-in user
    { owner: req.user._id},
    (err, eventResults) => {
      if(err) {
        next(err);
        return;
      }

      res.locals.events = eventResults;
        res.render('explore.ejs');
    }
  );
});


module.exports = router;
