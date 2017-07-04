const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const myEventSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    creationDate: { type: Date, default: Date.now },
    geo: { type: [Number], index: '2d' },
    photoUrl: { type: String, required: false },



    // hasGhosts: { type: Boolean, default: false },
    // the id of the user who owns the event
    owner: { type: Schema.Types.ObjectId }
  },

  {
    timestamps: true
  }
);

myEventSchema.methods.findNear = function(cb) {
  return this.model('event').find({geo: { $nearSphere: this.geo, $maxDistance: 0.01} }, cb);
};

const EventModel = mongoose.model('event', myEventSchema);


module.exports = EventModel;
