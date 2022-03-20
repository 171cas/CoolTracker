const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const workoutsRouter = require('./workouts.js');
const exerciseRouter = require('./exercises.js');
const likeRouter = require('./likes.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/workouts', workoutsRouter);
router.use('/exercises', exerciseRouter);
router.use('/likes', likeRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

module.exports = router;
