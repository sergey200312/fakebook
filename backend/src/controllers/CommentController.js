const asyncHandler = require('express-async-handler');
const Comment = require('../models/Comment');
const { validationResult, body } = require('express-validator');


exports.get_comment = asyncHandler(async (req, res, next) => {
    const { postId, parentCommentId } = req.query;
    const [comments, parentComments] = await Promise.all([
        Comment.find({ post: postId }),
        Comment.find({ parentComment: parentCommentId })
    ]);

    if (!postId) {
        return res.status(400).json({ message: 'postId обязателен'})
    }

    if (!comments || comments.length === 0) {

        return res.status(400).json({ message: 'Список комментариев пуст'});
    }

    const response = { message: 'Комментарии успешно найдены', comments };

    if (parentComments && parentComments.length > 0) {
        response.parentComments = parentComments;
    }

    return res.status(200).json({ response });
    
});

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

})];

