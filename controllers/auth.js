const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Create user
exports.postCreateUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const dateId = Date.now();
  const saltRounds = 10;
  let items = [{}];

  password = bcrypt.hash(password, saltRounds, (err, hash) => {
    return password;
  });

  const user = new User({
    email: email,
    password: password,
    date: dateId,
    budget: items,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Deleting User
exports.deleteUser = (req, res, next) => {
  getUserId();
  try {
    res.user.remove();
    res.json({ message: "User has been deleted from database" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update User - optional
exports.updateUser = (req, res, next) => {
  getUserId();
  const saltRounds = 10;

  if (req.body.email != null) {
    res.user.email = req.body.email;
  }

  if (req.body.password != null) {
    res.user.password = bcrypt.hash(password, saltRounds, (err, hash) => {
      return password;
    });
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Selecting user by id
async function getUserId(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.dateId);
    if (user == null) {
      return res.status(404).json({ message: "User could not be found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;

  next();
}

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
