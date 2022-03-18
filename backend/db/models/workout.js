'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define('Workout', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
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
    calories_burned: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 20000 //World record is 19,000Cal
      },
    },
    body_weight: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1, //Baby
        max: 1500 //World record is 1,400 lbs
      },
    },
  }, {});
  Workout.associate = function (models) {
    // associations can be defined here
    Workout.belongsTo(models.User, { foreignKey: 'user_id' })
    Workout.hasMany(models.Exercise, { foreignKey: 'workout_id' });
    Workout.hasMany(models.Like, { foreignKey: 'workout_id' });
  };

  //---------
  Workout.createWo = async function ({
    user_id,
    date,
    notes,
    completion_time,
    calories_burned,
    body_weight
  }) {
    const workout = await Workout.create({
      user_id,
      date,
      notes,
      completion_time,
      calories_burned,
      body_weight
    });
    return await Workout.findByPk(workout.id);
  };
  //---------





  return Workout;
};
