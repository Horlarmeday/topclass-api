import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const Waybill = sequelize.define(
    'Waybill',
    {
      wyid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      waybill_numb: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING,
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
      sid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      vehicle_numb: {
        type: DataTypes.STRING,
        allowNull: false,
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
      driver_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      driver_phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {}
  );
  Waybill.associate = ({ Staff, Customer, Invoice }) => {
    // associations can be defined here
    Waybill.belongsTo(Staff, {
      foreignKey: 'sid',
    });

    Waybill.belongsTo(Customer, {
      foreignKey: 'cid',
    });

    Waybill.belongsTo(Invoice, {
      foreignKey: 'ivid',
    });
  };

  sequelizePaginate.paginate(Waybill);
  return Waybill;
};
