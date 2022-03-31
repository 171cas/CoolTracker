'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    workout_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 500]
      }
    },
  }, {});
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: 'user_id' })
    Comment.belongsTo(models.Workout, { foreignKey: 'workout_id' })
  };
  return Comment;
};
