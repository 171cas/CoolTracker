// backend/routes/api/workouts.js
const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Exercise } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

async function list() {
    return await Exercise.findAll();
}
router.get('/', asyncHandler(async function (_req, res) {
    const exercises = await list();
    return res.json(exercises);
}));


async function listUser(user_id) {
    return await Exercise.findAll({ where: { user_id: user_id } });
}
router.get(
    '/user/:id',
    asyncHandler(async function (req, res) {
        const exercises = await listUser(req.params.id);
        return res.json(exercises);
    }));

async function listWO(workout_id) {
    return await Exercise.findAll({ where: { workout_id: workout_id } });
}
router.get(
    '/workout/:id',
    asyncHandler(async function (req, res) {
        const exercises = await listWO(req.params.id);
        return res.json(exercises);
    }));


router.get(
    '/:id',
    asyncHandler(async function (req, res) {
        const exercise = await Exercise.findByPk(req.params.id);
        return res.json(exercise);
    }));


const validateCreate = [
    check('name')
        .notEmpty()
        .isLength({ min: 1, max: 30 })
        .withMessage('Please provide a valid Name.'),
    check('distance')
        .isInt({ min: 0, max: 10000 })
        .withMessage('Please provide a valid distance [0-10000].'),
    check('sets')
        .isInt({ min: 1, max: 1000 })
        .withMessage('Please provide a valid set [0-1000].'),
    check('reps')
        .isInt({ min: 1, max: 1000 })
        .withMessage('Please provide valid reps [0-1000].'),
    check('rest')
        .isInt({ min: 0, max: 86400 })
        .withMessage('Please provide valid reps [0-1000].'),
    check('weight')
        .isInt({ min: 1, max: 1500 })
        .withMessage('Please provide valid reps [0-1000].'),
    check('notes')
        .isLength({ max: 30 })
        .withMessage('Please provide a note with less than 500 characters.'),
    check('completion_time')
        .isInt({ max: 86400 })
        .toInt()
        .withMessage('Workout time should be less than a whole day.'),
    handleValidationErrors
];

// Create Exercise
router.post(
    '/',
    restoreUser,
    //validateCreate,
    asyncHandler(async (req, res) => {
        const {
            workout_id,
            name,
            distance,
            sets,
            reps,
            rest,
            weight,
            notes,
            completion_time,
        } = req.body;

        const exercise = await Exercise.create({
            user_id: req.user.id,
            workout_id: 1, //dont forget to change this later
            name,
            distance,
            sets,
            reps,
            rest,
            weight,
            notes,
            completion_time,
        });

        return res.json({
            exercise
        });
    })
);

// Update Exercise
router.put(
    '/:id(\\d+)',
    restoreUser,
    // validateCreate,
    asyncHandler(async (req, res) => {
        const exercise = await Exercise.findByPk(req.params.id)
        // if (req.user.id !== exercise.user_id) {
        //     throw new Error('Access Denied. Your IP will be blocked and reported for suspicious activity. \n (Not really because this is a demo project, but it definitely will for the completed version.)');
        //     return
        // }
        exercise.name = req.body.name;
        exercise.distance = req.body.distance;
        exercise.sets = req.body.sets;
        exercise.reps = req.body.reps;
        exercise.rest = req.body.rest;
        exercise.weight = req.body.weight;
        exercise.notes = req.body.notes;
        exercise.completion_time = req.body.completion_time;

        await exercise.save()
        return res.json({
            exercise
        });
    })
);

router.delete(
    '/:id',
    restoreUser,
    asyncHandler(async function (req, res) {
        const exercise = await Exercise.findByPk(req.params.id);
        // if (req.user.id !== Exercise.user_id) {
        //     throw new Error('Access Denied. Your IP will be blocked and reported for suspicious activity. \n (Not really because this is a demo project, but it definitely will for the completed version.)');
        //     return
        // }
        await Exercise.destroy({ where: { id: exercise.id } })
        return res.json(exercise)
    })
);



module.exports = router;
