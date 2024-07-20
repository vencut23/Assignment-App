const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  property: { type: Schema.Types.ObjectId, ref: 'Property' },
  name: { type: String, required: true },
  floorSize: { type: Number, required: true },
  numberOfBeds: { type: Number, required: true },
  amenities: { type: [String], default: [] },
  photos: { type: [String], default: [] }
});

module.exports = mongoose.model('Room', roomSchema);
