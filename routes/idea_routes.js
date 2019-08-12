const express = require('express');

const IdeasController = require('../controllers/IdeasController');

const router = express.Router();

router.get('/', IdeasController.list);

router.post('/', IdeasController.store);

router.get('/create', IdeasController.create);

router.get('/edit/:id', IdeasController.editIdea);

router.get('/delete/:id', IdeasController.deleteIdea);




module.exports = router