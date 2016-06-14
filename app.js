var express = require('express')
	, app = express()
	, bodyParser = require('body-parser')
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
  //res.json({'test': "oh boy"});
  res.json(req.body);
});


app.use(function(err, res, req, next){
  console.error(err.stack);
  console.log(req);
  res.status(404).send("NOPE");
});

app.listen(4000, function(){
  console.log("listening on port 4000");
});
