const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Chat, User } = require('../../db/models');

const router = express.Router();

const { Op } = require('sequelize');

router.get('/', asyncHandler(async function (_req, res) {
    const chats = await Chat.findAll();//{ include: { all: true, nested: true } }
    return res.json(chats);
}));

async function listUser(user_id) {
    return await Chat.findAll(
        {
            where: {

                [Op.or]: [
                    { user_a: user_id },
                    { user_b: user_id },
                ],
            },

        });
}
router.get(
    '/user/:id',
    asyncHandler(async function (req, res) {
        const userChats = await listUser(req.params.id);
        return res.json(userChats);
    }));

// Create Chat
router.post(
    '/',
    restoreUser,
    asyncHandler(async (req, res) => {
        const {
            user_a,
        } = req.body;
        const user_b = req.user.id;

        if (user_a === user_b) return res.json({})


        let chat = await Chat.findOne(
            {
                where: {

                    [Op.or]: [
                        { user_a: user_a, user_b: user_b },
                        { user_a: user_b, user_b: user_a }
                    ],
                },
            })

        if (!chat) {
            chat = await Chat.create({
                user_a: user_a,
                user_b: user_b
            });
        }

        return res.json(
            chat
        );
    })
);

// router.delete(
//     '/:id',
//     restoreUser,
//     asyncHandler(async function (req, res) {
//         const follow = await Follower.findByPk(req.params.id);
//         if (req.user.id !== follow.follower_id) {
//             throw new Error('Access Denied.');
//             return
//         }
//         await Follower.destroy({ where: { id: follow.id } })
//         return res.json(follow)
//     })
// );



module.exports = router;
