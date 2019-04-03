/* ### Import mongoose and trying to connect to the mLab mongoDB server ### */
const mongoose = require("mongoose");

mongoose
  .connect(require("./config/keys").mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB connection is established.");
  })
  .catch(err => console.log(`Error connecting to MongoDB: ${err}`));

/* ### Startpoint for import and creating an express server ### */
const express = require("express");
const app = express();
app.disable('x-powered-by');

app.use(express.static('public'))

const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* ### Mongoose models (ODM area) ### */
require("./models/User");
// require("./models/Post");
// require("./models/News")
// require("./models/Comment")
// require("./models/Image")
require("./models/history/user/parts/AvatarHistory");
require("./models/history/user/parts/EmailHistory");
require("./models/history/user/parts/FrozenHistory");
require("./models/history/user/parts/PasswordHistory");
require("./models/history/user/parts/SecretHistory");
require("./models/history/user/parts/PermissionHistory");
require("./models/history/user/parts/UsernameHistory");
// require("./models/history/post/PostHistory");
// require("./models/history/news/NewsHistory")
// require("./models/history/comment/CommentHistory");
// require("./models/history/image/ImageHistory");

/* ### Create main entry to DB ### */
const bcryptjs = require("bcryptjs");
const User = mongoose.model("User");
const isEmpty = require("./routes/utils/isEmpty");

User.findById("5c8b7b0b988ad521d4f7f05c").then(user => {
  if (isEmpty(user)) {
    const newUser = new User({
      username: {
        name: "AD4925"
      },
      email: "denier1025@gmail.com",
      password: "Cp71bar9",
      permission: {
        role: "admin"
      }
    });
    bcryptjs.genSalt(10).then(salt => {
      bcryptjs.hash(newUser.password, salt).then(hash => {
        newUser.password = hash;
        newUser.save();
      });
    });
  }
});

/* ### Import passport ### */
const passport = require("passport");

app.use(passport.initialize());

/* ### JWT Passport strategy ### */
require("./routes/utils/passport-jwt")(passport);

/* ### API Routes ### */
app.use("/api/register", require("./routes/api/register"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/users", require("./routes/api/users"));
// app.use("/api/posts", require("./routes/api/posts"));
// app.use("/api/news", require("./routes/api/news"));
// app.use("/api", require("./routes/api/comments"));
// app.use("/api", require("./routes/api/images"));

/* ### Running an express server ### */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
