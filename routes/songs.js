//creates a modular mountable route handler - complete middleware and routing system, mini-app
const router = require("express").Router();
const Songs = require("../models/Songs");
//Routing refers to how an application's endpoints (URIs) respond to client requests


//Update Database to put in a song


// CREATE SONG
  // router.get("/", async (req, res) => {

  //   console.log('---------------------')
  //   // console.log(newSong)
  //   //const newSong = new Songs(req.body);
  //   try {
  //     //const savedSong = await newSong.save();
  //     res.status(200).json(req.body);
  //   } catch (err) {
  //     console.log("error in song route")
  //     res.status(500).json(err);
  //   }
  // });

//by loading in server, now we can handle requests to app.use("/songs") in server.js
//could also get fancy and do /songs/about 
module.exports = router;