const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const songsRoute = require("./routes/songs");
const mongoose = require("mongoose");
const cors = require('cors');
const multer = require('multer');
const path = require("path");
const bodyParser = require('body-parser');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const crypto = require('crypto');
const { collection } = require('./models/Songs');




const URI = process.env.DB_URI;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({limit: "30mb",extended:true}));
app.use("/upload", express.static(path.join(__dirname,"./uploads")));

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    console.log("Connected to MongoDB"))
  
  .catch((err) => console.log(err));


// localhost:8080/ 
app.get("/", (req, res) => {
    res.send("App is working")
  });

  
const fileStorageEngine = multer.diskStorage({
  //request null, file saved to uploads and callback function
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  //same but tweaking how filenames are saved, we have 2 so far
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)
    
  }
});

const storage = new GridFsStorage({
  url: URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err)
        }
        const filename = file.originalname
        const fileInfo = {
          filename: filename,
          bucketName: 'songs',
        }
        resolve(fileInfo)
      })
    })
  }, 
})

const upload = multer({storage})
  //Specify multer storage engine then this connects backend to frontend PF = app.post"/upload"

  //const upload = multer({storage : fileStorageEngine});
  app.post("/upload", upload.array('fileUpload', 2),(req, res, err) => {
    const body = req.body
    const files = req.files
    console.log(req.body); console.log(req.files)
    //res.status(200).json("req.body and req.files received");
    res.status(201).send()
    collection.insertOne(req.body)

    });




//simply, app.use "run this on all requests", app.get "run this on a get request for given url"

//mounts middleware function, gives access to request and response objects cycle
// occurs when the base of the requested path matches app.use(<path>)
//e.g. if / is mount path, get /, put /foo, post foo/bar we'll respond to any path
//starting with / regardless of HTTP verb

//further, app.use -> takes one callback, app.all can take multiple callbacks
//app.use will only see whether url starts with specified path, app.all() will match complete path
app.use("/songs", songsRoute);


const PORT = process.env.PORT || 8080;
  
app.listen(PORT, () => {
   console.log(`Backend started on port ${PORT}`);
});

/////////
