const { body, validationResult } = require("express-validator");
const User = require('../../models/User');

const registerValidator = [
    body('firstName', 'Имя пользователя обязательно').trim().notEmpty().escape(),
    body('lastName', 'Фамилия пользователя обязательно').trim().notEmpty().escape(),
    body('email', 'Email обязателен').trim().isEmail().escape()
        .custom(async (email) => {
            const checkEmail = await User.findOne({ email }).exec();
            if (checkEmail) {
                throw new Error('Этот email уже используется')
            }
        }),
    body('password', 'Пароль должен содержать минимум 8 символов').trim().isLength({ min: 8 }).escape(),
    body('confirmpassword', 'Пароли не совпадают')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Пароли не совпадают');
            }
            return true;
        })
];

const loginValidator = [
    body('email', 'Введите email').trim().notEmpty().escape(),
    body('password', 'Введите пароль').trim().notEmpty().escape()
]

const validateResult = async(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() })
    }

    next(); //
};

module.exports = { registerValidator, loginValidator, validateResult }