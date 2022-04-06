const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Exercise, User } = require('../../db/models');

const { Op } = require("sequelize");

const router = express.Router();

router.get('/', asyncHandler(async function (_req, res) {
    const users = await User.findAll({ order: [['createdAt', 'DESC']] });
    const exercises = await Exercise.findAll({ order: [['createdAt', 'DESC']] }); //{ limit: 10 }
    return res.json({ users, exercises });
}));

// async function listUser(user_id) {
//     return await Like.findAll({ where: { user_id: user_id } });
// }
router.get('/:search', asyncHandler(async function (_req, res) {
    const mySearch = _req.params.search
    console.log('\n\n\n\n\n\n\n\n', mySearch, '\n\n\n\n\n\n\n')
    const users = await User.findAll(
        {
            where: {

                [Op.or]: [
                    { username: { [Op.iLike]: `%${mySearch}%` } },
                    { first_name: { [Op.iLike]: `%${mySearch}%` } },
                    { last_name: { [Op.iLike]: `%${mySearch}%` } },
                ],
            },
            order: [['createdAt', 'DESC']],
        }
    );
    const exercises = await Exercise.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.iLike]: mySearch } },
            ],
        },
        order: [['createdAt', 'DESC']],
    }); //{ limit: 10 }
    return res.json({ users, exercises });
}));

module.exports = router;
