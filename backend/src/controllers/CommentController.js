const asyncHandler = require('express-async-handler');
const Comment = require('../models/Comment');
const { validationResult, body } = require('express-validator');

exports.create_comment = [
body('text', 'Комментарий не должен быть пустым').trim().notEmpty().escape(),

asyncHandler(async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array()})
    }

    const { postId, parentComment, text } = req.body;
    const { id } = req.user;

    const newComment = new Comment({
        user: id,
        post: postId,
        parentComment: parentComment,
        text: text
    });

    await newComment.save();

    return res.status(200).json({ message: 'Комментарий создан', newComment})

})]