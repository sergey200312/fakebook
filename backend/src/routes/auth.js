const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { registerValidator, loginValidator, validateResult } = require('../middleware/validation/AuthValidator');
const UserController = require('../controllers/UserController');
const passport = require('passport');

router.post('/register', registerValidator, validateResult, AuthController.register);

router.post('/login', loginValidator, validateResult, AuthController.login)

router.post('/verify', AuthController.verifyEmail);

router.put('/friends/accept/:requestId', passport.authenticate('jwt', {session: false }), UserController.acceptFriendRequest);

router.post('/friends/request', passport.authenticate('jwt', {session: false }), UserController.createFriendRequest);

router.delete('/friends/cancel', passport.authenticate('jwt', {session: false }), UserController.cancelFriendRequest);

router.delete('/friends/reject', passport.authenticate('jwt', {session: false }), UserController.rejectFriendRequest);

router.delete('/friends/remove', passport.authenticate('jwt', {session: false }), UserController.removeFriend);

router.get('/friends/request/sent', passport.authenticate('jwt', {session: false }), UserController.getSentFriendRequests);

router.get('/friends/request/received', passport.authenticate('jwt', {session: false }), UserController.getReceivedFriendRequests);

router.get('/friends', passport.authenticate('jwt', {session: false }), UserController.getAllFriends);

router.get('/profile/:id', passport.authenticate('jwt', {session: false }), UserController.getProfileDetails);


module.exports = router;