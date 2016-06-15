'use strict';
const router = require('express').Router()
  ;

router.get('/',(req,res,next)=>{
  console.log("app request to /");
  res.send("Wow, so many feels!");
});

router.post('/',(req,res,next)=>{
  console.log(req.body);
  let feels = {
    "text": "Oh, so many feels.",
    "attachments": [
      {
        "text":"How can you get any work done with all of those feels happening?"
      }
    ]
  };
  res.status(200).json(feels);
});

module.exports = router;
