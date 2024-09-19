const studentModel = require("../Models/StudentModel");
const adminModel = require("../Models/AdminModel");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { passwordValidator } = require("../Validations/CUSTOME_VALIDATIONS");
const saltRounds = 2;
const SECRETKEY = "secretKey";

async function POST_login(request, response) {
  try {
    const student = await studentModel.findOne({
      where: { email: request.body.email },
    });
    if (!student) {
      return response
        .status(404)
        .send({ error: "email or password is invalid" });
    }
    const isMatch = await bcrypt.compare(
      request.body.password,
      student.password
    );
    if (!isMatch) {
      return response
        .status(401)
        .send({ error: "email or password is invalid" });
    }
    const { password, ...studentData } = student.get({ plain: true });

    const token = await jwt.sign(
      {
        email: studentData.email,
        student_id: studentData.student_id,
        admin: false,
        SameSite: "none",
        Secure: true,
      },
      SECRETKEY
    );
    response.cookie("token", token, {
      maxAge: 10000 * 60 * 60,
      httpOnly: true,
    });
    response.send(studentData);
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: "Internal server error" });
  }
}
async function POST_signup(request, response) {
  try {
    const signupObj = { ...request.body };
    signupObj.reg_course_ids = [];
    signupObj.certificate_ids = [];
    const hashedPassword = await bcrypt.hash(signupObj.password, saltRounds);
    signupObj.password = hashedPassword;
    const [newStudent] = await studentModel.findAll({
      where: {
        email: signupObj.email,
        [Op.or]: { national_id: signupObj.national_id },
        [Op.or]: { phone_number: signupObj.phone_number },
      },
      defaults: signupObj,
    });

    if (!newStudent) {
      const newStudent = await studentModel.create(signupObj);
      const { dataValues } = newStudent;
      const { password, ...rest } = dataValues;
      response.send(rest);
    } else {
      response.status(400).send({ error: "user already exists" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: "internal server error" });
  }
}
async function POST_auth(request, response) {
  try {
    console.log(request);
    const { token } = request.cookies;

    const { student_id } = await jwt.verify(token, SECRETKEY);

    const student = await studentModel.findByPk(student_id);
    if (student) {
      const { dataValues } = student;
      const { password, ...rest } = dataValues;
      response.send({ auth: true, message: "valid token", data: rest });
    } else {
      response.status(401).send({ error: "user doesn't exist" });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      response.status(401).send({ auth: false, message: "expired token" });
    } else {
      response.status(401).send({ auth: false, message: "invalid token" });
    }
  }
}
async function PUT_student(request, response) {
  try {
    const { token } = request.cookies;
    const { student_id } = await jwt.verify(token, SECRETKEY);
    console.log(token, request.body);
    const student = await studentModel.findByPk(student_id);
    if (student) {
      const isMatch = await bcrypt.compare(
        request.body.oldPassword,
        student.password
      );
      if (!isMatch) {
        return response.status(401).send({ error: "incorrect old password" });
      } else {
        let password = request.body.oldPassword;
        // console.log(
        //   1111111111111111,
        //   password,
        //   request.body.newPassword,
        //   request.body.oldPassword,
        //   request.body.newPassword !== request.body.oldPassword,
        //   request.body.newPassword
        // );
        const helpers = { message: (msg) => msg };
        if (
          request.body.newPassword !== request.body.oldPassword &&
          request.body.newPassword.length !== 0
        ) {
          if (
            request.body.newPassword ===
            passwordValidator(request.body.newPassword, helpers)
          )
            password = request.body.newPassword;
          else
            response.send({
              newPassword:
                "password is invalid it must includes at least 1 numbers ,1 small letters , 1 capital letters and a special character",
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const { oldPassword, newPassword, ...rest } = request.body;
        student.update(
          { password: hashedPassword, ...rest },
          {
            where: { id: student_id },
            returning: true,
          }
        );
        response.cookie("token", "", {
          maxAge: 0 * 0 * 0,
          httpOnly: true,
        });
        response.send();
      }
    } else {
      response.status(401).send({ error: "user doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      response.status(401).send({ auth: false, message: "expired token" });
    } else {
      response.status(401).send({ auth: false, message: "invalid token" });
    }
  }
}

async function POST_login_admin(request, response) {
  try {
    const admin = await adminModel.findOne({
      where: { admin_email: request.body.email },
    });
    if (!admin) {
      return response
        .status(404)
        .send({ error: "email or password is invalid" });
    }
    console.log(request.body);
    const isMatch = await bcrypt.compare(
      request.body.password,
      admin.admin_password
    );
    if (!isMatch) {
      return response
        .status(401)
        .send({ error: "email or password is invalid" });
    }
    const { admin_password, admin_email, admin_id } = admin.get({
      plain: true,
    });

    const token = await jwt.sign(
      {
        admin_email,
        admin_id,
        admin: true,
      },
      SECRETKEY
    );
    response.cookie("token", token, {
      maxAge: 10000 * 60 * 60,
      httpOnly: true,
      SameSite: "none",
      Secure: true,
    });
    response.status(200).send({ admin_email, admin_id });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: "Internal server error" });
  }
}
async function auth_admin(request, response) {
  try {
    console.log(request.cookies);
    const { token } = request.cookies;

    if (!token) return false;

    const { id, admin } = await jwt.verify(token, SECRETKEY);

    if (admin) return { id, admin };
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function POST_auth_admin(request, response) {
  try {
    console.log(request.cookies);
    const { token } = request.cookies;

    if (!token) return false;

    const { admin_id, admin } = await jwt.verify(token, SECRETKEY);
    console.log(1, admin_id);
    if (admin) {
      const adminData = await adminModel.findOne({
        where: { admin_id: admin_id },
      });
      if (adminData) {
        const adminPlain = adminData.get({ plain: true });
        const { admin_password, ...rest } = adminPlain;
        response
          .status(200)
          .send({ auth: true, message: "valid token", data: rest });
      }
    } else {
      response.status(400).send({ error: "auth failed" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: "server error" });
  }
}
async function POST_auth_student(request, response) {
  try {
    console.log(request.cookies);
    const { token } = request.cookies;

    if (!token) return false;

    const { student_id, email } = await jwt.verify(token, SECRETKEY);

    if (student_id) return { student_id, email };
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
async function POST_logout_student(request, response) {
  try {
    response.cookie("token", "", { maxAge: 0, httpOnly: true });
    response.status(200).send();
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: "server error" });
  }
}
async function PUT_admin(request, response) {
  try {
    if (!(await auth_admin(request, response))) {
      response.status(401).send({ error: "UNAUTHRIZED" });
      return;
    }
    const admin = await adminModel.findOne({
      where: { admin_id: request.body.admin_id },
    });
    if (admin) {
      const isMatch = await bcrypt.compare(
        request.body.oldPassword,
        admin.admin_password
      );
      if (!isMatch) {
        return response.status(401).send({ error: "incorrect old password" });
      } else {
        let password = request.body.oldPassword;
        const helpers = { message: (msg) => msg };
        if (
          request.body.newPassword !== request.body.oldPassword &&
          request.body.newPassword !== undefined &&
          request.body.newPassword.length !== 0
        ) {
          if (
            request.body.newPassword ===
            passwordValidator(request.body.newPassword, helpers)
          )
            password = request.body.newPassword;
          else
            response.send({
              newPassword:
                "password is invalid it must includes at least 1 numbers ,1 small letters , 1 capital letters and a special character",
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const { oldPassword, newPassword, ...rest } = request.body;
        admin.update(
          { admin_password: hashedPassword, ...rest },
          {
            where: { admin_id: request.body.admin_id },
            returning: true,
          }
        );
        response.cookie("token", "", {
          maxAge: 0 * 0 * 0,
          httpOnly: true,
        });
        response.send();
      }
    } else {
      response.status(401).send({ error: "admin doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
}
async function POST_signup_admin(request, response) {
  try {
    const signupObj = { ...request.body };
    const hashedPassword = await bcrypt.hash(
      signupObj.admin_password,
      saltRounds
    );
    signupObj.admin_password = hashedPassword;
    const [newAdmin] = await adminModel.findAll({
      where: { admin_email: signupObj.admin_email },
      defaults: signupObj,
    });

    if (!newAdmin) {
      const newAdmin = await adminModel.create(signupObj);
      const { dataValues } = newAdmin;
      const { admin_password, ...rest } = dataValues;
      response.send(rest);
    } else {
      response.status(400).send({ error: "admin  already exists" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: "internal server error" });
  }
}
module.exports = {
  POST_login,
  POST_signup,
  POST_auth,
  PUT_student,
  POST_auth_admin,
  POST_login_admin,
  POST_auth_student,
  POST_logout_student,
  auth_admin,
  PUT_admin,
  POST_signup_admin,
};
