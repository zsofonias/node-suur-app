const express = require('express');

const IdeasController = require('../controllers/IdeasController');

const router = express.Router();

router.get('/', IdeasController.list);

router.post('/', IdeasController.store);

router.get('/create', IdeasController.create);

router.get('/edit/:id', IdeasController.getEditIdea);

router.put('/edit/:id', IdeasController.update);

router.delete('/delete/:id', IdeasController.remove);




module.exports = router