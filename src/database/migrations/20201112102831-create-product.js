module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      pid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      desc: {
        type: Sequelize.TEXT,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      cost: {
        type: Sequelize.DECIMAL(12, 2),
      },
      selling_price: {
        type: Sequelize.DECIMAL(12, 2),
      },
      comment: {
        type: Sequelize.STRING,
      },
      unit: {
        type: Sequelize.STRING,
      },
      label: {
        type: Sequelize.STRING,
      },
      sid: {
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
    return queryInterface.dropTable('Products');
  },
};
