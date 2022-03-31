const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Comment } = require('../../db/models');
const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

async function list() {
    return await Comment.findAll();
}
router.get('/', asyncHandler(async function (_req, res) {
    const comments = await list();
    return res.json(comments);
}));

async function listUser(user_id) {
    return await Comment.findAll({ where: { user_id: user_id } });
}
router.get(
    '/user/:id',
    asyncHandler(async function (req, res) {
        const comments = await listUser(req.params.id);
        return res.json(comments);
    }));

async function listWO(workout_id) {
    return await Comment.findAll({ where: { workout_id: workout_id } });
}
router.get(
    '/workout/:id',
    asyncHandler(async function (req, res) {
        const comments = await listWO(req.params.id);
        return res.json(comments);
    }));


router.get(
    '/:id',
    asyncHandler(async function (req, res) {
        const comment = await Comment.findByPk(req.params.id);
        return res.json(comment);
    }));

const validateCreate = [
    check('content')
        .notEmpty().withMessage('Comment cannot be empty.')
        .isLength({ min: 1, max: 500 }).withMessage('Please provide a valid position.'),
    handleValidationErrors
];
// Create comment
router.post(
    '/',
    restoreUser,
    validateCreate,
    asyncHandler(async (req, res) => {
        const {
            workout_id,
            content
        } = req.body;
        const user_id = req.user.id;


        const comment = await Comment.create({
            user_id,
            workout_id,
            content
        });


        return res.json(
            comment
        );
    })
);

router.delete(
    '/:id',
    restoreUser,
    asyncHandler(async function (req, res) {
        const comment = await Comment.findByPk(req.params.id);
        if (req.user.id !== comment.user_id) {
            throw new Error('Access Denied.');
            return
        }
        await Comment.destroy({ where: { id: comment.id } })
        return res.json(comment)
    })
);



module.exports = router;
