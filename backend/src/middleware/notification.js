const asyncHandler = require('express-async-handler')
const Notification = require('../models/Notification')
const Post = require('../models/Post')

exports.notification = asyncHandler( async(req, res, next) => {
    const { notificationMessage, user, postId} = req;

    const post = await Post.findById(postId).populate('user').exec();

    if (!post) {
        return res.status(404).json({ message: 'Пост не найден'})
    }

    const message = `Этот пользователь ${notificationMessage}`

    const notification = new Notification({
        userId: post.user._id,
        senderId: user.id,
        postId, 
        message
    });

    await notification.save();

    return res.status(200).json({ message: 'Уведомление создано', notification })

})