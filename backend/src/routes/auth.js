const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const {registerValidator, loginValidator, validateResult} = require('../middleware/validation/AuthValidator');

router.post('/register', registerValidator, validateResult, AuthController.register);

router.post('/login', loginValidator, validateResult, AuthController.login)

module.exports = router;