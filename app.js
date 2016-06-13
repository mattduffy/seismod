'use strict';
let app = require('express')();

app.get('/', (req, res, next)=>{
	res.send("wow");
	return;
});
app.post('/', (req, res, next)=>{
  res.JSON(req.body);
  return;
});

app.listen(4000, ()=>{
  console.log("listening on port 4000");
});
