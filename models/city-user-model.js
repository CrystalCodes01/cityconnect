const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const citySchema = new Schema (
  {                                 // 1st argument -> structure object
  fullName: {type: String},

  // SIGN UP/LOGIN FORM USERS //
  username: {type: String},
  encryptedPassword: { type: String },

  // GOOGLE USERS LOGIN //
  googleId: { type: String },

  // FACEBOOK USERS LOGIN//
  facebookId: { type: String },
},

{         // 2nd argument -> additional settings  (optional)
  timestamps: true
          // timestamps creates two additional fields: 'createdAt' & "updatedAt"
}
);


const CityModel = mongoose.model('cityconnect', citySchema);


module.exports = CityModel;
