import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      pid: {
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
      desc: DataTypes.TEXT,
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      cost: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      selling_price: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      comment: DataTypes.STRING,
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      label: {
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
  Product.associate = ({ Staff, ReturnHistory, DispenseHistory }) => {
    // associations can be defined here
    Product.belongsTo(Staff, {
      foreignKey: 'sid',
    });

    Product.hasMany(ReturnHistory, {
      foreignKey: 'item_id',
    });

    Product.hasMany(DispenseHistory, {
      foreignKey: 'item_id',
    });
  };

  sequelizePaginate.paginate(Product);
  return Product;
};
