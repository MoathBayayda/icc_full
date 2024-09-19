import { useDispatch, useSelector } from "react-redux";
import {
  changePath,
  changeRenderedStudentId,
  useDeleteDropStudentCourseMutation,
  useDeleteStudentMutation,
  usePostStudentCourseMutation,
} from "../Store/Store";
import { FcViewDetails } from "react-icons/fc";
import { IoPersonRemove } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import PopUp from "../components/PopUp";
import { MdFiberNew } from "react-icons/md";
function Students({ courses }) {
  const studentsDate = useSelector((state) => state.students);
  const [studentIdForCourse, setStudentIdForCourse] = useState();
  const [isStudentIdInput, setIsStudentIdInput] = useState(false);
  const [postStudentCourse, postStudentCourseResult] =
    usePostStudentCourseMutation();
  const [deleteDropStudentCourse, deleteDropStudentCourseResult] =
    useDeleteDropStudentCourseMutation();
  const renderedCourseId = useSelector(
    (state) => state.config.renderedCourseId
  );
  const [course] = useSelector((state) => {
    return state.courses.filter(
      (courseObj) => courseObj.course_id === renderedCourseId
    );
  });

  const [popupMsg, setPopupMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAction = () => {
    // Perform successful operation
    setIsSuccess(true);
  };

  const closePopup = () => {
    window.location.reload();
    setIsSuccess(false);
  };

  const courseStudents = useSelector((state) => state.courseStudents);

  const [deleteStudent, deleteStudentResult] = useDeleteStudentMutation();

  const dispatch = useDispatch();

  function addStudentToCourse(event) {
    setIsStudentIdInput(!isStudentIdInput);
  }

  function handleSubmitAddStudentToCourse(event) {
    postStudentCourse({
      course_id: renderedCourseId,
      student_id: studentIdForCourse,
    });
  }

  useEffect(() => {
    console.log(postStudentCourseResult);
    if (
      !postStudentCourseResult.isUninitialized &&
      !postStudentCourseResult.isLoading
    ) {
      if (postStudentCourseResult.isError) {
        setPopupMsg(
          "Error adding student to this course , student may not exist or he/she already registered this course"
        );
      } else {
        const timeout = setTimeout(() => {
          closePopup();
          window.location.reload();
        }, 1000);
        setPopupMsg("Student successfully added ");
      }
      handleAction();
    }
  }, [postStudentCourseResult]);

  function createNewStudent() {
    dispatch(changePath("/students/create"));
  }

  function handleRemoveStudentCourse(event, student_id) {
    deleteDropStudentCourse({
      student_id: student_id,
      course_id: renderedCourseId,
    });
  }

  useEffect(() => {
    console.log(deleteDropStudentCourseResult);
    if (
      !deleteDropStudentCourseResult.isUninitialized &&
      !deleteDropStudentCourseResult.isLoading
    ) {
      if (deleteDropStudentCourseResult.isError) {
        setPopupMsg("Error droping student's course");
      } else {
        const timeout = setTimeout(() => {
          closePopup();
          window.location.reload();
        }, 1000);
        setPopupMsg("Student's course successfully droped ");
      }
      handleAction();
    }
  }, [deleteDropStudentCourseResult]);

  function handleDeleteStudent(event, student_id) {
    event.preventDefault();
    deleteStudent(student_id);
  }

  useEffect(() => {
    console.log(deleteStudentResult);
    if (
      !deleteStudentResult.isUninitialized &&
      !deleteStudentResult.isLoading
    ) {
      if (deleteStudentResult.isError) {
        setPopupMsg("error deleting student");
      } else {
        const timeout = setTimeout(() => {
          closePopup();
          window.location.reload();
        }, 1000);
        setPopupMsg("Student successfully deleted ");
      }
      handleAction();
    }
  }, [deleteStudentResult]);

  const students = courses ? courseStudents : studentsDate;

  function handleViewStudent(event, student_id) {
    event.preventDefault();
    dispatch(changePath("/students/id"));
    dispatch(changeRenderedStudentId(student_id));
  }
  console.log(students);
  if (students === undefined || students.length === 0)
    return (
      <div className="flex items-center justify-center h-64">
        <div>
          {isSuccess && (
            <PopUp
              message={popupMsg}
              onClose={closePopup}
              path="/courses"
              reload={true}
            />
          )}
        </div>
        {courses ? (
          <div>
            <button
              className="mx-4 my-4 bg-gray-700 text-white 
          px-4 py-2 rounded-md mt-4 hover:bg-gray-800 hover:text-green-200"
              onClick={addStudentToCourse}
            >
              <div className="flex items-center gap-2">
                <div>
                  <IoAddCircleSharp />
                </div>
                <div className="mr-2"> Add new student to this course</div>
              </div>
            </button>{" "}
          </div>
        ) : (
          <div>
            <button
              className="mx-4 my-4 bg-gray-700 text-white px-4 py-2 rounded-md mt-4 
          hover:bg-gray-800 hover:text-green-200"
              onClick={createNewStudent}
            >
              <div className="flex items-center gap-2">
                <div>
                  <MdFiberNew />
                </div>
                <div className="mr-2"> Create a student </div>
              </div>
            </button>
          </div>
        )}
        {isStudentIdInput ? (
          <div>
            {" "}
            <input
              className="py-1 text-center placeholder-gray-400 text-green-800 font-bold focus:outline-none focus:ring-2 
                shadow-sm rounded-md focus:ring-gray-500 focus:border-transparent"
              placeholder="student id you want to add"
              value={studentIdForCourse}
              onChange={(event) => {
                setStudentIdForCourse(parseInt(event.target.value));
              }}
              type="number"
            />{" "}
            <button
              className="mx-4 my-4 bg-gray-700 text-white 
          px-4 py-2 rounded-md mt-4 hover:bg-gray-800 hover:text-green-200"
              onClick={handleSubmitAddStudentToCourse}
            >
              {" "}
              <div className="flex items-center">
                <div className="mr-2"> Submit</div>
                <div>
                  <VscSend />
                </div>
              </div>
            </button>
          </div>
        ) : (
          ""
        )}
        <p className="text-gray-600"> No students are available to be shown</p>
      </div>
    );
  return (
    <div>
      <div>
        {isSuccess && (
          <PopUp
            message={popupMsg}
            onClose={closePopup}
            path="/courses"
            reload={true}
          />
        )}
      </div>
      <div className="w-full max-w-6xl mx-auto p-4">
        {courses ? (
          <div>
            <button
              className="mx-4 my-4 bg-gray-700 text-white 
          px-4 py-2 rounded-md mt-4 hover:bg-gray-800 hover:text-green-200"
              onClick={addStudentToCourse}
            >
              <div className="flex items-center gap-2">
                <div>
                  <IoAddCircleSharp />
                </div>
                <div className="mr-2"> Add new student to this course</div>
              </div>
            </button>{" "}
          </div>
        ) : (
          <div>
            <button
              className="mx-4 my-4 bg-gray-700 text-white px-4 py-2 rounded-md mt-4 
          hover:bg-gray-800 hover:text-green-200"
              onClick={createNewStudent}
            >
              <div className="flex items-center gap-2">
                <div>
                  <MdFiberNew />
                </div>
                <div className="mr-2"> Create a student </div>
              </div>
            </button>
          </div>
        )}
        {isStudentIdInput ? (
          <div>
            {" "}
            <input
              className="py-1 text-center placeholder-gray-400 text-green-800 font-bold focus:outline-none focus:ring-2 
              shadow-sm rounded-md focus:ring-gray-500 focus:border-transparent"
              placeholder="student id you want to add"
              value={studentIdForCourse}
              onChange={(event) => {
                setStudentIdForCourse(parseInt(event.target.value));
              }}
              type="number"
            />{" "}
            <button
              className="mx-4 my-4 bg-gray-700 text-white 
          px-4 py-2 rounded-md mt-4 hover:bg-gray-800 hover:text-green-200"
              onClick={handleSubmitAddStudentToCourse}
            >
              {" "}
              <div className="flex items-center">
                <div className="mr-2"> Submit</div>
                <div>
                  <VscSend />
                </div>
              </div>
            </button>
          </div>
        ) : (
          ""
        )}
        {courses ? (
          <div
            className="flex justify-center border-2 border-green-200 border-md px-4 py-2 font-semibold 
        text-green-200 bg-gray-800"
          >
            All students who registered {course.course_name}
          </div>
        ) : (
          <div
            className="flex justify-center border-2 border-green-200 border-md px-4 py-2 font-semibold 
        text-green-200 bg-gray-800"
          >
            All students in the Database
          </div>
        )}
        <table className="table-auto w-full border-collapse bg-gray-800 rounded-md">
          <tbody>
            {" "}
            <tr key={"student_config"}>
              <td className="border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center ">
                Student id
              </td>
              <td className="border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center ">
                Student first last name
              </td>
              <td className="border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center ">
                Student phone number
              </td>
              <td className="border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center ">
                Student email
              </td>
              <td className="border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center ">
                Student registration date
              </td>
            </tr>
          </tbody>
          <tbody>
            {students.map((student) => {
              return (
                <tr key={student.student_id}>
                  <td className="border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center ">
                    {student.student_id}
                  </td>
                  <td className="border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center ">
                    {student.first_name} {student.last_name}
                  </td>
                  <td className="border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center ">
                    {student.phone_number}
                  </td>
                  <td className="border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center ">
                    {student.email}
                  </td>
                  <td className="border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center ">
                    {student.registration_date}
                  </td>
                  <td>
                    <button
                      className="cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 
                  shadow-x1  rounded-md mt-4 px-4 py-2 my-2 mx-1 text-black bg-white"
                      onClick={(event) => {
                        handleViewStudent(event, student.student_id);
                      }}
                    >
                      <div className="flex items-center">
                        <div className="mr-2"> Student details</div>
                        <div>
                          <FcViewDetails />
                        </div>
                      </div>
                    </button>
                  </td>
                  {courses ? (
                    <td>
                      <button
                        className="cursor-pointer p-2 hover:bg-red-800 hover:text-green-200 
                      shadow-x1  rounded-md mt-4 px-4 py-2 my-2 mx-1 text-red-800 bg-white"
                        onClick={(event) => {
                          handleRemoveStudentCourse(event, student.student_id);
                        }}
                      >
                        <div className="flex items-center">
                          <div className="mr-2">
                            {" "}
                            Remove student from this course
                          </div>
                          <div>
                            <IoPersonRemove />
                          </div>
                        </div>
                      </button>
                    </td>
                  ) : (
                    <td>
                      <button
                        className="cursor-pointer p-2 hover:bg-red-800 hover:text-green-200 
                    shadow-x1  rounded-md mt-4 px-4 py-2 my-2 mx-1 text-red-800 bg-white "
                        onClick={(event) => {
                          handleDeleteStudent(event, student.student_id);
                        }}
                      >
                        <div className="flex items-center">
                          <div className="mr-2"> Remove student</div>
                          <div>
                            <IoPersonRemove />
                          </div>
                        </div>
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Students;
