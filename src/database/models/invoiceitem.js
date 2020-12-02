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
    },
    {
      tableName: 'invoice_items',
    }
  );
  InvoiceItem.associate = ({ Invoice }) => {
    // associations can be defined here
    InvoiceItem.belongsTo(Invoice, {
      foreignKey: 'ivid',
    });
  };
  return InvoiceItem;
};
