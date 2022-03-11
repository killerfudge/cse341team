const bcrypt = require('bcryptjs');
const User = require("../models/user");

exports.postCreateUser = (req, res, next) => {

}

// Authenticate user
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email);
    console.log(password);

    User.findOne({email: email})
        .then(user => {
            if(!user) {
                return res.status(422).json({
                    error: "Email or password incorrect." 
                });
            }

            bcrypt
                .compare(password, user.password)
                .then(match => {
                    if (match) {
                        return res.status(200).json({
                            message: "User has been authenticated."
                        });
                    } else {
                        return res.status(422).json({
                            error: "Email or password incorrect."
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })
}
