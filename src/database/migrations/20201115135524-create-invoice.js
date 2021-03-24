module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Invoices', {
      ivid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      sid: {
        type: Sequelize.INTEGER,
      },
      comment: {
        type: Sequelize.STRING,
      },
      invoice_numb: {
        type: Sequelize.JSON,
      },
      is_approved: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      has_step_down: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      is_dispensed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      cid: {
        type: Sequelize.INTEGER,
      },
      vat: {
        type: Sequelize.FLOAT,
      },
      invoice_type: {
        type: Sequelize.STRING,
      },
      country_of_origin: {
        type: Sequelize.STRING,
      },
      condition_of_sale: {
        type: Sequelize.TEXT,
      },
      terms_of_payment: {
        type: Sequelize.TEXT,
      },
      delivery: {
        type: Sequelize.TEXT,
      },
      validity: {
        type: Sequelize.TEXT,
      },
      installation: {
        type: Sequelize.TEXT,
      },
      place_of_delivery: {
        type: Sequelize.STRING,
      },
      bank_id: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('Invoices');
  },
};
