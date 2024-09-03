const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const {registerValidator, loginValidator, validateResult} = require('../middleware/validation/AuthValidator');

router.post('/register', registerValidator, validateResult, AuthController.register);

module.exports = router;