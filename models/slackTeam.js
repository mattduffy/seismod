'use strict';
const mongoose = require('mongoose')
  , bcrypt = require('bcrypt-nodejs')
  ;

const SlackTeamSchema = new mongoose.Schema({
  token: String,
  team_id: String,
  team_domain: String,
  channels: [{
    channel_id: String,
    channel_name: String
  }],
  channel_limit: {type: Number, default: 5}
}, {collection: 'SlackTeam'});


module.exports = mongoose.model('SlackTeam', SlackTeamSchema);
