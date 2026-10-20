const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const { createUserRules, updateUserRules } = require('../middlewares/validators');

router.use(authenticateToken);

router.get('/', userController.getAllUsers);
router.post('/', createUserRules, validate, userController.createUser);
router.put('/:id', updateUserRules, validate, userController.updateUser);
router.patch('/:id', updateUserRules, validate, userController.partialUpdateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;