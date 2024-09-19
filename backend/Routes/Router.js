const { Router } = require("express");

const homeRouter = require("./HomeRouter");

const loginRouter = require("./LoginRouter");

const courseRouter = require("./CourseRouter");
const studentRouter = require("./StudentRouter");
const cors = require("cors");

const router = Router();
// router.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );
router.use(function (req, res, next) {
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  res.header("Access-Control-Allow-Credentials", "true");
  // res.header("Access-Control-Allow-Methods", "PUT");
  // res.header("Access-Control-Allow-Methods", "DELETE");
  // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

router.use(homeRouter);

router.use(loginRouter);

router.use(courseRouter);

router.use(studentRouter);

async function errorsHandler(err, request, response, next) {
  try {
    response.status(400);

    const { details } = err;
    const error = {};

    details.forEach((element) => {
      const errorData = element.details[0];
      const { path, message } = errorData;
      error[path] = message.replaceAll('"', "");
    });
    response.json(error);
  } catch (err) {
    response.status(500).send({ error: "Internal Server Error" });
  }
}
router.use(errorsHandler);

module.exports = router;
