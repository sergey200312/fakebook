const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const { validationResult, body } = require('express-validator');
const User = require('../models/User');
const Comment = require('../models/Comment')


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

    return res.status(200).json({ message: 'Посты найдены', posts });
});

exports.getPostDetail = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const post = await Post.findById(id).exec();

    if (!post) {
        return res.status(404).json({ message: 'Пост не найден'})
    }

    res.status(200).json({ post })
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

exports.toggleLike = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { postId } = req.params;

    const post = await Post.findById(postId).exec();

    if (!post) {
        return res.status(404).json({ message: 'Пост не найден'})
    };

    const isDislikes = post.dislikes.includes(userId);

    if(isDislikes) {
        return res.status(400).json({ message: 'Нельзя поставить лайк, т.к. поставлен дизлайк'})
    }

    const isLikes = post.likes.includes(userId);

    if (isLikes) {
        post.likes.pull(userId);
    } else {
        post.likes.push(userId);
    }

    await post.save();

    return res.status(200).json({ message: isLikes? 'Лайк убран' : 'Лайк поставлен', likes: post.likes, count: post.likes.length})

});



exports.toggleDislike = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { postId } = req.params;

    const post = await Post.findById(postId).exec();

    if (!post) {
        return res.status(404).json({ message: 'Пост не найден'})
    };

    const isLikes = post.likes.includes(userId);

    if(isLikes) {
        return res.status(400).json({ message: 'Нельзя поставить дизлайк, т.к. поставлен лайк'})
    }

    const isDislikes = post.dislikes.includes(userId);

    if (isDislikes) {
        post.dislikes.pull(userId);
    } else {
        post.dislikes.push(userId);
    }

    await post.save();

    return res.status(200).json({ message: isDislikes? 'Лайк убран' : 'Лайк поставлен', dislikes: post.dislikes, count: post.dislikes.length})
});

// exports.getComment = asyncHandler(async (req, res, next) => {
//     const { postId } = res.params;
//     const comment = await Comment.find({ post: postId }).sort({ createdAt: 1 }).exec();

//     if (!comment) {
//         return res.status(404).json({ message: 'Комментарии не найдены' })
//     }
//     return res.status(200).json({ comment })

// })

exports.getLikedPosts = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    
    const posts = await Post.find({ likes: userId}).exec();

    if (!posts) {
        return res.status(404).json({ message: 'Понравившихся постов не найдено' })
    };

    res.status(200).json({ message: 'Понравившиеся посты найдены', posts});

})