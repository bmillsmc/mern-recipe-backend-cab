const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/', userController.index)
router.get('/:username', userController.showName)
router.post('/', userController.create)
router.put('/:username', userController.edit)
router.delete('/:username', userController.delete)

module.exports = router;