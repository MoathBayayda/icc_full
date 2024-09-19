const sequelize = require("../ConfigDB");
const { DataTypes } = require("sequelize");

const studentModel = sequelize.define(
  "student",
  {
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registration_date: {
      type: DataTypes.DATE,
      allowNull: false,
      default: new Date().toISOString().slice(0, 10),
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reg_course_ids: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    certificates: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    national_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    schema: "public",
    freezeTableName: true,
    tableName: "student",
    timestamps: false,
  }
);

module.exports = studentModel;
