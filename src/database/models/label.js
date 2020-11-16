import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const Label = sequelize.define(
    'Label',
    {
      lid: {
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
  Label.associate = ({ Staff }) => {
    // associations can be defined here
    Label.belongsTo(Staff, {
      foreignKey: 'sid',
    });
  };

  sequelizePaginate.paginate(Label);
  return Label;
};
