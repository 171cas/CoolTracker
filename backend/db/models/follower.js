'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    follower: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followed: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Follower.associate = function (models) {
    // associations can be defined here
    Follower.belongsTo(models.User, { foreignKey: 'follower' })
    Follower.belongsTo(models.User, { foreignKey: 'followed' })
  };
  return Follower;
};
