const express = require('express');

const {isAuthenticated} = require('../middlewares/auth');
const IdeasController = require('../controllers/IdeasController');

const router = express.Router();

router.get('/', isAuthenticated, IdeasController.list);

router.post('/', isAuthenticated, IdeasController.store);

router.get('/create', isAuthenticated, IdeasController.create);

router.get('/edit/:id', isAuthenticated, IdeasController.getEditIdea);

router.put('/edit/:id', isAuthenticated, IdeasController.update);

router.delete('/delete/:id', isAuthenticated, IdeasController.remove);




module.exports = router