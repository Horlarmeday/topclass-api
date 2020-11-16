module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Services', {
      svid: {
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
      sid: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('Services');
  },
};
