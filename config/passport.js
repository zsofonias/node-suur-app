const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');

const User = require('../models/User');


module.exports = function(passport) {
    passport.use(new LocalStrategy(
        {
            usernameField: 'userEmail', 
            passwordField: 'userPassword'
        }, 
        (email, password, done) => {
            User.findOne({email: email}, (err, user) => {
                if (err) throw err;
                if(!user){
                    return done(null, false, {message: 'No User Found'});
                }
                bcrypt.compare(password, user.password, (err, match) => {
                    if (err) throw err;
                    if(match){
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Password Incorrect'});
                    }
                });
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}