const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Exercise, Workout } = require('../../db/models');
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
        const exercises = await listWO(req?.params?.id);
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
        //.notEmpty().withMessage('Please provide a non-empty Name.')
        .isLength({ min: 1, max: 30 }).withMessage('Please provide a valid length for Name (1-30).'),
    body('notes').custom((value, { req }) => {
        if (value && (value.length > 500)) {
            throw new Error('Please provide a note with less than 500 characters.');
        }
        return true;
    }),
    body('distance').custom((value, { req }) => {
        if (value === '') return true;
        if (isNaN(value) || (value < 0 || value > 10000)) {
            throw new Error('Please provide a valid distance [0-10000].');
        }
        return true;
    }),
    body('sets').custom((value, { req }) => {
        if (value === '') return true;
        if (isNaN(value) || (value < 1 || value > 1000)) {
            throw new Error('Please provide a valid distance [0-10000].');
        }
        return true;
    }),
    body('sets').custom((value, { req }) => {
        if (value === '') return true;
        if (isNaN(value) || (value < 1 || value > 1000)) {
            throw new Error('Please provide a valid set [1-1000].');
        }
        return true;
    }),
    body('reps').custom((value, { req }) => {
        if (value === '') return true;
        if (isNaN(value) || (value < 1 || value > 1000)) {
            throw new Error('Please provide valid reps [1-1000].');
        }
        return true;
    }),
    body('rest').custom((value, { req }) => {
        if (value === '') return true;
        if (isNaN(value) || (value < 0 || value > 86400)) {
            throw new Error('Please provide valid rest [0-86400].');
        }
        return true;
    }),
    body('weight').custom((value, { req }) => {
        if (value === '') return true;
        if (isNaN(value) || (value < 0 || value > 5000)) {
            throw new Error('Please provide valid weight [0-5000].');
        }
        return true;
    }),
    body('completion_time').custom((value, { req }) => {
        if (value === '') return true;
        if (isNaN(value) || (value < 0 || value > 86400)) {
            throw new Error('Workout time must be less than a whole day.');
        }
        return true;
    }),
    body('workout_id').custom(async (value, { req }) => {
        const workout = await Workout.findByPk(value);
        if (workout.user_id !== req.user.id) {
            throw new Error('Access Denied');
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
    asyncHandler(async (req, res) => {
        let {
            workout_id,
            name,
            notes,
            distance,
            sets,
            reps,
            rest,
            weight,
            completion_time,
        } = req.body;


        if (notes === '') notes = null
        if (distance === '') distance = null
        if (sets === '') sets = 1
        if (reps === '') reps = 1
        if (rest === '') rest = null
        if (weight === '') weight = null
        if (completion_time === '') completion_time = null



        const exercise = await Exercise.create({
            user_id: req.user.id,
            workout_id,
            name,
            notes,
            distance,
            sets,
            reps,
            rest,
            weight,
            completion_time,
        });

        return res.json(
            exercise
        );
    })
);

// Update Exercise
router.put(
    '/:id(\\d+)',
    restoreUser,
    validateCreate,
    asyncHandler(async (req, res) => {
        const exercise = await Exercise.findByPk(req.params.id)
        if (req.user.id !== exercise.user_id) {
            throw new Error('Access Denied.');
            return
        }
        exercise.name = req.body.name;
        exercise.distance = (req.body.distance ? req.body.distance : null);
        exercise.sets = (req.body.sets ? req.body.sets : null);
        exercise.reps = (req.body.reps ? req.body.reps : null);
        exercise.rest = (req.body.rest ? req.body.rest : null);
        exercise.weight = (req.body.weight ? req.body.weight : null);
        exercise.notes = (req.body.notes ? req.body.notes : null);
        exercise.completion_time = (req.body.completion_time ? req.body.completion_time : null);

        await exercise.save()
        return res.json(
            exercise
        );
    })
);

router.delete(
    '/:id',
    restoreUser,
    asyncHandler(async function (req, res) {
        const exercise = await Exercise.findByPk(req?.params?.id);
        if (req.user.id !== exercise.user_id) {
            throw new Error('Access Denied.');
        }
        await Exercise.destroy({ where: { id: exercise?.id } })
        return res.json(exercise)
    })
);



module.exports = router;
