const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Workout, User } = require('../../db/models');
const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

async function list() {
    return await Workout.findAll({ include: User });
}
router.get('/', asyncHandler(async function (_req, res) {
    const workouts = await list();
    return res.json(workouts);
}));

async function listUser(user_id) {
    return await Workout.findAll({ where: { user_id: user_id }, include: User });
}
router.get(
    '/user/:id',
    asyncHandler(async function (req, res) {
        const workouts = await listUser(req.params.id);
        return res.json(workouts);
    }));

router.get(
    '/:id',
    asyncHandler(async function (req, res) {
        const workout = await Workout.findByPk(req.params.id, { include: User });
        return res.json(workout);
    }));


const validateCreate = [
    check('date')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid Date.'),
    body('date')
        .custom((value, { req }) => {
            const today = new Date()
            const month = (today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`)
            const dateVar = `${today.getFullYear()}-${month}-${today.getDate()}`

            if (value > dateVar) {
                throw new Error(['Workout date must be in the past.']);
            }

            return true;
        }),
    body('notes')
        .custom((value, { req }) => {
            if (value && value.length > 500) throw new Error('Notes lenght must be less than 500 characters.');
            return true;
        }),
    body('completion_time')
        .custom((value, { req }) => {
            if ((isNaN(value) && value !== '') || (value < 0 || value > 86400)) throw new Error('Please provide a valid numeric Completion Time (1-86400).');
            return true;

        }),
    body('calories_burned')
        .custom((value, { req }) => {
            if ((isNaN(value) && value !== '') || (value < 0 || value > 20000)) throw new Error('Please provide valid numeric range for Calories Burned (1-20000).');
            return true;

        }),
    body('body_weight')
        .custom((value, { req }) => {
            if ((isNaN(value) && value !== '') || (value < 0 || value > 1500)) throw new Error('Please provide a valid numeric Body Weight (1-1500).');
            return true;
        }),
    handleValidationErrors
];

// Create Workout
router.post(
    '/',
    restoreUser,
    validateCreate,
    asyncHandler(async (req, res) => {
        let {
            date,
            notes,
            completion_time,
            calories_burned,
            body_weight
        } = req.body;


        if (notes === '') notes = null
        if (completion_time === '') completion_time = null
        if (calories_burned === '') calories_burned = null
        if (body_weight === '') body_weight = null

        const workout = await Workout.createWo({
            user_id: req.user.id,
            date,
            notes,
            completion_time,
            calories_burned,
            body_weight
        });

        const user = await User.findByPk(workout.user_id)
        workout.dataValues.User = user.dataValues

        return res.json(
            workout
        );
    })
);


// Update Workout
router.put(
    '/:id(\\d+)',
    restoreUser,
    validateCreate,
    asyncHandler(async (req, res) => {
        const workout = await Workout.findByPk(req.params.id, { include: User })
        if (req.user.id !== workout.user_id) {
            throw new Error('Access Denied.');
            return
        }
        workout.date = req.body.date;
        workout.notes = (req.body.notes ? req.body.notes : null);
        workout.completion_time = (req.body.completion_time ? req.body.completion_time : null);
        workout.calories_burned = (req.body.calories_burned ? req.body.calories_burned : null);
        workout.body_weight = (req.body.body_weight ? req.body.body_weight : null);

        await workout.save()
        return res.json(
            workout
        );
    })
);

router.delete(
    '/:id',
    restoreUser,
    asyncHandler(async function (req, res) {
        const workout = await Workout.findByPk(req.params.id);
        if (req.user.id !== workout.user_id) {
            throw new Error('Access Denied. Your IP will be blocked and reported for suspicious activity. \n (Not really because this is a demo project, but it definitely will for the completed version.)');
            return
        }
        await Workout.destroy({ where: { id: workout.id } })
        return res.json(workout)
    })
);




module.exports = router;
