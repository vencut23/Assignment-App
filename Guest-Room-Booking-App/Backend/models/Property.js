const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  address: { type: String, required: true },
  rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }]
});

module.exports = mongoose.model('Property', propertySchema);
