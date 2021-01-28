module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Return_Histories', {
      rid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      staff_id: {
        type: Sequelize.INTEGER,
      },
      item_id: {
        type: Sequelize.INTEGER,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      remain_quantity: {
        type: Sequelize.INTEGER,
      },
      reason: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Return_Histories');
  },
};
