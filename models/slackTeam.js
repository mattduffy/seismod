'use strict';
const mongoose = require('mongoose')
  , Schema = mongoose.Schema
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


module.exports = mongoose.model('SlackTeam', SlackTeamSchema, 'SlackTeam');


/*
  Sample Slack slash command POST body:
token: '2J2MB6k0c1cAcmwninVzzueq',
team_id: 'T1G0MJLK0',
team_domain: 'seismod',
channel_id: 'C1G0MJMC6',
channel_name: 'random',
user_id: 'U1G0KBVMJ',
user_name: 'mattduffy',
command: '/thefeels',
text: 'anal fingerbang 4',
response_url: 'https://hooks.slack.com/commands/T1G0MJLK0/51806896453/20IxlWcF4iUiCdrXkXIFmc2u'
*/
