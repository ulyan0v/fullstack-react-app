const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  from: {type: String, required: true},
  to: {type: Types.ObjectId, ref: 'User', required: true},
  text: {type: String, required: true},
  nested: [{type: String}],
  timestamp: {type: Number, default: Date.now},
  likeCount: {type: Number, default: 0},
  comments: [{type: Types.ObjectId, ref: 'Comment'}]
});

module.exports = model('Post', schema);
