const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const workoutsRouter = require('./workouts.js');
const exerciseRouter = require('./exercises.js');
const likeRouter = require('./likes.js');
const commentRouter = require('./comments.js');
const followerRouter = require('./followers.js');
const searchRouter = require('./search.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/workouts', workoutsRouter);
router.use('/exercises', exerciseRouter);
router.use('/likes', likeRouter);
router.use('/comments', commentRouter);
router.use('/followers', followerRouter);
router.use('/search', searchRouter);


module.exports = router;
