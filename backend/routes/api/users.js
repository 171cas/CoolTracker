const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

async function list() {
    return await User.findAll();
}
router.get('/', asyncHandler(async function (_req, res) {
    const users = await list();
    return res.json(users);
}));

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for email.')
        // .isLength({ min: 4, max: 30 })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 30 })
        .withMessage('Please provide a username with at least 4 characters and less than 30.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('first_name')
        .isLength({ max: 30 })
        .withMessage('First Name must be less than 30 characters.'),
    check('last_name')
        .isLength({ max: 30 })
        .withMessage('Last Name must be less than 30 characters.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username, first_name, last_name } = req.body;
        const user = await User.signup({ email, username, password, first_name, last_name });

        await setTokenCookie(res, user);

        return res.json({
            user
        });
    })
);




module.exports = router;
