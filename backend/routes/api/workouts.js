// backend/routes/api/workouts.js
const express = require('express');
const asyncHandler = require('express-async-handler');

const { restoreUser } = require('../../utils/auth');
const { Workout } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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




module.exports = router;
