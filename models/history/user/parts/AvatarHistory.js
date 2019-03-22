const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Avatar = new Schema({
  userId: {
    type: String,
    required: true
  },
  image: {
    type: new Schema({
      buffer: {
        type: Buffer,
        required: true
      },
      contentType: {
        type: String,
        required: true
      },
      encoding: {
        type: String,
        required: true
      }
    })
  },
  from: {
    type: Date,
    required: true
  },
  by: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const AvatarHistorySchema = new Schema({
  by: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  avatar: {
    type: Avatar,
    required: true
  },
  from: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("AvatarHistory", AvatarHistorySchema);
