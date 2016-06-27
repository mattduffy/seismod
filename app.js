'use strict';
let cfg = require('./config/index')
  , express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env['PORT'] || 80
  , mongoose = require('mongoose')
  ;

const dburl = 'mongodb://' + cfg.DB_HOST + ":" + cfg.DB_PORT + "/" + cfg.DB_NAME;
mongoose.connect(dburl, (err)=>{
  if(err){
    console.log(err);
  } else {
    console.info("connected to the database.");
  }
});

const SlackTeam = require('./models/slackTeam.js');

app.use(bodyParser.json());
app.use(bodyParser.text({type: 'text/*'}));
app.use(bodyParser.urlencoded({extended: true}));


let mainRoutes = require('./routes/main');
app.use(mainRoutes);

app.use((err, res, req, next)=>{
  console.error(err.stack);
  console.log(req);
  res.status(404).send("NOPE");
});

app.listen(port, (error)=>{
  if (error) throw error;
  console.log("listening on port %d", port);
});
