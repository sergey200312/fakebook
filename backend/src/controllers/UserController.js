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


module.exports = {
    createFriendRequest
};