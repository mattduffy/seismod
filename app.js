var dotenv = require('dotenv').config()
  , express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env['PORT'] || 80
  ;

app.use(bodyParser.json());
app.use(bodyParser.text({type: 'text/*'}));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res, next){
	console.log("app request to /");
	return res.send("wow");
});

app.post('/', function(req, res, next){
  console.log(req.body);
  res.json(req.body);
});


app.use(function(err, res, req, next){
  console.error(err.stack);
  console.log(req);
  res.status(404).send("NOPE");
});

app.listen(port, function(){
  console.log("listening on port %d", port);
});
