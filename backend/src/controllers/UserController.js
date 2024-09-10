const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const createFriendRequest = asyncHandler(async (req, res, next) => {
    const { receivedUserId } = req.body;
    const currentUserId = req.user.id;

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
        return res.status(400).json({ message: 'Заявка не найдена в списке полученных заявок'})
    }

    user.friends.push(requestId);
    requester.friends.push(currentUserId);

    user.friendRequests.received = user.friendRequests.received.filter(id => id.toString() !== requestId.toString());
    requester.friendRequests.sent = requester.friendRequests.sent.filter(id => id.toString() !== currentUserId.toString())

    await user.save();
    await requester.save();

    return res.status(200).json({ message: 'Заявка успешно принята' })
});


module.exports = {
    createFriendRequest,
    acceptFriendRequest
};