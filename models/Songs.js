
const mongoose = require("mongoose");

const SongsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    artist: {
        type: String,
        required: true,
        unique: false,
      },
      mood: {
        type: String,
        required: true,
      },
      songFile: {
        type: String, 
        required: true,
      },
      imgFile: {
        type: String, 
        required: true,
      },  
  },
  { timestamps: true }
);
const Songs = mongoose.model("Songs", SongsSchema);
Songs.createIndexes();

module.exports = Songs;