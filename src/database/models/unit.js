import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define(
    'Unit',
    {
      uid: {
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
      sid: DataTypes.INTEGER,
    },
    {}
  );
  Unit.associate = ({ Staff }) => {
    // associations can be defined here
    Unit.belongsTo(Staff, {
      foreignKey: 'sid',
    });
  };

  sequelizePaginate.paginate(Unit);
  return Unit;
};
