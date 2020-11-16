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
      comment: DataTypes.STRING,
      product: DataTypes.JSON,
      service: DataTypes.JSON,
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
    },
    {}
  );
  Invoice.associate = ({ Staff, Customer }) => {
    // associations can be defined here
    Invoice.belongsTo(Staff, {
      foreignKey: 'sid',
    });

    Invoice.belongsTo(Customer, {
      foreignKey: 'cid',
    });
  };

  sequelizePaginate.paginate(Invoice);
  return Invoice;
};
