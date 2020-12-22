import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const DispenseHistory = sequelize.define(
    'DispenseHistory',
    {
      dhid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      item_id: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      sid: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      remain_quantity: DataTypes.INTEGER,
    },
    {
      tableName: 'dispense_histories',
    }
  );
  DispenseHistory.associate = ({ Staff, Product }) => {
    // associations can be defined here
    DispenseHistory.belongsTo(Staff, {
      foreignKey: 'sid',
    });

    DispenseHistory.belongsTo(Product, {
      foreignKey: 'item_id',
      as: 'products',
    });
  };
  sequelizePaginate.paginate(DispenseHistory);
  return DispenseHistory;
};
