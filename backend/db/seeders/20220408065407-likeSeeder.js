'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Likes', [
      {
        user_id: 1,
        workout_id: 4
      },
      {
        user_id: 1,
        workout_id: 5
      },
      {
        user_id: 1,
        workout_id: 6
      },
      {
        user_id: 1,
        workout_id: 9
      },
      {
        user_id: 1,
        workout_id: 10
      },
      {
        user_id: 1,
        workout_id: 11
      },
      {
        user_id: 1,
        workout_id: 13
      },
      {
        user_id: 1,
        workout_id: 18
      },
      {
        user_id: 1,
        workout_id: 12
      },






      {
        user_id: 2,
        workout_id: 1
      },
      {
        user_id: 2,
        workout_id: 5
      },
      {
        user_id: 2,
        workout_id: 8
      },
      {
        user_id: 2,
        workout_id: 9
      },
      {
        user_id: 2,
        workout_id: 10
      },
      {
        user_id: 2,
        workout_id: 11
      },
      {
        user_id: 2,
        workout_id: 13
      },
      {
        user_id: 2,
        workout_id: 18
      },
      {
        user_id: 2,
        workout_id: 12
      },



      {
        user_id: 3,
        workout_id: 2
      },
      {
        user_id: 3,
        workout_id: 1
      },
      {
        user_id: 3,
        workout_id: 5
      },
      {
        user_id: 3,
        workout_id: 13
      },
      {
        user_id: 3,
        workout_id: 12
      },
      {
        user_id: 3,
        workout_id: 17
      },
      {
        user_id: 3,
        workout_id: 18
      },
      {
        user_id: 3,
        workout_id: 6
      },
      {
        user_id: 3,
        workout_id: 10
      },




      {
        user_id: 4,
        workout_id: 3
      },
      {
        user_id: 4,
        workout_id: 4
      },
      {
        user_id: 4,
        workout_id: 8
      },
      {
        user_id: 4,
        workout_id: 16
      },
      {
        user_id: 4,
        workout_id: 5
      },
      {
        user_id: 4,
        workout_id: 7
      },
      {
        user_id: 4,
        workout_id: 13
      },
      {
        user_id: 4,
        workout_id: 8
      },
      {
        user_id: 4,
        workout_id: 9
      },



      {
        user_id: 5,
        workout_id: 7
      },
      {
        user_id: 5,
        workout_id: 2
      },
      {
        user_id: 5,
        workout_id: 13
      },
      {
        user_id: 5,
        workout_id: 10
      },
      {
        user_id: 5,
        workout_id: 8
      },
      {
        user_id: 5,
        workout_id: 14
      },
      {
        user_id: 5,
        workout_id: 12
      },
      {
        user_id: 5,
        workout_id: 11
      },
      {
        user_id: 5,
        workout_id: 6
      },


      {
        user_id: 6,
        workout_id: 3
      },
      {
        user_id: 6,
        workout_id: 7
      },
      {
        user_id: 6,
        workout_id: 10
      },
      {
        user_id: 6,
        workout_id: 13
      },
      {
        user_id: 6,
        workout_id: 10
      },
      {
        user_id: 6,
        workout_id: 18
      },
      {
        user_id: 6,
        workout_id: 17
      },
      {
        user_id: 6,
        workout_id: 16
      },
      {
        user_id: 6,
        workout_id: 4
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Likes', null, {});
  }
};
