const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Secret = new Schema({
  userId: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

const SecretHistorySchema = new Schema({
  by: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  secret: {
    type: Secret,
    required: true
  },
  from: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SecretHistory", SecretHistorySchema);