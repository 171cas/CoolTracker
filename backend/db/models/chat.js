'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    user_a: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_b: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Chat.associate = function (models) {
    // associations can be defined here
    Chat.belongsTo(models.User, { foreignKey: 'user_a' })
    Chat.belongsTo(models.User, { foreignKey: 'user_b' })
    Chat.hasMany(models.Message, { foreignKey: 'chat_id' })
  };
  return Chat;
};
