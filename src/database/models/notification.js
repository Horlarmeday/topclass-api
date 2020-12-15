import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      nid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      sid: DataTypes.INTEGER,
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
      read_at: DataTypes.DATE,
      title: DataTypes.STRING,
      type: DataTypes.ENUM('Group', 'Individual'),
      category: DataTypes.STRING,
    },
    {}
  );
  Notification.associate = ({ Staff }) => {
    // associations can be defined here
    Notification.belongsTo(Staff, {
      foreignKey: 'sid',
    });
  };
  sequelizePaginate.paginate(Notification);
  return Notification;
};
