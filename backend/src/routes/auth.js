const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { registerValidator, loginValidator, validateResult } = require('../middleware/validation/AuthValidator');
const UserController = require('../controllers/UserController');
const passport = require('passport');

router.post('/register', registerValidator, validateResult, AuthController.register);

router.post('/login', loginValidator, validateResult, AuthController.login)

router.post('/verify', AuthController.verifyEmail);

router.post('/friend-accept/:requestId', passport.authenticate('jwt', {session: false }), UserController.acceptFriendRequest);

router.post('/friend-request', passport.authenticate('jwt', {session: false }), UserController.createFriendRequest);
module.exports = router;