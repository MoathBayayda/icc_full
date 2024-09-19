const { Router } = require("express");

const cookieParser = require("cookie-parser");
const {
  POST_student_certificate,
  GET_students,
  DELETE_student,
  PUT_student
} = require("../Controllers/StudentController");
const {
  POST_STUDENT_CERTIFICATE_VALIDATOR,
} = require("../Validations/users/students/POST_STUDENT_CERTIFICATE_VALIDATOR");

const {
  DELETE_STUDENT_VALIDATOR,
} = require("../Validations/users/students/DELETE_STUDENT_VALIDATOR");

const {
  PUT_STUDENT_ADMIN_VALIDATOR,
} = require("../Validations/users/students/PUT_STUDENT_ADMIN_VALIDATOR");

const studentRouter = Router();

studentRouter.use(cookieParser());

studentRouter.get("/students", GET_students);

studentRouter.delete("/students", DELETE_STUDENT_VALIDATOR, DELETE_student);

studentRouter.put("/admin/student", PUT_STUDENT_ADMIN_VALIDATOR, PUT_student);

studentRouter.post(
  "/student/certificate",
  POST_STUDENT_CERTIFICATE_VALIDATOR,
  POST_student_certificate
);
module.exports = studentRouter;
