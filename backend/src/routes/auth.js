const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { registerValidator, loginValidator, validateResult } = require('../middleware/validation/AuthValidator');
const UserController = require('../controllers/UserController');
const passport = require('passport');
const PostController = require('../controllers/PostController');
const CommentController = require('../controllers/CommentController')

router.post('/register', registerValidator, validateResult, AuthController.register);

router.post('/login', loginValidator, validateResult, AuthController.login)

router.post('/verify', AuthController.verifyEmail);

router.put('/friends/accept', passport.authenticate('jwt', {session: false }), UserController.acceptFriendRequest);

router.post('/friends/request', passport.authenticate('jwt', {session: false }), UserController.createFriendRequest);

router.delete('/friends/cancel', passport.authenticate('jwt', {session: false }), UserController.cancelFriendRequest);

router.delete('/friends/reject', passport.authenticate('jwt', {session: false }), UserController.rejectFriendRequest);

router.delete('/friends/remove', passport.authenticate('jwt', {session: false }), UserController.removeFriend);

router.get('/friends/request/sent', passport.authenticate('jwt', {session: false }), UserController.getSentFriendRequests);

router.get('/friends/request/received', passport.authenticate('jwt', {session: false }), UserController.getReceivedFriendRequests);

router.get('/friends', passport.authenticate('jwt', {session: false }), UserController.getAllFriends);

router.get('/profile/:id', passport.authenticate('jwt', {session: false }), UserController.getProfileDetails);

router.get('/get-random-users', passport.authenticate('jwt', {session: false }), UserController.getRandomUsers);

router.post('/post/create', passport.authenticate('jwt', {session: false }), PostController.create_post);

router.get('/post/get/:id', passport.authenticate('jwt', {session: false }), PostController.get_posts);

router.post('/comment/create', passport.authenticate('jwt', {session: false }), CommentController.create_comment);

router.get('/comments/get', passport.authenticate('jwt', {session: false }), CommentController.get_comment);

router.get('/feed',  passport.authenticate('jwt', {session: false }), PostController.getFeed);

router.post('/post/:postId/toggleLike', passport.authenticate('jwt', {session: false }), PostController.toggleLike);

router.post('/post/:postId/toggleDislike', passport.authenticate('jwt', {session: false }), PostController.toggleDislike);


module.exports = router;