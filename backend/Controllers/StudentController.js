const courseModel = require("../Models/CourseModel");
const studentModel = require("../Models/StudentModel");
const { auth_admin, POST_auth_student } = require("./LoginController");
async function POST_student_certificate(request, response) {
  try {
    if (!(await auth_admin(request, response))) {
      response.status(401).send({ error: "UNAUTHRIZED" });
      return;
    }

    const student = await studentModel.findOne({
      where: { student_id: request.body.student_id },
    });

    if (student) {
      const studentPlain = student.get({ plain: true });

      if (!studentPlain.certificates) studentPlain.certificates = [];
      studentPlain.certificates.push(request.body.certificate);
      console.log(request.body);
      const rsltQuery = await studentModel.update(
        { ...studentPlain },
        {
          where: { student_id: studentPlain.student_id },
          returning: true,
        }
      );

      if (rsltQuery) response.sendStatus(200);
      else response.status(400).send({ error: "can't add certificate" });
    } else
      response
        .status(400)
        .send({ error: "can not find student with passed id" });
  } catch (error) {
    console.log(Error);
    response.status(500).send({ error: "server error" });
  }
}
async function GET_students(request, response) {
  try {
    if (!(await auth_admin(request, response))) {
      response.status(401).send({ error: "UNAUTHRIZED" });
      return;
    }
    const students = await studentModel.findAll();
    if (students) {
      console.log(students);
      const studentsPlain = students.map((student) =>
        student.get({ plain: true })
      );
      response.status(200).send([...studentsPlain]);
    } else {
      response.status(400).send({ error: "no students are available" });
    }
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
}
async function DELETE_student(request, response) {
  try {
    if (!(await auth_admin(request, response))) {
      response.status(401).send({ error: "UNAUTHRIZED" });
      return;
    }
    const student = await studentModel.findOne({
      where: { student_id: request.body.student_id },
    });
    if (student) {
      const studentPlain = student.get({ plain: true });
      if (!studentPlain.reg_course_ids) studentPlain.reg_course_ids = [];
      for (let i = 0; i < studentPlain.reg_course_ids.length; i++) {
        const course = await courseModel.findOne({
          where: { course_id: studentPlain.reg_course_ids[i] },
        });
        if (course) {
          const coursePlain = course.get({ plain: true });
          coursePlain.num_students -= 1;
          coursePlain.student_ids = [
            ...coursePlain.student_ids.filter(
              (studentId) => studentId !== studentPlain.student_id
            ),
          ];
          coursePlain.availability = true;
          const updateCourseQueryRslt = await courseModel.update(
            { ...coursePlain },
            {
              where: { course_id: coursePlain.course_id },
              returning: true,
            }
          );
          if (!updateCourseQueryRslt) {
            response.status(400).send({
              error: "error removing student from a registered course",
            });
          }
        } else {
          response.status(400).send({ error: "can't find registered course" });
          return;
        }
      }
      const rsltQuery = await studentModel.destroy({
        where: { student_id: request.body.student_id },
      });
      if (rsltQuery) response.send();
      else response.status(400).send({ error: "error deleting the student" });
    } else response.status(400).send({ error: "can't find student" });
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
}
async function PUT_student(request, response) {
  try {
    if (!(await auth_admin(request, response))) {
      response.status(401).send({ error: "UNAUTHRIZED" });
      return;
    }
    if (request.body.certificates === undefined) request.body.certificates = [];
    const student = await studentModel.findByPk(request.body.student_id);
    if (student) {
      const studentUpdateQuery = await studentModel.update(
        { ...request.body },
        {
          where: { student_id: request.body.student_id },
          returning: true,
        }
      );
      if (studentUpdateQuery) response.send();
      else response.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
}
module.exports = {
  POST_student_certificate,
  GET_students,
  DELETE_student,
  PUT_student,
};
