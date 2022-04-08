'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      validate: {
        len: [1, 500]
      }
    },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Message.associate = function (models) {
    // associations can be defined here
    Message.belongsTo(models.User, { foreignKey: 'user_id' })
    Message.belongsTo(models.Chat, { foreignKey: 'chat_id' })
  };
  return Message;
};
