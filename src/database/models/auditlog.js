import sequelizePaginate from 'sequelize-paginate';

module.exports = (sequelize, DataTypes) => {
  const AuditLog = sequelize.define(
    'AuditLog',
    {
      alid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: DataTypes.TEXT,
      sid: DataTypes.INTEGER,
    },
    {}
  );
  AuditLog.associate = ({ Staff }) => {
    // associations can be defined here
    AuditLog.belongsTo(Staff, {
      foreignKey: 'sid',
    });
  };
  sequelizePaginate.paginate(AuditLog);
  return AuditLog;
};
