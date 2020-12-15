import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    'Sale',
    {
      slid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount_paid: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      ivid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      amount_remaining: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      amount_due: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Partial', 'Paid'),
        allowNull: false,
        defaultValue: 'Pending',
      },
      cid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      sid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {}
  );
  Sale.associate = ({ Staff, Customer, Invoice, Payment, Receipt }) => {
    // associations can be defined here
    Sale.belongsTo(Staff, {
      foreignKey: 'sid',
    });

    Sale.belongsTo(Customer, {
      foreignKey: 'cid',
    });

    Sale.belongsTo(Invoice, {
      foreignKey: 'ivid',
    });

    Sale.hasMany(Payment, {
      foreignKey: 'slid',
    });

    Sale.hasMany(Receipt, {
      foreignKey: 'slid',
    });
  };

  sequelizePaginate.paginate(Sale);
  return Sale;
};
