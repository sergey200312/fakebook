const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const { validationResult, body } = require('express-validator');
const User = require('../models/User');


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

exports.get_posts = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const posts = await Post.find({user: id}).sort({ createdAt: -1 }).populate('user').exec();

    if (!posts) { 
        return res.status(400).json({ message: 'Посты не найдены' });
    }

    return res.status(200).json({ message: 'Посты найдены', posts});
});

exports.getFeed = asyncHandler(async (req, res, next) => {
    const { id } = req.user;

    const user = await User.findById(id).populate('subscriptions friends');

    const subscriptions = user.subscriptions.map(sub => sub._id);
    const friends = user.friends.map(friend => friend._id);

    const posts = await Post.find({
        user: { $in : [...subscriptions, ...friends] }
    }).sort({ createdAt: -1}).populate('user', 'firstName lastName');

    if (!posts) {
        return res.status(400).json({ message: 'Список постов пуст'})
    }

    return res.status(200).json({ posts });
});