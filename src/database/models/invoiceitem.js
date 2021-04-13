module.exports = (sequelize, DataTypes) => {
  const InvoiceItem = sequelize.define(
    'InvoiceItem',
    {
      inv_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      item: {
        type: DataTypes.TEXT,
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
      status: {
        type: DataTypes.ENUM('Pending', 'Dispensed'),
        allowNull: false,
        defaultValue: 'Pending',
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
          notEmpty: {
            msg: 'Quantity cannot be empty',
          },
        },
      },
      price: {
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
      item_type: {
        type: DataTypes.ENUM('Product', 'Service'),
        allowNull: false,
        defaultValue: 'Product',
      },
    },
    {
      tableName: 'invoice_items',
    }
  );
  InvoiceItem.associate = ({ Invoice, Product }) => {
    // associations can be defined here
    InvoiceItem.belongsTo(Invoice, {
      foreignKey: 'ivid',
    });

    InvoiceItem.belongsTo(Product, {
      foreignKey: 'item_id',
    });
  };
  return InvoiceItem;
};
