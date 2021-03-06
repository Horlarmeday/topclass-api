import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define(
    'Invoice',
    {
      ivid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      sid: DataTypes.INTEGER,
      vat: DataTypes.FLOAT,
      comment: DataTypes.STRING,
      invoice_numb: DataTypes.STRING,
      date_of_transaction: DataTypes.DATE,
      is_approved: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          notEmpty: true,
        },
      },
      has_step_down: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          notEmpty: true,
        },
      },
      is_dispensed: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      cid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      invoice_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      country_of_origin: {
        type: DataTypes.STRING,
      },
      condition_of_sale: {
        type: DataTypes.TEXT,
      },
      terms_of_payment: {
        type: DataTypes.TEXT,
      },
      delivery: {
        type: DataTypes.TEXT,
      },
      validity: {
        type: DataTypes.TEXT,
      },
      installation: {
        type: DataTypes.TEXT,
      },
      bank_id: {
        type: DataTypes.INTEGER,
      },
      place_of_delivery: {
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Invoice.associate = ({ Staff, Customer, InvoiceItem, Payment, Bank }) => {
    // associations can be defined here
    Invoice.belongsTo(Staff, {
      foreignKey: 'sid',
    });

    Invoice.belongsTo(Customer, {
      foreignKey: 'cid',
    });

    Invoice.hasMany(InvoiceItem, {
      foreignKey: 'ivid',
    });

    Invoice.hasMany(Payment, {
      foreignKey: 'ivid',
    });

    Invoice.belongsTo(Bank, {
      foreignKey: 'bank_id',
    });
  };

  sequelizePaginate.paginate(Invoice);
  return Invoice;
};
