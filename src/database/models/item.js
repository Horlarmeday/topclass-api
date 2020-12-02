import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    'Item',
    {
      did: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      item: {
        type: DataTypes.STRING,
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
      price: {
        type: DataTypes.DECIMAL,
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
      item_type: DataTypes.STRING,
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      sid: DataTypes.INTEGER,
    },
    {}
  );
  Item.associate = ({ Staff, Product, Service }) => {
    // associations can be defined here
    Item.belongsTo(Staff, {
      foreignKey: 'sid',
    });

    Item.belongsTo(Product, {
      foreignKey: 'item_id',
    });

    Item.belongsTo(Service, {
      foreignKey: 'item_id',
    });
  };

  sequelizePaginate.paginate(Item);
  return Item;
};
