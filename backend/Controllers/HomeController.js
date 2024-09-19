/**
 * @module HomeController
 */
const newsModel = require("../Models/NewsModel");
const { Op } = require("sequelize");

/**
 * Retrieves news based on the provided minId and maxId.
 *
 * @param {object} request - The request object.
 * @param {object} response - The response object.
 * @returns {Promise<void>} - The response with the retrieved news.
 */
const { auth_admin } = require("./LoginController");

async function GET_NEWS(request, response) {
  try {
    const { minId, maxId } = request.query;
    const allNews = await newsModel.findAll({
      where: {
        news_id: {
          [Op.gte]: minId, // "morethan" condition using Sequelize.Op.gte (greater than or equal to)
          [Op.and]: {
            [Op.lte]: maxId, // "lessthan" condition using Sequelize.Op.lt (less than)
          },
        },
      },
    });
    const rsltArr = allNews.map((singleQuery) => {
      return {
        title: singleQuery.title,
        news_id: singleQuery.news_id,
        news_date: singleQuery.news_date,
        description: singleQuery.description,
        src: singleQuery.src,
      };
    });
    response.send(rsltArr);
  } catch (error) {
    response.send({ "SERVER-ERROR": 500 });
  }
}

/**
 * Retrieves a single news item based on the provided id.
 *
 * @param {object} request - The request object.
 * @param {object} response - The response object.
 * @returns {Promise<void>} - The response with the retrieved news item.
 */
async function GET_NEW(request, response) {
  try {
    const { id } = request.query;
    const [news] = await newsModel.findAll({
      where: {
        news_id: id,
      },
    });
    if (news) response.send(news.dataValues);
    else response.status(404).send({ ERROR: "CAN'T FIND SUCH ELEMENT" });
  } catch (error) {
    console.log(error);
    response.send({ "SERVER-ERROR": 500 });
  }
}

/**
 * Creates a new news item.
 *
 * @param {object} request - The request object.
 * @param {object} response - The response object.
 * @returns {Promise<void>} - The response with the created news item.
 */
async function POST_NEW(request, response) {
  //todo check user's auth
  try {
    if (!(await auth_admin(request, response))) {
      response.status(401).send({ ERROR: "UNAUTHRIZED" });
      return;
    }
    const { description, content, date, urls, title } = request.body;
    const src = await urls.map((url) => url.src);
    const rslt_query = await newsModel.create({
      title,
      description,
      content,
      news_date: date,
      src,
    });
    response.send(rslt_query);
  } catch (error) {
    console.log(error);
    response.send({ "SERVER-ERROR": 500 });
  }
}

/**
 * Deletes a news item based on the provided id.
 *
 * @param {object} request - The request object.
 * @param {object} response - The response object.
 * @returns {Promise<void>} - The response indicating the deletion status.
 */
async function DELETE_NEW(request, response) {
  //todo check user's auth
  try {
    if (!(await auth_admin(request, response))) {
      response.status(401).send({ ERROR: "UNAUTHRIZED" });
      return;
    }
    const { id } = request.query;
    const rslt = await newsModel.destroy({
      where: {
        news_id: id,
      },
    });
    if (rslt) response.send();
    else response.status(404).send({ ERROR: "CAN'T FIND SUCH ELEMENT" });
  } catch (error) {
    response.send({ "SERVER-ERROR": 500 });
    console.log(error);
  }
}

/**
 * Updates a news item based on the provided data.
 *
 * @param {object} request - The request object.
 * @param {object} response - The response object.
 * @returns {void}
 */
async function PUT_NEW(request, response) {
  //todo check user's auth
  try {
    if (!(await auth_admin(request, response))) {
      response.status(401).send({ ERROR: "UNAUTHRIZED" });
      return;
    }
    const newsQyery = await newsModel.findOne({
      where: { news_id: request.body.news_id },
    });
    if (newsQyery) {
      const newsPlain = newsQyery.get({ plain: true });
      const { news_id, ...rest } = request.body;
      const updateNewsQuery = await newsModel.update(
        { ...rest },
        {
          where: { news_id: news_id },
          returning: true,
        }
      );
      if (updateNewsQuery) {
        response.send()
      } else response.status(400).send({ error: "can't update news" });
    } else response.status(404).send({ ERROR: "CAN'T FIND SUCH ELEMENT" });
  } catch (error) {
    response.send({ "SERVER-ERROR": 500 });
    console.log(error);
  } 
}

module.exports = {
  GET_NEWS,
  POST_NEW,
  GET_NEW,
  DELETE_NEW,
  PUT_NEW,
};
