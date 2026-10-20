const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validate');
const { registerRules, loginRules } = require('../middlewares/validators');

router.post('/register', registerRules, validate, authController.register);
router.post('/login', loginRules, validate, authController.login);

module.exports = router;