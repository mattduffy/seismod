'use strict';
const mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , bcrypt = require('bcrypt-nodejs')
  ;

const SlackUserSchema = new mongoose.Schema({
  user_id: String,
  user_name: String,
  team: {type: Schema.Types.ObjectId, ref: 'SlackTeam'},
  feels: [{
    feel: {type: Number, default: 0},
    channel_id: {type: String, default:'xxx'},
    date: {type: Date, default: Date.now}
  }]
}, {collection: 'SlackUser'});


module.exports = mongoose.model('SlackUser', SlackUserSchema);
