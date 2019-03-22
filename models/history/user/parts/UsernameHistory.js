const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Username = new Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
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

const UsernameHistorySchema = new Schema({
  by: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  username: {
    type: Username,
    required: true
  },
  from: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("UsernameHistory", UsernameHistorySchema);
