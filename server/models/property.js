const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  place: { type: String, required: true },
});

const Property= mongoose.model('Property', PropertySchema);
module.exports = Property;
