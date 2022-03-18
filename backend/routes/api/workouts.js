// backend/routes/api/workouts.js
const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Workout } = require('../../db/models');
const { check, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

async function list() {
    return await Workout.findAll();
}
router.get('/', asyncHandler(async function (_req, res) {
    const workouts = await list();
    return res.json(workouts);
}));

async function listUser(user_id) {
    return await Workout.findAll({ where: { user_id: user_id } });
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
        const workout = await Workout.findByPk(req.params.id);
        return res.json(workout);
    }));


const validateCreate = [
    check('date')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid Date.'),
    check('completion_time')
        .notEmpty()
        .isInt({ min: 0, max: 86400 })
        .toInt()
        .withMessage('Please provide a valid Completion Time (1-86400).'),
    check('calories_burned')
        .notEmpty()
        .isInt({ min: 0, max: 20000 })
        .toInt()
        .withMessage('Please provide valid Calories Burned (1-20000).'),
    check('body_weight')
        .notEmpty()
        .isInt({ min: 0, max: 1500 })
        .toInt()
        .withMessage('Please provide a valid Body Weight (1-1500).'),
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

        if (completion_time === 0) completion_time = null
        if (calories_burned === 0) calories_burned = null
        if (body_weight === 0) body_weight = null

        const workout = await Workout.createWo({
            user_id: req.user.id,
            date,
            notes,
            completion_time,
            calories_burned,
            body_weight
        });

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
        const workout = await Workout.findByPk(req.params.id)
        if (req.user.id !== workout.user_id) {
            throw new Error('Access Denied. Your IP will be blocked and reported for suspicious activity. \n (Not really because this is a demo project, but it definitely will for the completed version.)');
            return
        }
        workout.date = req.body.date;
        workout.notes = req.body.notes;
        workout.completion_time = (req.body.completion_time === 0 ? null : req.body.completion_time);
        workout.calories_burned = (req.body.calories_burned === 0 ? null : req.body.calories_burned);
        workout.body_weight = (req.body.body_weight === 0 ? null : req.body.body_weight);

        await workout.save()
        return res.json({
            workout
        });
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
