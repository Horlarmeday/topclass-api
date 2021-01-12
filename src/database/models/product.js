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
      },
      selling_price: {
        type: DataTypes.DECIMAL,
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
  Product.associate = ({ Staff }) => {
    // associations can be defined here
    Product.belongsTo(Staff, {
      foreignKey: 'sid',
    });
  };

  sequelizePaginate.paginate(Product);
  return Product;
};
