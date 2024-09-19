/**
 * @module courseModel
 */

const sequelize = require("../ConfigDB");
const { DataTypes } = require("sequelize");

const courseModel = sequelize.define(
  "course",
  {
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    hall_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_ids: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    instructor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    num_students: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pass_mark: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    starting_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ending_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    days: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    max_students: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration_hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    registration_date: {
      type: DataTypes.DATE,
      allowNull: false,
      default: new Date().toISOString().slice(0, 10),
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    certificates: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    schema: "public",
    freezeTableName: true,
    tableName: "course",
    timestamps: false,
  }
);

module.exports = courseModel;
