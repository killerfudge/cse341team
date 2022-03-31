const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');

// Create user
exports.createUser = (req, res, next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.errors = errors.array();
        throw error;
    }
  const email = req.body.email;
  const password = req.body.password;

  
  const dateId = Date.now();
  const saltRounds = 12;
  let items = [{}];

  bcrypt
    .hash(password, saltRounds)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        password: hashedPassword,
        date: dateId,
        budget: items,
      });
      user.save();
    })
    .then((result) => {
      res.status(200).json({ msg: "Successfully created User. Please log in." });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  });
};

// Deleting User
exports.deleteUser = (req, res, next) => {

  User.findByIdAndDelete(req._userId).then((user) => {
    res.status(200).json({ msg: "User Deleted" });
  });

};


//Update User Email
exports.updateUserEmail = (req, res, next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.errors = errors.array();
        throw error;
    }
  const newEmail = req.body.newEmail;

  User.findById(req._userId).then(user => {
    if (!user) {
      const error = new Error('No account found');
      error.statusCode = 404;
      throw error;
    }
    user.email = newEmail;
    user.save().then( result => {
      res.status(200).json({msg: "Updated user email"});
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
  });
};

// Update User Password
exports.updateUserPassword = (req, res, next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.errors = errors.array();
        throw error;
    }
  const newPassword = req.body.newPassword;

  const saltRounds = 12;

  User.findById(req._userId).then(user => {
    if (!user) {
      const error = new Error('No account found');
      error.statusCode = 404;
      throw error;
    }
    bcrypt
      .hash(newPassword, saltRounds)
      .then(hashedPass => {
        user.password = hashedPass;
        user.save();
      })
      .then((result) => {
        res.status(200).json({msg: "Updated user password"});
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
};

//Login user
exports.loginUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("No user with this email could be found!");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error(
          "Incorrect Password. The Police are on their way!!"
        );
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          _userId: loadedUser._id.toString(),
        },
        process.env.TOKEN_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        msg: "You are logged in!",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
