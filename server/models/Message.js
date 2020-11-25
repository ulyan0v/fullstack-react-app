const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  from: {type: Types.ObjectId, ref: 'User', required: true},
  to: {type: Types.ObjectId, ref: 'User', required: true},
  text: {type: String, required: true},
  nested: [{type: String}],
  timestamp: {type: Date, default: Date.now}
});

module.exports = model('Message', schema);
