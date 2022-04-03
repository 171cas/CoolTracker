'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followed_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Follower.associate = function (models) {
    // associations can be defined here
    Follower.belongsTo(models.User, { foreignKey: 'follower_id' })
    Follower.hasMany(models.User, { foreignKey: 'id' })
  };
  return Follower;
};
