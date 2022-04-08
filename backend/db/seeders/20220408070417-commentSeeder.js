'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        user_id: 1,
        workout_id: 4,
        content: 'Nice Job!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 1,
        workout_id: 6,
        content: 'Well done',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        workout_id: 1,
        content: 'Cool',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 2,
        workout_id: 3,
        content: 'Amazing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        workout_id: 18,
        content: 'wow!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 3,
        workout_id: 16,
        content: 'Great',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 4,
        workout_id: 13,
        content: 'Keep going',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 4,
        workout_id: 14,
        content: 'Let\'s go!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 5,
        workout_id: 10,
        content: 'Good',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 5,
        workout_id: 11,
        content: 'Super!!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 6,
        workout_id: 7,
        content: 'You\'re doing great',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 6,
        workout_id: 8,
        content: 'Impresive!!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
