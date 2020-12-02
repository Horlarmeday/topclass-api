import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define(
    'Setting',
    {
      stid: {
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
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      desc: DataTypes.STRING,
      sid: DataTypes.INTEGER,
    },
    {}
  );
  Setting.associate = ({ Staff }) => {
    // associations can be defined here
    Setting.belongsTo(Staff, {
      foreignKey: 'sid',
    });
  };

  sequelizePaginate.paginate(Setting);
  return Setting;
};
