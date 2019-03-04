const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  title: {
    type: String,
    required: true,
    min: 16,
    max: 128
  },
  text: {
    type: String,
    required: true,
    min: 1500,
    max: 3500
  },
  tags: {
    type: [String],
    required: true
  },
  likes: {
    type: [
      {
        user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "User"
        }
      }
    ]
  },
  dislikes: {
    type: [
      {
        user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "User"
        }
      }
    ]
  },
  from: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", PostSchema);
