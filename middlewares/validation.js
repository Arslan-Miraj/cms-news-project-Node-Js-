const { body } = require('express-validator');


const loginValidationRules = [
    body('username').trim().
    notEmpty().withMessage('Username is required').
    matches(/^\S+$/).withMessage('Username must not contain spaces.').
    isLength({ min: 5, max: 12 }).withMessage('Username must be between 5 and 10 characters long.'),


    body('password').trim().
    notEmpty().withMessage('Password is required').
    isLength({ min: 5, max: 10 }).withMessage('Password must be 5 to 10 characters long.')

]

const userValidationRules = [
    body('full_name').trim().
    notEmpty().withMessage('Full name is required').
    isLength({ min: 5}).withMessage('Full name must be between 5 and 10 characters.'),

    body('username').trim().
    notEmpty().withMessage('Username is required').
    matches(/^\S+$/).withMessage('Username must not contain spaces.').
    isLength({ min: 5, max: 12 }).withMessage('Username must be between 5 and 10 characters long.'),

    body('password').trim().
    notEmpty().withMessage('Password is required').
    isLength({ min: 5, max: 10 }).withMessage('Password must be 5 to 10 characters long.'),

    body('role').trim().
    notEmpty().withMessage('Role is required').
    isIn(['admin', 'author']).withMessage('Role must be either admin or author.')
]

const articleValidationRules = [
    // Additional article validation rules can be added here
]

const categoryValidationRules = [
    // Additional category validation rules can be added here
]

module.exports = {
    loginValidationRules,
    userValidationRules,
    articleValidationRules,
    categoryValidationRules
};