const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Like, User } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async function (_req, res) {
    const likes = await Like.findAll({ include: User });
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
        const user_id = req.user.id;

        let like = await Like.findOne({ where: { user_id, workout_id } })

        if (like) {
            await Like.destroy({ where: { id: like.id } })
        } else {
            like = await Like.create({
                user_id: req.user.id,
                workout_id, //dont forget to change this later
            });
            const user = await User.findByPk(like.user_id)
            like.dataValues.User = user.dataValues
        }

        return res.json(
            like
        );
    })
);

router.delete(
    '/:id',
    restoreUser,
    asyncHandler(async function (req, res) {
        const like = await Like.findByPk(req.params.id);
        if (req.user.id !== like.user_id) {
            throw new Error('Access Denied.');
            return
        }
        await Like.destroy({ where: { id: like.id } })
        return res.json(like)
    })
);



module.exports = router;
