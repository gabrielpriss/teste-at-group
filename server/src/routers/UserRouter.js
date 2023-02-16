const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/', UserController.getAll);
router.get('/:id', UserController.findById);
router.post('/', UserController.createUser);
router.post('/login', UserController.logIn);
router.delete('/:id',UserController.deleteUser)
router.put('/:id',UserController.updateUser)

module.exports = router;