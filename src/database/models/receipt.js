import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const Receipt = sequelize.define(
    'Receipt',
    {
      rcid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sid: {
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
      ptid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {}
  );
  Receipt.associate = ({ Staff, Sale }) => {
    // associations can be defined here
    Receipt.belongsTo(Staff, {
      foreignKey: 'sid',
    });

    Receipt.belongsTo(Sale, {
      foreignKey: 'slid',
    });
  };

  sequelizePaginate.paginate(Receipt);
  return Receipt;
};
