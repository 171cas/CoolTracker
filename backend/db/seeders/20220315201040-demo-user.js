'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        first_name: 'Demo',
        last_name: 'User',
        prof_pic: 'https://i.pinimg.com/474x/7d/f2/2c/7df22cea2e18010c220232999a5abc57.jpg',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        first_name: 'Fake',
        last_name: 'User1',
        prof_pic: 'https://i.pinimg.com/originals/de/72/5d/de725de605a4ac008a44c19195d8a379.jpg',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        first_name: 'Fake',
        last_name: 'User2',
        prof_pic: 'https://images.squarespace-cdn.com/content/v1/51ef4493e4b0561c90fa76d6/1552662204584-T7V059IOXKML3FJP91RM/20180416_SLP0248-Edit.jpg',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
