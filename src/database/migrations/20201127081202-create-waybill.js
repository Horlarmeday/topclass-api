module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Waybills', {
      wyid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      waybill_numb: {
        type: Sequelize.STRING,
      },
      ivid: {
        type: Sequelize.INTEGER,
      },
      sid: {
        type: Sequelize.INTEGER,
      },
      vehicle_numb: {
        type: Sequelize.STRING,
      },
      cid: {
        type: Sequelize.INTEGER,
      },
      driver_name: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      driver_phone: {
        type: Sequelize.STRING,
      },
      date_of_transaction: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('Waybills');
  },
};
