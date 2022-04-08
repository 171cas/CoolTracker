'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        first_name: 'Demo',
        last_name: 'User',
        prof_pic: 'https://i.pinimg.com/474x/03/0d/19/030d19db63f2fbc8272520d3933933c9.jpg',
        email: 'demo@user.io',
        username: 'Demo',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        first_name: 'John',
        last_name: 'Smith',
        prof_pic: 'https://i.pinimg.com/originals/de/72/5d/de725de605a4ac008a44c19195d8a379.jpg',
        email: 'john@s.com',
        username: 'johnFit',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        first_name: 'Karla',
        last_name: 'Smith',
        prof_pic: 'https://images.squarespace-cdn.com/content/v1/51ef4493e4b0561c90fa76d6/1552662204584-T7V059IOXKML3FJP91RM/20180416_SLP0248-Edit.jpg',
        email: 'karla@s.com',
        username: 'happyKarla',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        first_name: 'Jay',
        last_name: 'Cutler',
        prof_pic: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Jay_Cutler_%E2%80%93_Loaded_050_%2815426951276%29.jpg',
        email: 'jay@c.com',
        username: 'superJay',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        first_name: 'Jack',
        last_name: 'LaLane',
        prof_pic: 'https://www.healthywomen.org/media-library/jack-lalanne.jpg?id=26946877&width=1200&quality=85&coordinates=40%2C0%2C68%2C0&height=800',
        email: 'jack@l.com',
        username: 'foreveryoung',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        first_name: 'The',
        last_name: 'Rock',
        prof_pic: 'https://media.vanityfair.com/photos/5b46274a6520f70b78e5cfe5/master/pass/The-Rock-2020-Potential-Run.jpg',
        email: 'the@r.com',
        username: 'theRock',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
