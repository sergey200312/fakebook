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
    const { firstName, lastName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        firstName,
        lastName,
        email,
        avatar: process.env.DEFAULT_AVATAR,
        password: hashedPassword,
        isVerified: true
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
    const { email, password } = req.body;
    console.log('debbug')

    const user = await User.findOne({ email: email }).exec();

    if (!user) {
        return res.status(400).json({ message: "Некорректный email или пароль" })
    }

    if (!user.isVerified) {
        return res.status(400).json({ message: 'Аккаунт не подтвержден'})
    }

    const match = await bcrypt.compare(password, user.password);
    console.log(match);

    if (!match) {
        return res.status(400).json({ message: "Некорректный email или пароль" });
    }

    const token = jwt.sign(
        { sub: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    res.status(200).json({ token, user, message: "Авторизация прошла успешно" });
})