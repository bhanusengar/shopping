'use strict'

var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../model/usersmodel');

module.exports = function (passport) {
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            User.findOne({
                'email': email
            }, function (err, user) {
                // if there are any errors, return the error before anything else
                if (err) {
                    console.log('Error in SignUp: ' + err);
                    return done(err);
                }
                // if no user is found, return the message
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
                // if the user is found but the password is wrong
                if (!user.comparePassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                } else {
                    return done(null, user);
                }
            });

        }
    ));
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
