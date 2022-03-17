// backend/routes/api/workouts.js
const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Workout } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

async function list() {
    return await Workout.findAll();
}

router.get('/', asyncHandler(async function (_req, res) {
    const workouts = await list();
    return res.json(workouts)
}))



const validateCreate = [
    check('date')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid Date.'),
    check('notes')
        .isLength({ max: 30 })
        .withMessage('Please provide a note with less than 500 characters.'),
    check('completion_time')
        .isInt({ max: 86400 })
        .toInt()
        .withMessage('Workout time should be less than a whole day.'),
    check('calories_burned')
        .isInt({ max: 20000 })
        .toInt()
        .withMessage('Calories burned should be less than 20,000 Cal.'),
    check('body_weight')
        .isInt({ max: 1500 })
        .toInt()
        .withMessage('Body weight should be less than 1,500 lbs.'),
    handleValidationErrors
];

// Create Workout
router.post(
    '/',
    restoreUser,
    validateCreate,
    asyncHandler(async (req, res) => {
        const {
            date,
            notes,
            completion_time,
            calories_burned,
            body_weight
        } = req.body;

        const workout = await Workout.createWo({
            user_id: req.user.id,
            date,
            notes,
            completion_time,
            calories_burned,
            body_weight
        });

        return res.json({
            workout
        });
    })
);


// Create Workout
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
        workout.completion_time = req.body.completion_time;
        workout.calories_burned = req.body.calories_burned;
        workout.body_weight = req.body.body_weight;

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

router.get(
    '/:id',
    asyncHandler(async function (req, res) {
        const workout = await Workout.findByPk(req.params.id);
        return res.json(workout);
    }));



module.exports = router;
