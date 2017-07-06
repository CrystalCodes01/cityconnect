// SEED FILE
//     a JavaScript that saves things to your database when you run it
//     (makes onboarding easier and it allows you to recreate the old
//      data in your DB after you delete things.)

const mongoose = require('mongoose');
const EventModel = require('../models/event-model.js');
const Schema = mongoose.Schema;

require('mongoose-type-url');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);

const myEventSchema = [
  {
    name: 'Fight Club America',
    address: '120 NE 20th Street',
    city: 'Miami',
    state: 'FL',
    zipcode: 33137,
    description: 'In addition to the wide variety of classes available to our members, Fight Club also offers personal training.',
    url: 'http://fightclubamerica.com/classes-schedule/classes-downtown-miami/',
    category: 'Fitness',
    creationDate: new Date(),
    geo: [25.795459, -80.192501],
    photoUrl: 'http://fightclubamerica.com/wp-content/gallery/facilities/img_2347_hdr.jpg?x74080',
    owner: 'User',
  }
  // {
  //   name: '',
  //   address: '',
  //   city: '',
  //   state: '',
  //   zipcode: 11111,
  //   description: '',
  //   url: '',
  //   category: '',
  //   creationDate: new Date(),
  //   geo: [],
  //   photoUrl: '',
  //   owner: '',
  // },
  // {
  //   name: '',
  //   address: '',
  //   city: '',
  //   state: '',
  //   zipcode: 11111,
  //   description: '',
  //   url: '',
  //   category: '',
  //   creationDate: new Date(),
  //   geo: [],
  //   photoUrl: '',
  //   owner: '',
  // },
  // {
  //   name: '',
  //   address: '',
  //   city: '',
  //   state: '',
  //   zipcode: 11111,
  //   description: '',
  //   url: '',
  //   category: '',
  //   creationDate: new Date(),
  //   geo: [],
  //   photoUrl: '',
  //   owner: '',
  // },
  // {
  //   name: '',
  //   address: '',
  //   city: '',
  //   state: '',
  //   zipcode: 11111,
  //   description: '',
  //   url: '',
  //   category: '',
  //   creationDate: new Date(),
  //   geo: [],
  //   photoUrl: '',
  //   owner: '',
  // },
  // {
  //   name: '',
  //   address: '',
  //   city: '',
  //   state: '',
  //   zipcode: 11111,
  //   description: '',
  //   url: '',
  //   category: '',
  //   creationDate: new Date(),
  //   geo: [],
  //   photoUrl: '',
  //   owner: '',
  // }
];


EventModel.create(
  myEventSchema,            // 1st argument -> array of product info objects

  (err, eventResults) => {   // 2nd argument -> callback!
    if (err) {
      console.log('Database error.');
      return;
    }

    eventResults.forEach((oneEvent) => {
      console.log('New event! ' + oneEvent.name);
    });
  }
);


module.exports = EventModel;
