'use strict';

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


/*
Slack Channel response
{
    "text": "It's 80 degrees right now.",
    "attachments": [
        {
            "text":"Partly cloudy today and tomorrow"
        }
    ]
}
*/
