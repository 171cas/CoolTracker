'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Chats', [
      {
        user_a: 1,
        user_b: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_a: 1,
        user_b: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_a: 1,
        user_b: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_a: 1,
        user_b: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_a: 1,
        user_b: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Chats', null, {});
  }
};
