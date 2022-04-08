'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Followers', [
      {
        follower_id: 1,
        followed_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        follower_id: 1,
        followed_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        follower_id: 2,
        followed_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        follower_id: 2,
        followed_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        follower_id: 3,
        followed_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        follower_id: 3,
        followed_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        follower_id: 4,
        followed_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        follower_id: 4,
        followed_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        follower_id: 5,
        followed_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        follower_id: 5,
        followed_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        follower_id: 6,
        followed_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        follower_id: 6,
        followed_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Followers', null, {});
  }
};
