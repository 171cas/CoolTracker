'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    workout_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    distance: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 10000 //Meter or Mile? We can decide it later
      },
    },
    sets: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 1000
      },
    },
    reps: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 1000
      },
    },
    rest: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 86400 //24 hrs in seconds
      },
    },
    weight: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1, //Baby
        max: 1500 //World record is 1,400 lbs
      },
    },
    notes: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 500]
      }
    },
    completion_time: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 86400 //24 hrs in seconds
      },
    },
  }, {});
  Exercise.associate = function (models) {
    // associations can be defined here
    Exercise.belongsTo(models.User, { foreignKey: 'user_id' })
    Exercise.belongsTo(models.Workout, { foreignKey: 'workout_id' })
  };
  return Exercise;
};
