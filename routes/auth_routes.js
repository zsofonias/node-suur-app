const express = require('express');

const {isAuthenticated, isNotAuthenticated} = require('../middlewares/auth');
const UsersController = require('../controllers/UsersController');

const router = express.Router();

router.get('/register', isNotAuthenticated, UsersController.getRegister);

router.post('/register', isNotAuthenticated, UsersController.register)

router.get('/login', isNotAuthenticated, UsersController.getLogin);

router.post('/login', isNotAuthenticated, UsersController.login);

router.get('/logout', isAuthenticated, UsersController.logout);


module.exports = router;

