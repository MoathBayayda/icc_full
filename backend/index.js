const express = require("express");

const morgan = require("morgan");

const bodyParser = require("body-parser");

const router = require("./Routes/Router");

const sequelize = require("./ConfigDB");

var cors = require("cors");

// const newsModel = require("./Models/NewsModel"); //to handle database

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const whitelist = ["http://localhost:3000", "http://localhost:3006"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Add this line
};

app.use(cors(corsOptions));

sequelize
  .authenticate()
  .then((data) => {
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));

app.use(router);

// localhost:3000 : home
