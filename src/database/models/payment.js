import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    'Payment',
    {
      ptid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
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
      slid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      sid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      bank: DataTypes.STRING,
      // label: DataTypes.STRING,
      payment_method: DataTypes.STRING,
    },
    {}
  );
  Payment.associate = ({ Staff, Sale, Invoice }) => {
    // associations can be defined here
    Payment.belongsTo(Staff, {
      foreignKey: 'sid',
    });

    Payment.belongsTo(Sale, {
      foreignKey: 'slid',
    });

    Payment.belongsTo(Invoice, {
      foreignKey: 'ivid',
    });
  };

  sequelizePaginate.paginate(Payment);
  return Payment;
};
