module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sales', {
      slid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount_paid: {
        type: Sequelize.DECIMAL(12, 2),
      },
      ivid: {
        type: Sequelize.INTEGER,
      },
      amount_remaining: {
        type: Sequelize.DECIMAL(12, 2),
      },
      amount_due: {
        type: Sequelize.DECIMAL(12, 2),
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Partial', 'Paid'),
        defaultValue: 'Pending',
      },
      cid: {
        type: Sequelize.INTEGER,
      },
      sid: {
        type: Sequelize.INTEGER,
      },
      discount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    return queryInterface.dropTable('Sales');
  },
};
