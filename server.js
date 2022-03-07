const express = require('express');
const app = express();
//const db = require("./db/songs");
//const aws = require('aws-sdk');

// let s3 = new aws.s3({
//     accessKeyId: process.env.S3_KEY
//     secretAccessKey: process.env.S3_SECRET
// });



app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/songs");
  });


const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));