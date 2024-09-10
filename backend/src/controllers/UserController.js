const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const getAllFriends = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const friends = await User.findById(userId).select('friends').exec();
    if (!friends) {
        return res.status(400).json({ message: 'Список друзей пуст'})
    }

    return res.status(200).json({ friends })
});

const getSentFriendRequests = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const sentFriendReq = await User.findById(userId).select('friendRequests.sent');
    if (!sentFriendReq) {
        return res.status(400).json({ message: 'Список отправленных заявок пуст'})
    }

    return res.status(200).json({ sentFriendReq })
})

const createFriendRequest = asyncHandler(async (req, res, next) => {
    const { receivedUserId } = req.body;
    const currentUserId = req.user.id;

    const user = await User.findById(currentUserId).exec();
    if (user.friends.includes(receivedUserId)) {
        return res.status(400).json({ message: 'Пользователь уже у вас в друзьях'})
    }

    const existingRequest = await User.findOne({ _id: currentUserId, 'friendRequests.sent': receivedUserId }).exec();

    if (existingRequest) {
        return res.status(400).json({ message: 'Вы уже отправили заявку'});
    }

    await User.findByIdAndUpdate(receivedUserId, { $push: { 'friendRequests.received': currentUserId }}, { new: true }).exec();

    await User.findByIdAndUpdate(currentUserId, { $push: { 'friendRequests.sent': receivedUserId }}, { new: true }).exec()
    
    return res.status(200).json({ message: 'Заявка успешно отправлена'})

});

const acceptFriendRequest = asyncHandler(async (req, res, next) => {
    const { requestId } = req.params;
    const currentUserId = req.user.id;
    console.log(requestId, currentUserId);

    const requester = await User.findById(requestId).exec();
    if (!requester) {
        return res.status(404).json({ message: 'Заявка не найдена'})
    };

    const user = await User.findById(currentUserId).exec();
    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден'})
    };

    if (!user.friendRequests.received.includes(requestId)) {
        return res.status(404).json({ message: 'Заявка не найдена'})
    }

    user.friends.push(requestId);
    requester.friends.push(currentUserId);

    user.friendRequests.received = user.friendRequests.received.filter(id => id.toString() !== requestId.toString());
    requester.friendRequests.sent = requester.friendRequests.sent.filter(id => id.toString() !== currentUserId.toString())

    await user.save();
    await requester.save();

    return res.status(200).json({ message: 'Заявка успешно принята' })
});

const cancelFriendRequest = asyncHandler(async (req, res, next) => {
    const { receivedUserId } = req.body;
    const currentUserId = req.user.id;

    const requester = await User.findById(receivedUserId).exec();

    const user = await User.findById(currentUserId).exec();

    if (!requester) {
        return res.status(404).json({ message: 'Пользователь не найден'});
    };

    if (!requester.friendRequests.received.includes(currentUserId)) {
        return res.status(400).json({ message: 'Заявка не найдена в полученных'});
    };

    if (!user.friendRequests.sent.includes(receivedUserId)) {
        return res.status(400).json({ message: 'Заявка не найдена в отправленных'})
    }

    user.friendRequests.sent = user.friendRequests.sent.filter(id => id.toString() !== receivedUserId.toString());
    requester.friendRequests.received = requester.friendRequests.received.filter(id => id.toString() !== currentUserId.toString());

    await user.save();
    await requester.save();

    return res.status(200).json({ message: 'Заявка успешно отменена'})
});

const rejectFriendRequest = asyncHandler(async (req, res, next) => {
    const { receivedUserId } = req.body;
    const currentUserId = req.user.id;

    const requester = await User.findById(receivedUserId).exec();
    if (!requester) {
        return res.status(400).json({ message: 'Пользователь не найден'});
    };

    const user = await User.findById(currentUserId).exec();
    if(!user.friendRequests.received.includes(receivedUserId)) {
        return res.status(400).json({ message: 'Заявка не найдена в запросах в друзья'})
    }

    user.friendRequests.received = user.friendRequests.received.filter(id => id.toString() !== receivedUserId.toString());
    requester.friendRequests.sent = requester.friendRequests.sent.filter(id => id.toString() !== currentUserId.toString());

    Promise.all([user.save(), requester.save()]);

    return res.status(200).json({ message: 'Запрос в друзья успешно отклонен'})
});

const removeFriend = asyncHandler(async (req, res, next) => {
    const { friendToRemoveId } = req.body;
    const currentUserId = req.user.id;

    const user = await User.findById(currentUserId).exec();
    
    const friendToRemove = await User.findById(friendToRemoveId).exec();
    if (!friendToRemove) {
        return res.status(400).json({ message: 'Пользователь не найден'});
    };

    if (!user.friends.includes(friendToRemoveId)) {
        return res.status(400).json({ message: 'Пользователь не найден в ваших списках друзей'});
    };

    user.friends = user.friends.filter(id => id.toString() !== friendToRemoveId.toString());
    friendToRemove.friends = friendToRemove.friends.filter(id => id.toString() !== currentUserId.toString());

    Promise.all([user.save(), friendToRemove.save()]);

    return res.status(200).json({ message: 'Пользователь удален из списка ваших друзей'})
})

module.exports = {
    createFriendRequest,
    acceptFriendRequest,
    cancelFriendRequest,
    rejectFriendRequest,
    removeFriend, 
    getAllFriends
};