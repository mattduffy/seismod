'use strict';
module.exports = (app, mongoose)=>{
  const router = require('express').Router()
    , SlackTeam = require('../models/slackTeam')
    , SlackUser = require('../models/slackUser')
    ;

  router.post('/',(req,res,next)=>{
    //console.log(req.body);
    var slashData = req.body;
    var feels = {
      text: '',
      attachments: []
    };
    console.log(/^(connect|help|[0-9])/.exec(slashData.text));
    var commandSent = /^(connect|help|[0-9])/.exec(slashData.text);
    switch (commandSent[0] || null) {
      case 'connect':
        console.log("info::someone is trying to connect to the seismod slash command.");
        console.log("info::check to see if team_id: %s already exists", slashData.team_id);
        let slackTeam = new SlackTeam();
        SlackTeam.findOne({team_id: slashData.team_id}, (err, foundTeam)=>{
          if(err) {
            // Error encountered when searching the DB for existing slack team_id
            return next(err);
          }
          if(foundTeam) {
            // Slack team_id already exists in DB so don't need to connect.
            // Chech to see if Slack user_id is part of this team_id.
            console.info("info::Slack team: %s found in DB.", slashData.team_id);
            let slackUser = new SlackUser();
            SlackUser.findOne({user_id: slashData.user_id}, (err, foundUser)=>{
              if(err) {
                return next(err);
              }
              if(foundUser) {
                // Slack team_id and user_id both exist, so do something appropriate.
                console.info("info::Slack user: %s found in DB.", slashData.user_id);
              }
            });
          } else {
            // Slack team_id not currently in DB so generate a special one-time connect link to signup on website.
            console.info("info::%s (%s) from Slack team domian: %s has just tried to connect for the first time.", slashData.user_name, slashData.user_id, slashData.team_domain);
            feels.text = "So you want to start recording your feels?.";
            feels.attachments.push({text: "You are going to need to sign up your Slack team on the website.  Use this special one-time link\nhttp://seismod.com/speciaonetimelink"});
          }
        });
        break;
      case 'help':
        console.log("%s is asking for help with the slash command.", slashData.user_name);
        feels.text = "Seismod slash command help:";
        feels.attachments.push({text: "What don't you understand?  Just enter your feels."});
        break;
      default:
        console.log("%s did not provide any feels.", slashData.user_name);
        feels.text = "Missing data:";
        feels.attachments.push({text: "It only works if you show your feels."});
    }
    res.status(200).json(feels);
  });

  app.use('/thefeels', router);
};

/*
Slack Channel response
{
  "text": "Oh, so many feels.",
  "attachments": [
    {
      "text":"How can you get any work done with all of those feels happening?"
    }
  ]
}
*/
