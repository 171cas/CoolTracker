// backend/routes/api/workouts.js
const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Exercise } = require('../../db/models');
const { check, body } = require('express-validator');
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
    // check('distance')
    //     .isInt({ min: 0, max: 10000 })
    //     .withMessage('Please provide a valid distance [0-10000].'),
    // check('sets')
    //     .isInt({ min: 1, max: 1000 })
    //     .withMessage('Please provide a valid set [0-1000].'),
    // check('reps')
    //     .isInt({ min: 1, max: 1000 })
    //     .withMessage('Please provide valid reps [0-1000].'),
    // check('rest')
    //     .isInt({ min: 0, max: 86400 })
    //     .withMessage('Please provide valid rest [0-86400].'),
    // check('weight')
    //     .isInt({ min: 1, max: 1500 })
    //     .withMessage('Please provide valid reps [0-1500].'),
    // check('notes')
    //     .isLength({ max: 30 })
    //     .withMessage('Please provide a note with less than 500 characters.'),
    // check('completion_time')
    //     .isInt({ min: 1, max: 86400 })
    //     .toInt()
    //     .withMessage('Workout time should be less than a whole day.'),
    handleValidationErrors
];

const secondValidate = [
    body('distance').custom((value, { req }) => {
        if (value && (value < 0 || value > 10000)) {
            throw new Error('Please provide a valid distance [0-10000].');
        }
        return true;
    }),
    body('sets').custom((value, { req }) => {
        if (value && (value < 1 || value > 1000)) {
            throw new Error('Please provide a valid set [0-1000].');
        }
        return true;
    }),
    body('reps').custom((value, { req }) => {
        if (value && (value < 1 || value > 1000)) {
            throw new Error('Please provide valid reps [0-1000].');
        }
        return true;
    }),
    body('rest').custom((value, { req }) => {
        if (value && (value < 0 || value > 86400)) {
            throw new Error('Please provide valid rest [0-86400].');
        }
        return true;
    }),
    body('weight').custom((value, { req }) => {
        if (value && (value < 0 || value > 5000)) {
            throw new Error('Please provide valid weight [0-5000].');
        }
        return true;
    }),
    body('notes').custom((value, { req }) => {
        if (value && (value.length > 1500)) {
            throw new Error('Please provide a note with less than 500 characters.');
        }
        return true;
    }),
    body('completion_time').custom((value, { req }) => {
        if (value && (value < 0 || value > 86400)) {
            throw new Error('Workout time must be less than a whole day.');
        }
        return true;
    }),
    handleValidationErrors
]

// Create Exercise
router.post(
    '/',
    restoreUser,
    validateCreate,
    secondValidate,
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
    validateCreate,
    secondValidate,
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
