const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User.js');
const VerificationCode = require('../models/VerificationCode.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.register = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        email,
        password: hashedPassword,
    });

    await user.save();

    const code = crypto.randomBytes(3).toString('hex');
    const verificationCode = new VerificationCode({
        userId: user._id,
        code,
        expiresAt: Date.now() + 3600000

    });
    await verificationCode.save();

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Подтверждение регистрации',
        text: `Ваш код подтверждения: ${code}`
    });

    res.status(200).json({ user, message: "Код подтверждения отправлен на ваш email" });
})

exports.verifyEmail = asyncHandler(async(req, res, next) => {
    const { userId, code } = req.body;

    const verification = await VerificationCode.findOne({ userId: userId, code: code }).exec();
    console.log(verification);
    if (!verification || verification.expiresAt < Date.now()) {
        return res.status(400).json({ message: "Код недействителен или истекло время"})
    }


    await User.findByIdAndUpdate(userId, { isVerified: true });
    await VerificationCode.deleteMany({ userId });

    res.status(200).json({ message: 'Gmail успешно подтвержден' });
})

exports.login = asyncHandler(async (req, res, next) => {
    const { login, password } = req.body;

    const user = await User.findOne({ username: login }).exec();

    if (!user) {
        return res.status(400).json({ message: "Некорректный логин или пароль" })
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json({ message: "Некорректный логин или пароль" });
    }

    const token = jwt.sign(
        { sub: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    res.status(200).json({ token, user, message: "Авторизация прошла успешно" });
})