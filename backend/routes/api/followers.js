const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Follower, User } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async function (_req, res) {
    const follow = await Follower.findAll({ include: User });//{ include: { all: true, nested: true } }
    return res.json(follow);
}));

async function listUser(user_id) {
    return await Follower.findAll({ where: { follower: user_id } });
}
router.get(
    '/user/:id',
    asyncHandler(async function (req, res) {
        const followeds = await listUser(req.params.id);
        return res.json(followeds);
    }));

// Create Follow
router.post(
    '/',
    restoreUser,
    asyncHandler(async (req, res) => {
        const {
            followed_id,
        } = req.body;
        const follower_id = req.user.id;

        let follow = await Follower.findOne({ where: { follower_id, followed_id } })

        if (follow) {
            await Follower.destroy({ where: { id: follow.id } })
        } else {
            follow = await Follower.create({
                follower_id: req.user.id,
                followed_id,
            });
            const user = await User.findByPk(follow.follower_id)
            follow.dataValues.User = user.dataValues
        }

        return res.json(
            follow
        );
    })
);

router.delete(
    '/:id',
    restoreUser,
    asyncHandler(async function (req, res) {
        const follow = await Follower.findByPk(req.params.id);
        if (req.user.id !== follow.follower_id) {
            throw new Error('Access Denied.');
            return
        }
        await Follower.destroy({ where: { id: follow.id } })
        return res.json(follow)
    })
);



module.exports = router;
