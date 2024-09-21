const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const { validationResult, body } = require('express-validator')


exports.create_post = [
    body('content', 'Текст поста обязателен ').trim().notEmpty().escape(),

    asyncHandler(async (req, res, next) => {
        const error = validationResult(req);
        if(!error.isEmpty()) {
            return res.status(400).json({ error: error})
        }

        const { image, content } = req.body;
        const currentUser = req.user.id;
        const Image = image || '';

        const newPost = new Post({
            user: currentUser,
            image: Image,
            content: content,
        });

        await newPost.save()

        return res.status(200).json({ message: 'Пост успешно создан', newPost })

    })
];