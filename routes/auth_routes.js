const express = require('express');

const UsersController = require('../controllers/UsersController');

const router = express.Router();

router.get('/register', UsersController.register);

router.get('/login', UsersController.getLogin);

router.get('/logout', UsersController.logout);


module.exports = router;

