const express = require('express');

const UsersController = require('../controllers/UsersController');

const router = express.Router();

router.get('/register', UsersController.getRegister);

router.post('/register', UsersController.register)

router.get('/login', UsersController.getLogin);

router.post('/login', UsersController.login);

router.get('/logout', UsersController.logout);


module.exports = router;

