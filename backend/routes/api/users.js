const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

async function list() {
    return await User.findAll();
}
router.get('/', asyncHandler(async function (_req, res) {
    const users = await list();
    return res.json(users);
}));

router.get('/:id(\\d+)', asyncHandler(async function (_req, res) {
    const user = await User.findByPk(_req.params.id);
    return res.json(user);
}));

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for email.')
        // .isLength({ min: 4, max: 30 })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    body('email').custom(async (value, { req }) => {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
            throw new Error('Email already used, please choose a different one.');
        }
        return true;
    }),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 30 })
        .withMessage('Please provide a username with at least 4 characters and less than 30.')
        .matches(/^(?=.{4,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'g')
        .withMessage('Characters allowed: a-z, A-Z, 0-9, . and _ '),
    body('username').custom(async (value, { req }) => {
        const user = await User.findOne({ where: { username: value } });
        if (user) {
            throw new Error('Username already in used, please choose a different one.');
        }
        return true;
    }),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.-_])/, 'g')
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
        const { email, password, username, first_name, last_name, prof_pic } = req.body;
        const user = await User.signup({ email, username, password, first_name, last_name, prof_pic });

        await setTokenCookie(res, user);

        return res.json({
            user
        });
    })
);




module.exports = router;
