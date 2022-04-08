'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Workouts', [
      {
        user_id: 1,
        date: '2022-03-01',
        notes: 'morning workout',
        completion_time: null,
        calories_burned: null,
        body_weight: null,
      },
      {
        user_id: 1,
        date: '2022-03-03',
        notes: 'HIIT',
        completion_time: 45,
        calories_burned: 600,
        body_weight: 155,
      },
      {
        user_id: 1,
        date: '2022-03-07',
        notes: 'recovery',
        completion_time: 60,
        calories_burned: 400,
        body_weight: null,
      },


      {
        user_id: 2,
        date: '2022-03-02',
        notes: 'Strength',
        completion_time: 45,
        calories_burned: null,
        body_weight: 185,
      },
      {
        user_id: 2,
        date: '2022-03-03',
        notes: 'Strech',
        completion_time: 60,
        calories_burned: 300,
        body_weight: 186,
      },
      {
        user_id: 2,
        date: '2022-03-05',
        notes: 'pull',
        completion_time: 45,
        calories_burned: 550,
        body_weight: 187,
      },



      {
        user_id: 3,
        date: '2022-03-01',
        notes: 'Morning Walk',
        completion_time: 55,
        calories_burned: 400,
        body_weight: 145,
      },
      {
        user_id: 3,
        date: '2022-03-04',
        notes: 'Cardio',
        completion_time: 60,
        calories_burned: 500,
        body_weight: 140,
      },
      {
        user_id: 3,
        date: '2022-03-07',
        notes: 'Outdoor Activity',
        completion_time: 60,
        calories_burned: 350,
        body_weight: 142,
      },



      {
        user_id: 4,
        date: '2022-03-02',
        notes: 'Fasting Cardio',
        completion_time: 55,
        calories_burned: 650,
        body_weight: 245,
      },
      {
        user_id: 4,
        date: '2022-03-04',
        notes: 'Strength',
        completion_time: 60,
        calories_burned: 500,
        body_weight: 245,
      },
      {
        user_id: 4,
        date: '2022-03-08',
        notes: 'Weightlifting',
        completion_time: 60,
        calories_burned: 550,
        body_weight: 247,
      },



      {
        user_id: 5,
        date: '2022-03-04',
        notes: 'Morning Swimming',
        completion_time: 55,
        calories_burned: 650,
        body_weight: 185,
      },
      {
        user_id: 5,
        date: '2022-03-07',
        notes: 'TV Show - Aerobics',
        completion_time: 60,
        calories_burned: 500,
        body_weight: 182,
      },
      {
        user_id: 5,
        date: '2022-03-09',
        notes: 'Run Conditioning',
        completion_time: 60,
        calories_burned: 550,
        body_weight: 181,
      },



      {
        user_id: 6,
        date: '2022-03-04',
        notes: 'Chest & Arms',
        completion_time: 55,
        calories_burned: 350,
        body_weight: 210,
      },
      {
        user_id: 6,
        date: '2022-03-07',
        notes: 'Chest & Arms',
        completion_time: 50,
        calories_burned: 300,
        body_weight: 210,
      },
      {
        user_id: 6,
        date: '2022-03-09',
        notes: 'Chest & Arms',
        completion_time: 55,
        calories_burned: 350,
        body_weight: 210,
      },




    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Workouts', null, {});
  }
};
