/**
 * @module HomeRouter
 */

// Router code here
const cookieParser = require("cookie-parser");
const {
  GET_NEWS,
  POST_NEW,
  GET_NEW,
  DELETE_NEW,
  PUT_NEW,
} = require("../Controllers/HomeController");

const {
  GET_NEWS_VALIDATOR,
} = require("../Validations/news/GET_NEWS_VALIDATOR");

const {
  POST_NEW_VALIDATOR,
} = require("../Validations/news/POST_NEW_VALIDATOR");

const { GET_NEW_VALIDATOR } = require("../Validations/news/GET_NEW_VALIDATOR");

const {
  DELETE_NEW_VALIDATOR,
} = require("../Validations/news/DELETE_NEW_VALIDATOR");

const { Router } = require("express");
const { PUT_NEW_VALIDATOR } = require("../Validations/news/PUT_NEW_VALIDATOR");

/**
 * Express Router for handling home-related routes.
 *
 * @type {Router}
 */
const homeRouter = Router();

homeRouter.use(cookieParser());

/**
 * GET /news
 *
 * @name GET_NEWS
 * @function
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {void}
 */
homeRouter.get("/news", GET_NEWS_VALIDATOR, GET_NEWS);

/**
 * GET /news/id
 *
 * @name GET_NEW
 * @function
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {void}
 */
homeRouter.get("/news/id", GET_NEW_VALIDATOR, GET_NEW);

/**
 * POST /news
 *
 * @name POST_NEW
 * @function
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {void}
 */
homeRouter.post("/news", POST_NEW_VALIDATOR, POST_NEW);

/**
 * DELETE /news
 *
 * @name DELETE_NEW
 * @function
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {void}
 */
homeRouter.delete("/news", DELETE_NEW_VALIDATOR, DELETE_NEW);

homeRouter.put("/news/id", PUT_NEW_VALIDATOR, PUT_NEW);
module.exports = homeRouter;
