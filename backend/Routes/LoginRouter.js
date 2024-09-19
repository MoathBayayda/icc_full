const { Router } = require("express");

const cookieParser = require("cookie-parser");

const {
  POST_LOGIN_VALIDATOR,
} = require("../Validations/users/students/POST_LOGIN_VALIDATOR");

const {
  POST_AUTH_VALIDATOR,
} = require("../Validations/users/students/POST_AUTH_VALIDATOR");

const {
  POST_SIGNUP_VALIDATOR,
} = require("../Validations/users/students/POST_SIGNUP_VALIDATOR");

const {
  PUT_STUDENT_VALIDATOR,
} = require("../Validations/users/students/PUT_STUDENT_VALIDATOR");

const {
  PUT_ADMIN_VALIDATOR,
} = require("../Validations/users/Admin/PUT_ADMIN_VALIDATOR");

const {
  POST_SIGNUP_ADMIN,
} = require("../Validations/users/Admin/POST_SIGNUP_ADMIN");

const {
  POST_login,
  POST_auth,
  POST_signup,
  PUT_student,
  POST_auth_admin,
  POST_login_admin,
  POST_logout_student,
  PUT_admin,
  POST_signup_admin,
} = require("../Controllers/LoginController");

const loginRouter = Router();

loginRouter.use(cookieParser());

loginRouter.post("/login", POST_LOGIN_VALIDATOR, POST_login);

loginRouter.post("/auth", POST_AUTH_VALIDATOR, POST_auth);

loginRouter.post("/signup", POST_SIGNUP_VALIDATOR, POST_signup);

loginRouter.put("/student", PUT_STUDENT_VALIDATOR, PUT_student);

loginRouter.post("/loginAdmin", POST_LOGIN_VALIDATOR, POST_login_admin);

loginRouter.post("/authAdmin", POST_AUTH_VALIDATOR, POST_auth_admin);

loginRouter.post("/logout", POST_logout_student);

loginRouter.put("/admin", PUT_ADMIN_VALIDATOR, PUT_admin);

loginRouter.post("/signup/admin", POST_SIGNUP_ADMIN, POST_signup_admin);

module.exports = loginRouter;
