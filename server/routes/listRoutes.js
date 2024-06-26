const express = require('express');
const listController = require('../controllers/listController');

const router = express.Router();

/* router.route('/').get(listController.getAllLists); */
router.route('/:id').get(listController.getListById);
router.route('/create-list').post(listController.createList);


module.exports = router;
