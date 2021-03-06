module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Payments', {
      ptid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.DECIMAL(12, 2),
      },
      ivid: {
        type: Sequelize.INTEGER,
      },
      slid: {
        type: Sequelize.INTEGER,
      },
      sid: {
        type: Sequelize.INTEGER,
      },
      bank: {
        type: Sequelize.INTEGER,
      },
      payment_method: {
        type: Sequelize.STRING,
      },
      label: Sequelize.STRING,
      date_of_payment: Sequelize.DATE,
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
    return queryInterface.dropTable('Payments');
  },
};
