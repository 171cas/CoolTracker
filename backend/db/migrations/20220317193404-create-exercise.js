'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        references: { model: 'Users' },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER
      },
      workout_id: {
        allowNull: false,
        references: { model: 'Workouts' },
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      notes: {
        type: Sequelize.TEXT(500)
      },
      distance: {
        type: Sequelize.INTEGER,
      },
      sets: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      reps: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      rest: {
        type: Sequelize.INTEGER,
      },
      weight: {
        type: Sequelize.INTEGER,
      },
      completion_time: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Exercises');
  }
};
