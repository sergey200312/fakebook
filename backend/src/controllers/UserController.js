const User = require('../models/User');
const asyncHandler = require('express-async-handler');


const getProfileDetails = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(404).json({ message: 'Страница не найдена' });
    }

    const friendsCount = user.friends.length;
    const subscribersCount = user.subscribers.length;
    const subscriptionsCount = user.subscribers.length;

    return res.status(200).json({ message: 'Профиль успешно найден', user, friendsCount, subscribersCount, subscriptionsCount })
    
})
// Получение списка друзей
const getAllFriends = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const searchTerm = req.query.search || '';

    const user = await User.findById(userId)
        .select('friends')
        .populate({
            path: 'friends',
            match: {
                $or: [
                    { firstName: { $regex: searchTerm, $options: 'i'} },
                    { lastName: { $regex: searchTerm, $options: 'i'} }
                ]
            }
        }).exec();
    if (!user) {
        return res.status(400).json({ message: 'Список друзей пуст' })
    }

    return res.status(200).json({ user })
});

// Получение списка отправленных заявок в друзья
const getSentFriendRequests = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const sentFriendReq = await User.findById(userId).select('friendRequests.sent').populate('friendRequests.sent').exec()
    if (!sentFriendReq) {
        return res.status(400).json({ message: 'Список отправленных заявок пуст' })
    }

    return res.status(200).json({ sentFriendReq })
})

// Получение списка запросов в друзья
const getReceivedFriendRequests = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const receivedFriendReq = await User.findById(userId).select('friendRequests.received');
    if (!receivedFriendReq) {
        return res.status(400).json({ message: 'Список полученных заявок пуст' })
    }

    return res.status(200).json({ receivedFriendReq })
})

// Отправка запроса в друзья
const createFriendRequest = asyncHandler(async (req, res, next) => {
    const { receivedUserId } = req.body;
    const currentUserId = req.user.id;

    const user = await User.findById(currentUserId);
    if (user.friends.includes(receivedUserId)) {
        return res.status(400).json({ message: 'Пользователь уже у вас в друзьях' });
    }

    const existingRequest = await User.findOne({ _id: currentUserId, 'friendRequests.sent': receivedUserId });
    if (existingRequest) {
        return res.status(400).json({ message: 'Вы уже отправили заявку' });
    }

    // Создаем и начинаем сессию
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Выполняем операции в рамках транзакции
        await User.findByIdAndUpdate(receivedUserId, 
            { $push: { 'friendRequests.received': currentUserId, subscribers: currentUserId } }, 
            { new: true, session }
        );

        await User.findByIdAndUpdate(currentUserId, 
            { $push: { 'friendRequests.sent': receivedUserId, subscriptions: receivedUserId } }, 
            { new: true, session }
        );

        // Коммит транзакции
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ message: 'Заявка успешно отправлена' });
    } catch (error) {
        // Откат транзакции в случае ошибки
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: 'Ошибка при отправке запроса в друзья' });
    }
});

// Принятие запроса в друзья
const acceptFriendRequest = asyncHandler(async (req, res, next) => {
    const { requestId } = req.params;
    const currentUserId = req.user.id;
    console.log(requestId, currentUserId);

    const requester = await User.findById(requestId).exec();
    if (!requester) {
        return res.status(404).json({ message: 'Заявка не найдена' })
    };

    const user = await User.findById(currentUserId).exec();
    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' })
    };

    if (!user.friendRequests.received.includes(requestId)) {
        return res.status(404).json({ message: 'Заявка не найдена' })
    }

    user.friends.push(requestId);
    requester.friends.push(currentUserId);

    user.friendRequests.received = user.friendRequests.received.filter(id => id.toString() !== requestId.toString());
    requester.friendRequests.sent = requester.friendRequests.sent.filter(id => id.toString() !== currentUserId.toString());

    user.subscribers = user.subscribers.filter(id => id.toString() !== requestId.toString());
    requester.subscriptions = requester.subscriptions.filter(id => id.toString() !== currentUserId.toString());

    await user.save();
    await requester.save();

    return res.status(200).json({ message: 'Заявка успешно принята' })
});

// Отмена отправления заявки в друзья
const cancelFriendRequest = asyncHandler(async (req, res, next) => {
    const { receivedUserId } = req.body;
    const currentUserId = req.user.id;

    const requester = await User.findById(receivedUserId).exec();

    const user = await User.findById(currentUserId).exec();

    if (!requester) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    };

    if (!requester.friendRequests.received.includes(currentUserId)) {
        return res.status(400).json({ message: 'Заявка не найдена в полученных' });
    };

    if (!user.friendRequests.sent.includes(receivedUserId)) {
        return res.status(400).json({ message: 'Заявка не найдена в отправленных' })
    }

    user.friendRequests.sent = user.friendRequests.sent.filter(id => id.toString() !== receivedUserId.toString());
    requester.friendRequests.received = requester.friendRequests.received.filter(id => id.toString() !== currentUserId.toString());

    user.subscriptions = user.subscriptions.filter(id => id.toString() !== receivedUserId.toString());
    requester.subscribers = requester.subscribers.filter(id => id.toString() !== currentUserId.toString());

    await user.save();
    await requester.save();

    return res.status(200).json({ message: 'Заявка успешно отменена' })
});

// Отказ в запросе в добавления друзья
const rejectFriendRequest = asyncHandler(async (req, res, next) => {
    const { receivedUserId } = req.body;
    const currentUserId = req.user.id;

    const requester = await User.findById(receivedUserId).exec();
    if (!requester) {
        return res.status(400).json({ message: 'Пользователь не найден' });
    };

    const user = await User.findById(currentUserId).exec();
    if (!user.friendRequests.received.includes(receivedUserId)) {
        return res.status(400).json({ message: 'Заявка не найдена в запросах в друзья' })
    }

    user.friendRequests.received = user.friendRequests.received.filter(id => id.toString() !== receivedUserId.toString());
    requester.friendRequests.sent = requester.friendRequests.sent.filter(id => id.toString() !== currentUserId.toString());

    user.subscribers = user.subscribers.filter(id => id.toString() !== receivedUserId.toString());
    requester.subscriptions = requester.subscriptions.filter(id => id.toString() !== currentUserId.toString());

    Promise.all([user.save(), requester.save()]);

    return res.status(200).json({ message: 'Запрос в друзья успешно отклонен' })
});

// Удаление из друзей
const removeFriend = asyncHandler(async (req, res, next) => {
    const { friendToRemoveId } = req.body;
    const currentUserId = req.user.id;

    const user = await User.findById(currentUserId).exec();

    const friendToRemove = await User.findById(friendToRemoveId).exec();
    if (!friendToRemove) {
        return res.status(400).json({ message: 'Пользователь не найден' });
    };

    if (!user.friends.includes(friendToRemoveId)) {
        return res.status(400).json({ message: 'Пользователь не найден в ваших списках друзей' });
    };

    user.friends = user.friends.filter(id => id.toString() !== friendToRemoveId.toString());
    friendToRemove.friends = friendToRemove.friends.filter(id => id.toString() !== currentUserId.toString());


    Promise.all([user.save(), friendToRemove.save()]);

    return res.status(200).json({ message: 'Пользователь удален из списка ваших друзей' })
})

module.exports = {
    createFriendRequest,
    acceptFriendRequest,
    cancelFriendRequest,
    rejectFriendRequest,
    removeFriend,
    getAllFriends,
    getSentFriendRequests,
    getReceivedFriendRequests,
    getProfileDetails
};