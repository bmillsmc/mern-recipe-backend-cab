const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/users', userController.index);
// router.get('/users/:email', userController.showName)
// router.post('/users/', userController.create)
// router.put('/users/:email', userController.edit)
// router.delete('/users/:email', userController.delete)
router.post('/users/signup', userController.create);
router.post('/users/login', userController.logOn);

module.exports = router;