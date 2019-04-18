const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Username = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    min: 4,
    max: 30
  },
  from: {
    type: Date,
    default: Date.now
  },
  by: {
    type: String,
    default: "auto"
  },
  description: {
    type: String,
    trim: true,
    default: "auto",
    min: 4,
    max: 256
  }
});

const Avatar = new Schema({
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
    default: Date.now
  },
  by: {
    type: String,
    default: "auto"
  },
  description: {
    type: String,
    trim: true,
    default: "auto",
    min: 4,
    max: 256
  }
});

const Permission = new Schema({
  role: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  from: {
    type: Date,
    default: Date.now
  },
  by: {
    type: String,
    default: "auto"
  },
  description: {
    type: String,
    trim: true,
    default: "auto",
    min: 4,
    max: 256
  }
});

const Frozen = new Schema({
  to: {
    type: Date
  },
  from: {
    type: Date,
    default: Date.now
  },
  by: {
    type: String,
    default: "auto"
  },
  description: {
    type: String,
    trim: true,
    default: "auto",
    min: 4,
    max: 256
  }
});

const Secret = new Schema({
  question: {
    type: String,
    trim: true,
    required: true,
    min: 4,
    max: 256
  },
  answer: {
    type: String,
    trim: true,
    required: true,
    min: 4,
    max: 256
  },
  from: {
    type: Date,
    default: Date.now
  }
});

const UserSchema = new Schema({
  username: {
    type: Username,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    min: 6,
    max: 50
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 8,
    max: 50
  },
  avatar: {
    type: Avatar
  },
  secret: {
    type: Secret
  },
  permission: {
    type: Permission,
    default: {
      role: "user"
    }
  },
  frozen: {
    type: Frozen
  },
  from: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
