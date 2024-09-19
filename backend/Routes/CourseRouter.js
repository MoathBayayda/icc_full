const { Router } = require("express");

const cookieParser = require("cookie-parser");

const {
  POST_courses,
  DELETE_courses,
  POST_course,
  DELETE_course,
  GET_courses,
  GET_reg_courses,
  PUT_courses,
  GET_course_students,
} = require("../Controllers/CourseController");

const {
  POST_COURSES_VALIDATOR,
} = require("../Validations/courses/POST_COURSES_VALIDATOR");

const {
  DELETE_COURSES_VALIDATOR,
} = require("../Validations/courses/DELETE_COURSES_VALIDATOR");

const {
  POST_COURSE_VALIDATOR,
} = require("../Validations/courses/POST_COURSE_VALIDATOR");

const {
  DELETE_COURSE_VALIDATOR,
} = require("../Validations/courses/DELETE_COURSE_VALIDATOR");

const {
  GET_REG_COURSES_VALIDATOR,
} = require("../Validations/courses/GET_REG_COURSES_VALIDATOR");

const {
  PUT_COURSES_VALIDATOR,
} = require("../Validations/courses/PUT_COURSES_VALIDATOR");
const {
  GET_COURSE_STUDENTS_VALIDATOR,
} = require("../Validations/courses/GET_COURSE_STUDENTS_VALIDATOR");

const courseRouter = Router();

courseRouter.use(cookieParser());

courseRouter.post("/courses", POST_COURSES_VALIDATOR, POST_courses);

courseRouter.delete("/courses", DELETE_COURSES_VALIDATOR, DELETE_courses);

courseRouter.post("/course", POST_COURSE_VALIDATOR, POST_course);

courseRouter.delete("/course", DELETE_COURSE_VALIDATOR, DELETE_course);

courseRouter.get("/courses", GET_courses);

courseRouter.get("/regcourses", GET_REG_COURSES_VALIDATOR, GET_reg_courses);

courseRouter.put("/courses", PUT_COURSES_VALIDATOR, PUT_courses);

courseRouter.get(
  "/courses/students",
  GET_COURSE_STUDENTS_VALIDATOR,
  GET_course_students
);

module.exports = courseRouter;
