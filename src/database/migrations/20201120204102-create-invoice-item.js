module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Invoice_Items', {
      inv_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      item: {
        type: Sequelize.TEXT,
      },
      label: {
        type: Sequelize.STRING,
      },
      item_id: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Dispensed'),
        defaultValue: 'Pending',
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.DECIMAL(12, 2),
      },
      ivid: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('Invoice_Items');
  },
};
