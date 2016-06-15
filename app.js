'use strict';
let dotenv = require('dotenv').config()
  , express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , port = process.env['PORT'] || 80
  ;

app.use(bodyParser.json());
app.use(bodyParser.text({type: 'text/*'}));
app.use(bodyParser.urlencoded({extended: true}));




// app.get('/',(req, res, next)=>{
// 	console.log("app request to /");
// 	return res.send("wow");
// });

// app.post('/',(req, res, next)=>{
//   console.log(req.body);
//   res.json(req.body);
// });

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
