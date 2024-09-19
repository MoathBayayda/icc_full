/**
 * @module newsModel
 */

const sequelize = require("../ConfigDB");
const { DataTypes } = require("sequelize");

/**
 * Represents the News model.
 * @typedef {Object} NewsModel
 * @property {number} news_id - The ID of the news (auto-incremented primary key).
 * @property {string} content - The content of the news.
 * @property {string} description - The description of the news.
 * @property {Date} news_date - The date of the news.
 */

const newsModel = sequelize.define(
  "news",
  {
    news_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    news_date: {
      type: DataTypes.DATE,
      allowNull: false,
      default: new Date().toISOString().slice(0, 10),
    },
    src: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    schema: "public",
    freezeTableName: true,
    tableName: "news",
    timestamps: false,
  }
);

module.exports = newsModel;
