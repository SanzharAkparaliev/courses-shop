const {body} = require('express-validator')
const User = require('../models/user')
exports.registerValidators = [
    body('email')
    .isEmail().withMessage('Введите корректный email')
    .custom(async(value,{req}) =>{
        try {
            const user =  await User.findOne({email:req.body.email})
            if(user){
                return Promise.reject('Такого email уже занят')
            }
        } catch (err) {
            console.log(err)
        }
    }).normalizeEmail(),
    body('password','Пароль должен быть 6 символов')
    .isLength({min:6,max:56})
    .isAlphanumeric()
    .trim(),
    body('confirm').custom((value,{req}) => {
        if(value !== req.body.password){
            throw new Error('Пароли должны совпадать')
        }
        return true;
    }).trim(),
    body('name').isLength({min:3}).withMessage('Имя должно быть минимум 3 символа')
    .trim()
]

exports.courseValidators = [
    body('title').isLength({min:3}).withMessage('Минимальная длина называния 3 символа').trim(),
    body('price').isNumeric().withMessage('Введите корректную цену'),
    body('img','Введите корректный Url картинки').isURL()
]