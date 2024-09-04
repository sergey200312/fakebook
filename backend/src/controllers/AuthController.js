const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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

exports.login = asyncHandler(async(req, res, next) => {
    const { login, password } = req.body;

    const user = await User.findOne({ username: login }).exec();

    if (!user) {
        return res.status(400).json({ message: "Некорректный логин или пароль" })
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        return res.status(400).json({ message: "Некорректный логин или пароль" });
    }

    const token = jwt.sign(
        { sub: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    res.status(200).json({ token, user, message: "Авторизация прошла успешно"});
})