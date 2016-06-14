var app = require('express')()
	, bodyParser = require('body-parser')
	;

app.use(bodyParser.json);
app.use(bodyParser.text({type: 'text/*'}));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res, next){
	res.send("wow");
});
app.post('/', function(req, res, next){
  console.log(req.body);
  res.send(req.body);
});

app.use(function(res, req, next){
  res.status(404).send("NOPE");
});
app.listen(4000, function(error){
  if(error) {
    console.error(error);
  } else {
    console.log("listening on port 4000");
  }
});
