const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Create user
exports.postCreateUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const dateId = Date.now();
  const saltRounds = 12;
  let items = [{}];

  const token = jwt.sign({ email }, process.env.TOKEN_KEY, {
    expiresIn: "1h",
  });

  bcrypt
    .hash(password, saltRounds)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        resetToken: token,
        date: dateId,
        budget: items,
      });
      user.save();
    })
    .then((result) => {
      res.json({ msg: "Success" });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Deleting User
exports.deleteUser = (req, res, next) => {
  const email = req.body.email;

  User.findOneAndDelete({ email: email }).then((user) => {
    res.json({ msg: "User Deleted" });
  });
};

// Update User - optional
exports.updateUser = (req, res, next) => {
  const email = req.body.email;
  const newEmail = req.body.newEmail;
  const newPassword = req.body.newPassword;

  const saltRounds = 12;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      res.json({
        msg: "No account found",
      });
    } else {
      if (newEmail != undefined) {
        user.email = newEmail;
        user.save();
        res.json({
          msg: "Updated user email",
        });
      } else if (newPassword != undefined) {
        console.log(newPassword);
        bcrypt
          .hash(newPassword, saltRounds)
          .then((hashedPass) => {
            user.password = hashedPass;
            user.save();
          })
          .then((result) => {
            res.json({
              msg: "Updated user password",
            });
          });
      }
    }
  });
};

// Authenticate user
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email);
  console.log(password);

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(422).json({
        error: "Email or password incorrect.",
      });
    }

    bcrypt
      .compare(password, user.password)
      .then((match) => {
        if (match) {
          return res.status(200).json({
            message: "User has been authenticated.",
          });
        } else {
          return res.status(422).json({
            error: "Email or password incorrect.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
