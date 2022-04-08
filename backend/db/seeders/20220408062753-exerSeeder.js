'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Exercises', [
      {
        user_id: 1,
        workout_id: 1,
        name: 'run',
        notes: 'not too hard just warm up',
        distance: 2,
        sets: 1,
        reps: 1,
        weight: null,
        completion_time: 18
      },
      {
        user_id: 1,
        workout_id: 1,
        name: 'burpess',
        notes: null,
        distance: null,
        sets: 5,
        reps: 10,
        weight: null,
        completion_time: 15
      },


      {
        user_id: 1,
        workout_id: 2,
        name: 'Duble Unders',
        notes: 'Just DB',
        distance: null,
        sets: 5,
        reps: 350,
        weight: null,
        completion_time: 15
      },
      {
        user_id: 1,
        workout_id: 2,
        name: 'run',
        notes: 'sprint',
        distance: 1,
        sets: 3,
        reps: 1,
        weight: null,
        completion_time: 18
      },


      {
        user_id: 1,
        workout_id: 3,
        name: 'Long Walk',
        notes: null,
        distance: 5,
        sets: 1,
        reps: 1,
        weight: null,
        completion_time: 55
      },






      {
        user_id: 2,
        workout_id: 4,
        name: 'Bench Press',
        notes: 'hard',
        distance: null,
        sets: 5,
        reps: 5,
        weight: 200,
        completion_time: 25
      },
      {
        user_id: 2,
        workout_id: 4,
        name: 'Deadlift',
        notes: 'go hard',
        distance: null,
        sets: 5,
        reps: 1,
        weight: 280,
        completion_time: 18
      },




      {
        user_id: 2,
        workout_id: 5,
        name: 'Yoga',
        notes: 'easy',
        distance: null,
        sets: 1,
        reps: 1,
        weight: null,
        completion_time: 60
      },



      {
        user_id: 2,
        workout_id: 6,
        name: 'Pull Ups',
        notes: 'not bad',
        distance: null,
        sets: 5,
        reps: 12,
        weight: null,
        completion_time: 25
      },
      {
        user_id: 2,
        workout_id: 6,
        name: 'Bicep Curl',
        notes: null,
        distance: null,
        sets: 3,
        reps: 8,
        weight: 55,
        completion_time: 18
      },




      {
        user_id: 3,
        workout_id: 7,
        name: 'Pull Ups',
        notes: 'not bad',
        distance: null,
        sets: 5,
        reps: 12,
        weight: null,
        completion_time: 25
      },
      {
        user_id: 3,
        workout_id: 7,
        name: 'Bicep Curl',
        notes: null,
        distance: null,
        sets: 3,
        reps: 8,
        weight: 55,
        completion_time: 18
      },


      {
        user_id: 3,
        workout_id: 8,
        name: 'Bench Press',
        notes: 'hard',
        distance: null,
        sets: 5,
        reps: 5,
        weight: 200,
        completion_time: 25
      },
      {
        user_id: 3,
        workout_id: 8,
        name: 'Deadlift',
        notes: 'go hard',
        distance: null,
        sets: 5,
        reps: 1,
        weight: 280,
        completion_time: 18
      },
      {
        user_id: 3,
        workout_id: 9,
        name: 'run',
        notes: 'sprint',
        distance: 1,
        sets: 3,
        reps: 1,
        weight: null,
        completion_time: 18
      },
      {
        user_id: 3,
        workout_id: 9,
        name: 'Long Walk',
        notes: null,
        distance: 5,
        sets: 1,
        reps: 1,
        weight: null,
        completion_time: 55
      },







      {
        user_id: 4,
        workout_id: 10,
        name: 'Pull Ups',
        notes: 'not bad',
        distance: null,
        sets: 5,
        reps: 12,
        weight: null,
        completion_time: 25
      },
      {
        user_id: 4,
        workout_id: 10,
        name: 'Bicep Curl',
        notes: null,
        distance: null,
        sets: 3,
        reps: 8,
        weight: 55,
        completion_time: 18
      },


      {
        user_id: 4,
        workout_id: 11,
        name: 'Bench Press',
        notes: 'hard',
        distance: null,
        sets: 5,
        reps: 5,
        weight: 200,
        completion_time: 25
      },
      {
        user_id: 4,
        workout_id: 11,
        name: 'Deadlift',
        notes: 'go hard',
        distance: null,
        sets: 5,
        reps: 1,
        weight: 280,
        completion_time: 18
      },
      {
        user_id: 4,
        workout_id: 12,
        name: 'run',
        notes: 'sprint',
        distance: 1,
        sets: 3,
        reps: 1,
        weight: null,
        completion_time: 18
      },
      {
        user_id: 4,
        workout_id: 12,
        name: 'Long Walk',
        notes: null,
        distance: 5,
        sets: 1,
        reps: 1,
        weight: null,
        completion_time: 55
      },







      {
        user_id: 5,
        workout_id: 13,
        name: 'Pull Ups',
        notes: 'not bad',
        distance: null,
        sets: 5,
        reps: 12,
        weight: null,
        completion_time: 25
      },
      {
        user_id: 5,
        workout_id: 13,
        name: 'Bicep Curl',
        notes: null,
        distance: null,
        sets: 3,
        reps: 8,
        weight: 55,
        completion_time: 18
      },


      {
        user_id: 5,
        workout_id: 14,
        name: 'Bench Press',
        notes: 'hard',
        distance: null,
        sets: 5,
        reps: 5,
        weight: 200,
        completion_time: 25
      },
      {
        user_id: 5,
        workout_id: 14,
        name: 'Deadlift',
        notes: 'go hard',
        distance: null,
        sets: 5,
        reps: 1,
        weight: 280,
        completion_time: 18
      },
      {
        user_id: 5,
        workout_id: 15,
        name: 'run',
        notes: 'sprint',
        distance: 1,
        sets: 3,
        reps: 1,
        weight: null,
        completion_time: 18
      },
      {
        user_id: 5,
        workout_id: 15,
        name: 'Long Walk',
        notes: null,
        distance: 5,
        sets: 1,
        reps: 1,
        weight: null,
        completion_time: 55
      },







      {
        user_id: 6,
        workout_id: 16,
        name: 'Pull Ups',
        notes: 'not bad',
        distance: null,
        sets: 5,
        reps: 12,
        weight: null,
        completion_time: 25
      },
      {
        user_id: 6,
        workout_id: 16,
        name: 'Bicep Curl',
        notes: null,
        distance: null,
        sets: 3,
        reps: 8,
        weight: 55,
        completion_time: 18
      },


      {
        user_id: 6,
        workout_id: 17,
        name: 'Bench Press',
        notes: 'hard',
        distance: null,
        sets: 5,
        reps: 5,
        weight: 200,
        completion_time: 25
      },
      {
        user_id: 6,
        workout_id: 17,
        name: 'Deadlift',
        notes: 'go hard',
        distance: null,
        sets: 5,
        reps: 1,
        weight: 280,
        completion_time: 18
      },
      {
        user_id: 6,
        workout_id: 18,
        name: 'run',
        notes: 'sprint',
        distance: 1,
        sets: 3,
        reps: 1,
        weight: null,
        completion_time: 18
      },
      {
        user_id: 6,
        workout_id: 18,
        name: 'Long Walk',
        notes: null,
        distance: 5,
        sets: 1,
        reps: 1,
        weight: null,
        completion_time: 55
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Exercises', null, {});
  }
};
