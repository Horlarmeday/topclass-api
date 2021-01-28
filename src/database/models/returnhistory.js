import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const ReturnHistory = sequelize.define(
    'ReturnHistory',
    {
      rid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      staff_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      reason: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Reason cannot be empty',
          },
        },
      },
      remain_quantity: DataTypes.INTEGER,
    },
    {
      tableName: 'return_histories',
    }
  );
  ReturnHistory.associate = ({ Product, Staff }) => {
    // associations can be defined here
    ReturnHistory.belongsTo(Product, {
      foreignKey: 'item_id',
    });

    ReturnHistory.belongsTo(Staff, {
      foreignKey: 'staff_id',
    });
  };
  sequelizePaginate.paginate(ReturnHistory);
  return ReturnHistory;
};
