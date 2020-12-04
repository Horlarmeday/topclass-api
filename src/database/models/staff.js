import sequelizePaginate from 'sequelize-paginate';
import bcrypt from 'bcryptjs';

import { sign } from 'jsonwebtoken';

module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define(
    'Staff',
    {
      sid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      guarantor_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      guarantor_phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.ENUM('Active', 'Inactive', 'Suspended'),
        defaultValue: 'Active',
      },
    },
    // {
    //   defaultScope: {
    //     attributes: {
    //       exclude: ['password'],
    //     },
    //   },
    // },
    {
      hooks: {
        // eslint-disable-next-line no-unused-vars
        async beforeCreate(staff, options) {
          const salt = await bcrypt.genSalt(16);
          staff.password = await bcrypt.hash(staff.password, salt);
        },
      },
    },
    {}
  );

  Staff.prototype.generateAuthToken = function() {
    return sign(
      {
        sub: this.sid,
        fullname: this.fullname,
        role: this.role,
        username: this.username,
      },
      process.env.JWT_SECRET
    );
  };

  Staff.associate = ({ Customer }) => {
    // associations can be defined here
    Staff.hasMany(Customer, {
      foreignKey: 'sid',
    });
  };

  sequelizePaginate.paginate(Staff);
  return Staff;
};
