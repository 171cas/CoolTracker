// backend/routes/api/likes.js
const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Like } = require('../../db/models');
const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

async function list() {
    return await Like.findAll();
}
router.get('/', asyncHandler(async function (_req, res) {
    const likes = await list();
    return res.json(likes);
}));

async function listUser(user_id) {
    return await Like.findAll({ where: { user_id: user_id } });
}
router.get(
    '/user/:id',
    asyncHandler(async function (req, res) {
        const likes = await listUser(req.params.id);
        return res.json(likes);
    }));

async function listWO(workout_id) {
    return await Like.findAll({ where: { workout_id: workout_id } });
}
router.get(
    '/workout/:id',
    asyncHandler(async function (req, res) {
        const likes = await listWO(req.params.id);
        return res.json(likes);
    }));


router.get(
    '/:id',
    asyncHandler(async function (req, res) {
        const like = await Like.findByPk(req.params.id);
        return res.json(like);
    }));

// Create Like
router.post(
    '/',
    restoreUser,
    asyncHandler(async (req, res) => {
        const {
            workout_id,
        } = req.body;

        const like = await Like.create({
            user_id: req.user.id,
            workout_id, //dont forget to change this later
        });

        return res.json({
            like
        });
    })
);

router.delete(
    '/:id',
    restoreUser,
    asyncHandler(async function (req, res) {
        const like = await Like.findByPk(req.params.id);
        if (req.user.id !== like.user_id) {
            throw new Error('Access Denied. Your IP will be blocked and reported for suspicious activity. \n (Not really because this is a demo project, but it definitely will for the completed version.)');
            return
        }
        await Like.destroy({ where: { id: like.id } })
        return res.json(like)
    })
);



module.exports = router;
