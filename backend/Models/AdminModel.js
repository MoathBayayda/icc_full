/**
 * @module courseModel
 */

const sequelize = require("../ConfigDB");
const { DataTypes } = require("sequelize");
const adminModel = sequelize.define(
  "admin",
  {
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    admin_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
    freezeTableName: true,
    tableName: "admin",
    timestamps: false,
  }
);

module.exports = adminModel;
