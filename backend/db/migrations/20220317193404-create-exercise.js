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
      distance: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
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
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      weight: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      notes: {
        type: Sequelize.TEXT
      },
      completion_time: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
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
