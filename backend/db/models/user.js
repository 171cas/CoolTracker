'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    first_name: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 30],
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 30],
      }
    },
    prof_pic: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 25],
        isNotEmail(value) {
          if (!Validator.isEmail(value)) {
            throw new Error('Must be a valid email.');
          }
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] }
        },
        loginUser: {
          attributes: {}
        }
      }
    });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Workout, { foreignKey: 'user_id' });
    User.hasMany(models.Exercise, { foreignKey: 'user_id' });
    User.hasMany(models.Like, { foreignKey: 'user_id' });
    User.hasMany(models.Comment, { foreignKey: 'user_id' });
    User.hasMany(models.Follower, { foreignKey: 'follower_id' });
    User.hasMany(models.Chat, { foreignKey: 'user_a' });
    User.hasMany(models.Chat, { foreignKey: 'user_b' });
    User.hasMany(models.Message, { foreignKey: 'user_id' });
    User.belongsTo(models.Follower, { foreignKey: 'id' });
  };
  //---------
  User.prototype.toSafeObject = function () {
    const { id, username, email, first_name, last_name, prof_pic } = this; // context will be the User instance
    return { id, username, email, first_name, last_name, prof_pic };
  };
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };
  User.signup = async function ({ username, first_name, last_name, email, prof_pic, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      first_name,
      last_name,
      prof_pic,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };
  //---------

  return User;
};
