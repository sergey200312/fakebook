const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')

exports.deleteExpiredUsers = asyncHandler(async () => {
    const now = Date.now();

    const expiredCodes = await VerificationCode.find({ expiresAt: { $lt: now } }).exec();
    const userIds = expiredCodes.map(code => code.userId);
    await User.deleteMany({ _id: { $in: userIds } });
    await VerificationCode.deleteMany({ expiresAt: { $lt: now } });
})