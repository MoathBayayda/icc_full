const { errors } = require("celebrate");
const courseModel = require("../Models/CourseModel");
const studentModel = require("../Models/StudentModel");
const {
  auth_admin,
  POST_auth_student,
  POST_auth_admin,
} = require("./LoginController");

async function POST_courses(request, response) {
  try {
    if (!(await auth_admin(request, response))) {
      response.status(401).send({ error: "UNAUTHRIZED" });
      return;
    }
    const rsltQuery = courseModel.create(request.body);
    if (rsltQuery) response.send();
    else response.sendStatus(400);
  } catch (error) {
    response.sendStatus(500);
  }
}

async function DELETE_courses(request, response) {
  try {
    if (!(await auth_admin(request, response))) {
      response.status(401).send({ error: "UNAUTHRIZED" });
      return;
    }
    const rsltQuery = await courseModel.destroy({
      where: { course_id: request.body.id },
    });
    if (rsltQuery) response.send();
    else response.status(404).send({ error: "CAN'T FIND SUCH ELEMENT" });
  } catch (error) {
    response.sendStatus(500);
  }
}
async function POST_course(request, response) {
  try {
    if (
      !(
        (await POST_auth_student(request, response)) ||
        (await auth_admin(request, response))
      )
    ) {
      response.status(401).send({ error: "UNAUTHRIZED" });
      return;
    }
    const course = await courseModel.findOne({
      where: { course_id: request.body.course_id },
    });
    if (course) {
      const student = await studentModel.findOne({
        where: { student_id: request.body.student_id },
      });
      if (student) {
        const coursePlain = await course.get({ plain: true }); //coursePlain is the object of the course that the student wants to register
        const studentPlain = await student.get({ plain: true });
        const isCourseReg = studentPlain.reg_course_ids.filter(
          (regCourse) => regCourse === course.course_id
        );
        if (isCourseReg.length !== 0)
          response.status(400).send({ error: "course already registered !" });
        else {
          console.log(studentPlain.reg_course_ids.length);
          for (let i = 0; i < studentPlain.reg_course_ids.length; i++) {
            const regCourse = await courseModel.findOne({
              where: { course_id: studentPlain.reg_course_ids[i] },
            });
            const regCoursePlain = await regCourse.get({ plain: true });
            if (regCoursePlain) {
              const regCourseDaysArr = regCoursePlain.days.split(",");
              const courseToBeRegArr = coursePlain.days.split(",");
              const regCourseDaysSet = new Set(regCourseDaysArr);
              const courseToBeRegSet = new Set(courseToBeRegArr);
              const commonDays = [...regCourseDaysSet].filter((day) =>
                courseToBeRegSet.has(day)
              );
              if (commonDays.length !== 0) {
                if (
                  !(
                    regCoursePlain.ending_time <= coursePlain.starting_time ||
                    regCoursePlain.starting_time >= coursePlain.ending_time
                  )
                ) {
                  response.status(400).send({
                    error:
                      "there's a conflict with a registered course !" +
                      'conflict course name is , "' +
                      regCoursePlain.course_name +
                      '"',
                  });
                  return;
                } else continue;
              } else continue;
            }
          }
          if (coursePlain.num_students >= coursePlain.max_students)
            coursePlain.availability = false;
          else coursePlain.num_students = coursePlain.num_students + 1;

          if (coursePlain.availability) {
            if (coursePlain.num_students === coursePlain.max_students)
              coursePlain.availability = false;
            if (!coursePlain.student_ids) coursePlain.student_ids = [];
            coursePlain.student_ids.push(studentPlain.student_id);
            const updateCourseRsltQuery = await courseModel.update(
              { ...coursePlain },
              {
                where: { course_id: coursePlain.course_id },
                returning: true,
              }
            );
            studentPlain.reg_course_ids.push(coursePlain.course_id);
            const rsltQuery = await studentModel.update(
              { ...studentPlain },
              {
                where: { student_id: studentPlain.student_id },
                returning: true,
              }
            );
            console.log(coursePlain, updateCourseRsltQuery);
            if (rsltQuery && updateCourseRsltQuery) {
              const rsltQueryPlain = await rsltQuery[1][0].get({ plain: true });
              response
                .status(200)
                .send({ reg_course_ids: rsltQueryPlain.reg_course_ids });
            } else response.status(500).send({ error: "server error" });
          } else
            response.status(400).send({
              error: "course is currently closed you can't register it",
            });
        }
      } else {
        response.status(404).send({ error: "NO SUCH STUDENT EXISTS" });
      }
    } else {
      response.status(404).send({ error: "NO SUCH COURSE EXISTS" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: "something went wrong" });
  }
}

async function PUT_courses(request, response) {
  try {
    if (!(await auth_admin(request, response))) {
      response.status(401).send({ error: "UNAUTHRIZED" });
      return;
    }

    const course = await courseModel.findOne({
      where: { course_id: request.body.course_id },
    });
    if (course) {
      const coursePlain = course.get({ plain: true });
      const rsltUpdateQuery = await courseModel.update(
        { ...request.body },
        {
          where: { course_id: request.body.course_id },
          returning: true,
        }
      );
      if (rsltUpdateQuery) response.send();
      else response.send(400);
    } else response.status(400).send({ error: "can't find such course" });
  } catch (error) {
    console.log(error);
    response.send(500);
  }
}
async function DELETE_course(request, response) {
  try {
    if (
      !(
        (await POST_auth_student(request, response)) ||
        (await auth_admin(request, response))
      )
    ) {
      response.status(401).send({ error: "UNAUTHRIZED" });
      return;
    }
    const course = await courseModel.findOne({
      where: { course_id: request.body.course_id },
    });
    if (course) {
      const student = await studentModel.findOne({
        where: { student_id: request.body.student_id },
      });
      if (student) {
        const coursePlain = await course.get({ plain: true }); //coursePlain is the object of the course that the student wants to register
        const studentPlain = await student.get({ plain: true });
        const isCourseReg = studentPlain.reg_course_ids.filter(
          (regCourse) => regCourse === course.course_id
        );
        if (isCourseReg.length !== 1)
          response.status(404).send({ error: "course is not registered" });
        else {
          studentPlain.reg_course_ids = [
            ...studentPlain.reg_course_ids.filter(
              (course_id) => course_id !== coursePlain.course_id
            ),
          ];
          if (coursePlain.num_students - 1 >= 0)
            coursePlain.num_students = coursePlain.num_students - 1;
          else
            response
              .status(400)
              .send({ error: "no such student did register this course" });
          if (coursePlain.num_students < coursePlain.max_students)
            coursePlain.availability = true;
          const newStudentsIds = coursePlain.student_ids.filter(
            (regStudent) => regStudent !== studentPlain.student_id
          );
          coursePlain.student_ids = [...newStudentsIds];
          const rslCoursetQuery = await courseModel.update(
            { ...coursePlain },
            {
              where: { course_id: coursePlain.course_id },
              returning: true,
            }
          );
          const rsltQuery = await studentModel.update(
            { ...studentPlain },
            {
              where: { student_id: studentPlain.student_id },
              returning: true,
            }
          );
          if (rsltQuery && rslCoursetQuery) response.send();
          else response.status(500).send({ error: "something went wrong" });
        }
      } else {
        response.status(404).send({ error: "NO SUCH STUDENT EXISTS" });
      }
    } else {
      response.status(404).send({ error: "NO SUCH COURSE EXISTS" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: "something went wrong" });
  }
}
async function GET_courses(request, response) {
  try {
    const allCourses = await courseModel.findAll();
    let coursesPlainArr = [];
    for (let i = 0; i < allCourses.length; i++) {
      const course = allCourses[i];
      const coursePlain = await course.get({ plain: true });
      coursesPlainArr.push(coursePlain);
    }

    if (allCourses) response.status(200).send({ data: coursesPlainArr });
    else response.status(500).send({ error: "something went wrong" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: "something went wrong" });
  }
}
async function GET_reg_courses(request, response) {
  try {
    if (!(await POST_auth_student(request, response))) {
      response.status(401).send({ error: "UNAUTHRIZED" });
      return;
    }
    const student = await studentModel.findOne({
      where: { student_id: request.query.student_id },
    });
    if (student) {
      const responseData = [];
      const studentPlain = student.get({ plain: true });
      for (let i = 0; i < studentPlain.reg_course_ids.length; i++) {
        const course = await courseModel.findOne({
          where: { course_id: studentPlain.reg_course_ids[i] },
        });
        if (course) {
          const coursePlain = course.get({ plain: true });
          responseData.push(coursePlain);
        }
      }
      response.send(responseData);
    } else {
      response.status(404).send({ error: "can't find student" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: "server error" });
  }
}
async function GET_course_students(request, response) {
  try {
    if (!(await auth_admin(request, response))) {
      response.status(401).send({ error: "UNAUTHRIZED" });
      return;
    }
    const course = await courseModel.findOne({
      where: { course_id: request.query.course_id },
    });
    if (course) {
      const coursePlain = course.get({ plain: true });
      const allRegStudents = [];
      if (!coursePlain.student_ids) coursePlain.student_ids = [];
      for (let i = 0; i < coursePlain.student_ids.length; i++) {
        const student = await studentModel.findOne({
          where: { student_id: coursePlain.student_ids[i] },
        });
        if (student) {
          const studentPlain = student.get({ plain: true });
          allRegStudents.push(studentPlain);
        } else {
          response.status(400).send({ error: "can't find such student" });
          return;
        }
      }
      response.send([...allRegStudents]);
    } else response.status(400).send({ error: "can't find course" });
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
}
module.exports = {
  POST_courses,
  DELETE_courses,
  POST_course,
  DELETE_course,
  GET_courses,
  GET_reg_courses,
  PUT_courses,
  GET_course_students,
};
