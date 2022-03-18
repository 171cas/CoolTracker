'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    workout_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Like.associate = function (models) {
    // associations can be defined here
    Like.belongsTo(models.User, { foreignKey: 'user_id' })
    Like.belongsTo(models.Workout, { foreignKey: 'workout_id' })
  };
  return Like;
};
