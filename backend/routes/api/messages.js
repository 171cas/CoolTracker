const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Message, User, Chat } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

async function list() {
    return await Message.findAll();
}
router.get('/', asyncHandler(async function (_req, res) {
    const messages = await Message.findAll({ include: [User] });
    return res.json(messages);
}));

async function listChat(chat_id) {
    return await Message.findAll({ where: { chat_id } });
}
router.get(
    '/chat/:id',
    asyncHandler(async function (req, res) {
        const messages = await listChat(req.params.id);
        return res.json(messages);
    }));


// router.get(
//     '/:id',
//     asyncHandler(async function (req, res) {
//         const message = await Message.findByPk(req.params.id, {
//             include: [
//                 { model: User }
//             ]
//         });
//         return res.json(message);
//     }));

const validateCreate = [
    check('message')
        .notEmpty().withMessage('Message cannot be empty.')
        .isLength({ min: 1, max: 500 }).withMessage('Message\'s length must be less than 500 characters.'),
    handleValidationErrors
];
// Create comment
router.post(
    '/',
    restoreUser,
    validateCreate,
    asyncHandler(async (req, res) => {
        const {
            message,
            chat_id
        } = req.body;
        const user_id = req.user.id;

        const chat = await Chat.findByPk(chat_id)

        console.log('\n\n\n\n\n\n\n\n', user_id)
        console.log('\n\n\n\n\n\n\n\n', chat)

        if (user_id === chat.user_a || user_id === chat.user_b) {
            const newMessage = await Message.create({
                user_id,
                message,
                chat_id,
            });

            return res.json(
                newMessage
            );
        }
        throw new Error('Access Denied.');
    })
);

router.delete(
    '/:id',
    restoreUser,
    asyncHandler(async function (req, res) {
        const message = await Message.findByPk(req.params.id, { include: [User] });
        if (req.user.id === message.user_id) {
            await Message.destroy({ where: { id: message.id } })
            return res.json(message)
        }
        throw new Error('Access Denied.');
        return
    })
);



module.exports = router;
