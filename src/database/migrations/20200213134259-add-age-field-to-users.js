'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'age', {
      type: Sequelize.INTEGER,
      allowNull: false
    }, { schema: "public" });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'age', { schema: "public" });
  }
};
