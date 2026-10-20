const { body, param } = require('express-validator');

const registerRules = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Must be a valid email address').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const loginRules = [
    body('email').isEmail().withMessage('Must be a valid email address').normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required')
];

const createUserRules = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Must be a valid email address').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const updateUserRules = [
    param('id').isInt().withMessage('User ID must be an integer'),
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Must be a valid email address').normalizeEmail()
];

module.exports = {
    registerRules,
    loginRules,
    createUserRules,
    updateUserRules
};