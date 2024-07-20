const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  properties: [{ type: Schema.Types.ObjectId, ref: 'Property' }]
});

module.exports = mongoose.model('User', userSchema);
