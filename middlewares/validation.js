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

const updateUserValidationRules = [
    body('full_name').trim().
    notEmpty().withMessage('Full name is required').
    isLength({ min: 5}).withMessage('Full name must be between 5 and 10 characters.'),

    
    body('password').optional({ checkFalsy: true }).
    trim().
    notEmpty().withMessage('Password is required').
    isLength({ min: 5, max: 10 }).withMessage('Password must be 5 to 10 characters long.'),

    body('role').trim().
    notEmpty().withMessage('Role is required').
    isIn(['admin', 'author']).withMessage('Role must be either admin or author.')
]

const articleValidationRules = [
    body('title').trim().
    notEmpty().withMessage('Title is required').
    isLength({ min: 10, max: 100 }).withMessage('Title must be between 5 and 100 characters long.'),

    body('content').trim().
    notEmpty().withMessage('Content is required').
    isLength({ min: 5 }).withMessage('Content must be at least 5 characters long.'),

    body('category').trim().
    notEmpty().withMessage('Category is required'),

]

const categoryValidationRules = [
    body('name').trim().
    notEmpty().withMessage('Category name is required').
    isLength({ min: 3 }).withMessage('Category name must be at least 3 characters long.'),

    body('description').trim().
    optional({ checkFalsy: true }).
    isLength({ max: 200 }).withMessage('Description can be up to 200 characters long.')
]

module.exports = {
    loginValidationRules,
    userValidationRules,
    updateUserValidationRules,
    articleValidationRules,
    categoryValidationRules
};