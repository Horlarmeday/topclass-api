module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Customers', {
      cid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      state: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      sid: {
        type: Sequelize.INTEGER,
      },
      lga: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      customer_type: {
        type: Sequelize.ENUM('Individual', 'Government', 'NGO', 'Corporate'),
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
    return queryInterface.dropTable('Customers');
  },
};
