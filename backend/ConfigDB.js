const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("icc", "icc@admin", "12345", {
  dialect: "postgres",
  host: "localhost",
  port: 5432,
});

module.exports = sequelize;