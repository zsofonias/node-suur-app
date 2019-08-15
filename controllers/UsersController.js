
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const getRegister = (req, res, next) => {
    res.render('users.register');
};

const register = (req, res, next) => {
    // console.log(req.body);
    const errors = [];
    if(!req.body.username || !req.body.useremail || !req.body.userpassword || !req.body.userpasswordconfirm){
        errors.push({text: 'All fields are required'});
    }
    if(req.body.userpassword != req.body.userpasswordconfirm){
        errors.push({text: 'Passwords must match'});
    }
    if (errors.length > 0){
        res.render('users.register', {
            errors: errors,
            body: req.body
        });
    } else {
        User.findOne({email: req.body.useremail}, (err, user) => {
            if (err) throw err;
            if (!user) {
                const newUser = {
                    username: req.body.username,
                    email: req.body.useremail,
                    password: req.body.userpassword
                };
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.userpassword, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        User.create(newUser, (err, user) => {
                            if(err) throw err;
                            req.flash('success_msg', 'User Account created Successfully');
                            res.redirect('/auth/login');
                        });
                    });
                });
            } else {
                // req.flash('error_msg', 'Email already Exists');
                // res.redirect('/auth/register');
                errors.push({text: 'Email already Exists'});
                res.render('users.register', {
                    errors: errors,
                    body: req.body
                });
            }
        });
        
    }
};


const getLogin = (req, res, next) => {
    res.render('users.login');
};


const login = (req, res, next) => {
    console.log('hit');
    console.log(req.body);
};


const logout = (req, res, next) => {
    res.send('U are loggdd out');
};


module.exports = {
    getLogin: getLogin,
    login: login,
    logout: logout,
    register: register,
    getRegister: getRegister
};