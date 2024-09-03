const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User.js');
const mongoose = require('mongoose');

exports.register = asyncHandler(async(req, res, next) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        email,
        password: hashedPassword,
    });

    await user.save();

    res.status(201).json({user, message: 'Пользователь успешно создан'});
})