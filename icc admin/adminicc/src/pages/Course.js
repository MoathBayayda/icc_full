import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notEmptyValidator from "../hooks/validators/notEmptyValidator";
import numberValidator from "../hooks/validators/numberValidator";
import daysValidator from "../hooks/validators/daysValidator";
import PopUp from "../components/PopUp";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidSave } from "react-icons/bi";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";
import {
  changePath,
  fetchCoursesStudents,
  useDeleteCourseMutation,
  useGetRegStudentCoursesMutation,
  usePutCoursesMutation,
} from "../Store/Store";
function Course() {
  const renderedCourseId = useSelector(
    (state) => state.config.renderedCourseId
  );
  const [course] = useSelector((state) => {
    return state.courses.filter(
      (courseObj) => courseObj.course_id === renderedCourseId
    );
  });

  const [editMode, setEditMode] = useState(false);

  const [putCourses, putCoursesResult] = usePutCoursesMutation();

  const [editedCourse, setEditedCourse] = useState({
    course_name: course.course_name,
    instructor: course.instructor,
    hall_name: course.hall_name,
    num_students: course.num_students,
    pass_mark: course.pass_mark,
    starting_time: course.starting_time,
    ending_time: course.ending_time,
    days: course.days,
    max_students: course.max_students,
    availability: course.availability,
    price: course.price,
    duration_hours: course.duration_hours,
    registration_date: course.registration_date,
    description: course.description,
  });

  const [popupMsg, setPopupMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState(course.certificates);

  const dispatch = useDispatch();
  const [getRegStudentCourses, getRegStudentCoursesResult] =
    useGetRegStudentCoursesMutation();

  function onUrlChange(event, index) {
    const newCertificateUrl = [...certificateUrl];
    newCertificateUrl[index] = event.target.value;
    setCertificateUrl([...newCertificateUrl]);
  }
  function handleAddCertificate(event) {
    event.preventDefault();
    setCertificateUrl([...certificateUrl, ""]);
  }

  function handleDeleteCertificate(event, index) {
    const certificates = [...certificateUrl];
    certificates.splice(index, 1);
    setCertificateUrl(certificates);
    if (certificates.length === 0) {
      setErrors("1 certificate at least must be included ");
    } else {
      setErrors();
    }
  }

  const [deleteCourse, deleteCourseResult] = useDeleteCourseMutation();

  function handleDeleteCourse(event) {
    deleteCourse(renderedCourseId);
  }

  useEffect(() => {
    console.log(deleteCourseResult);
    if (!deleteCourseResult.isUninitialized && !deleteCourseResult.isLoading) {
      if (deleteCourseResult.isError) {
        setPopupMsg("Error deleting the course");
      } else {
        setPopupMsg("Course is deleted successfully");
      }
      handleAction();
    }
  }, [deleteCourseResult]);

  useEffect(() => {
    console.log(getRegStudentCoursesResult);
    if (
      !getRegStudentCoursesResult.isUninitialized &&
      !getRegStudentCoursesResult.isLoading
    ) {
      if (getRegStudentCoursesResult.isError) {
        setPopupMsg("Error fetching students the course");
      } else {
        setPopupMsg("Students are fetched successfully");
        dispatch(fetchCoursesStudents(getRegStudentCoursesResult.data));
        dispatch(changePath("/courses/id/students"));
      }
      handleAction();
    }
  }, [getRegStudentCoursesResult]);

  function handleViewStudents(event) {
    getRegStudentCourses(renderedCourseId);
  }
  const handleAction = () => {
    // Perform successful operation
    setIsSuccess(true);
  };

  const closePopup = () => {
    // window.location.reload();
    setIsSuccess(false);
  };

  const [errors, setErrors] = useState();
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (event, attribute) => {
    const { name, value, checked } = event.target;
    let validation = "";
    if (
      attribute === "course_name" ||
      attribute === "instructor" ||
      attribute === "hall_name" ||
      attribute === "description"
    ) {
      validation = notEmptyValidator(value);
    } else if (attribute === "pass_mark") {
      validation = numberValidator(value, 100, 20, attribute);
    } else if (attribute === "starting_time") {
      validation = numberValidator(value, 19, 8, attribute);
    } else if (attribute === "ending_time") {
      validation = numberValidator(value, 19, 8, attribute);
    } else if (attribute === "max_students") {
      validation = numberValidator(value, 500, 0, attribute);
    } else if (attribute === "price") {
      validation = numberValidator(value, 500, 0, attribute);
    } else if (attribute === "duration_hours") {
      validation = numberValidator(value, 8, 0, attribute);
    } else if (attribute === "days") {
      validation = daysValidator(value);
    }

    if (validation !== "") setErrors(validation);
    else setErrors();
    setEditedCourse((prevEditedCourse) => ({
      ...prevEditedCourse,
      [name]: attribute === "availability" ? checked : value,
    }));
  };

  function handleSave(event) {
    event.preventDefault();
    let validation =
      notEmptyValidator(editedCourse.course_name) +
      "" +
      notEmptyValidator(editedCourse.instructor) +
      "" +
      notEmptyValidator(editedCourse.hall_name) +
      "" +
      notEmptyValidator(editedCourse.description) +
      "" +
      numberValidator(editedCourse.pass_mark, 100, 20, "pass mark") +
      "" +
      numberValidator(editedCourse.starting_time, 19, 8, "starting time") +
      "" +
      numberValidator(editedCourse.ending_time, 19, 8, "ending time") +
      "" +
      numberValidator(
        editedCourse.max_students,
        500,
        0,
        "maximum number of students"
      ) +
      "" +
      numberValidator(editedCourse.price, 500, 0, "price") +
      "" +
      numberValidator(editedCourse.duration_hours, 8, 0, "duration hours") +
      "" +
      daysValidator(editedCourse.days);

    if (editedCourse.ending_time - editedCourse.starting_time <= 0) {
      validation +=
        "starting time must not equal ending time and the ending time must be bigger than starting time" +
        " ";
    }
    if (validation === "") {
      console.log(validation, errors);
      if (certificateUrl.length === 0) {
        setErrors("must at least include 1 certificate url");
        return;
      } else {
        const urlValidation = certificateUrl.filter(
          (url) => notEmptyValidator(url).length !== 0
        );
        if (urlValidation.length !== 0) {
          setErrors("invalid certificate url");
          return;
        } else {
          setErrors();
        }
      }
    } else {
      setErrors(validation);
      return;
    }
    const dataObject = {
      course_id: renderedCourseId,
      num_students: 0,
      certificates: [...certificateUrl],
      ...editedCourse,
    };
    console.log(dataObject);
    putCourses(dataObject);

    setEditMode(false);
  }

  useEffect(() => {
    console.log(putCoursesResult);
    if (!putCoursesResult.isUninitialized && !putCoursesResult.isLoading) {
      if (putCoursesResult.isError) {
        setPopupMsg("error while updating  course");
      } else {
        const timeout = setTimeout(() => {
          closePopup();
          // window.location.reload();
        }, 1000);
        setPopupMsg("successfully updated");
      }
      handleAction();
    }
  }, [putCoursesResult]);
  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="pt-32">
      <div>
        {isSuccess && (
          <PopUp
            message={popupMsg}
            onClose={closePopup}
            path="/courses"
            reload={false}
          />
        )}
      </div>
      <div className="flex items-center justify-center h-screen pt-2 pt-32">
        <div className="max-w-3xl w-full bg-gray-800 text-green-200 p-4 shadow rounded-md">
          {editMode ? (
            <div className="flex justify-between">
              <button
                className="mx-4 bg-gray-700 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-800 hover:text-green-200"
                onClick={handleSave}
              >
                <div className="flex items-center gap-2">
                  <div>
                    <BiSolidSave />
                  </div>
                  <div className="mr-2">Save</div>
                </div>
              </button>
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-800 hover:text-green-200"
                onClick={toggleEditMode}
              >
                <div className="flex items-center">
                  <div className="mr-2"> Cancel</div>
                  <div>
                    <MdOutlineCancel />
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className="flex justify-between">
              <button
                className="mx-4 bg-gray-700 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-800 hover:text-green-200"
                onClick={toggleEditMode}
              >
                <div className="flex items-center gap-2">
                  <div>
                    <AiFillEdit />
                  </div>
                  <div className="mr-2">Edit</div>
                </div>
              </button>
              <button
                className="cursor-pointer p-2 hover:bg-red-800 hover:text-green-200 
              shadow-x1  rounded-md mt-4 px-4 py-2 my-2 mx-1 text-red-800 bg-white"
                onClick={handleDeleteCourse}
              >
                <div className="flex items-center gap-2">
                  <div>
                    <AiFillDelete />
                  </div>
                  <div className="mr-2">Delete</div>
                </div>
              </button>
            </div>
          )}
          <h2 className="text-3xl font-bold mb-4 text-white text-center">
            {course.course_name}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              {Object.keys(editedCourse).map((attribute) => {
                if (
                  (attribute === "num_students" ||
                    attribute === "registration_date") &&
                  editMode
                ) {
                  return "";
                }
                return (
                  <p
                    key={attribute}
                    className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex 
                justify-between mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex 
                justify-between py-1"
                  >
                    <strong className="text-white">{attribute}:</strong>

                    {editMode ? (
                      attribute === "availability" ? (
                        <input
                          type="checkbox"
                          name={attribute}
                          checked={editedCourse[attribute]}
                          onChange={(event) =>
                            handleInputChange(event, attribute)
                          }
                          className="text-center placeholder-gray-400 text-green-800 font-bold focus:outline-none 
                  focus:ring-2 shadow-sm rounded-md ocus:ring-gray-500 focus:border-transparent"
                        />
                      ) : (
                        <input
                          type="text"
                          name={attribute}
                          value={editedCourse[attribute]}
                          onChange={(event) =>
                            handleInputChange(event, attribute)
                          }
                          className="text-center placeholder-gray-400 text-green-800 font-bold focus:outline-none 
                focus:ring-2 shadow-sm rounded-md ocus:ring-gray-500 focus:border-transparent"
                        />
                      )
                    ) : (
                      <span>
                        {attribute === "availability"
                          ? course[attribute]
                            ? "open"
                            : "close"
                          : course[attribute]}
                      </span>
                    )}
                  </p>
                );
              })}
            </div>
            {editMode ? (
              <div>
                {" "}
                <div>
                  <button
                    className="cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 shadow-x1 rounded-md mt-4 
      px-4 py-2 my-2 mx-1 text-black bg-gray-700 text-white hover:bg-gray-800 hover:text-green-200"
                    onClick={handleAddCertificate}
                  >
                    <div className="flex items-center gap-2">
                      <div>
                        <IoAddCircleSharp />
                      </div>
                      <div className="mr-2"> Add certificate</div>
                    </div>
                  </button>
                </div>
                <div>
                  {certificateUrl.map((url, index) => {
                    return (
                      <div>
                        <textarea
                          value={url}
                          onChange={(event) => {
                            onUrlChange(event, index);
                            const validation = notEmptyValidator(
                              event.target.value
                            );
                            if (validation.length !== 0) {
                              setErrors(validation);
                              return;
                            } else {
                            }
                            if (certificateUrl.length === 0) {
                              setErrors(
                                "must at least include 1 certificate url"
                              );
                            } else {
                              setErrors();
                            }
                          }}
                          className={
                            "py-1 text-center placeholder-gray-400 text-green-800 font-bold focus:outline-none focus:ring-2 shadow-sm " +
                            "rounded-md focus:ring-gray-500 focus:border-transparent"
                          }
                        ></textarea>
                        <button
                          className="cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 shadow-x1 rounded-md mt-4 
                          px-4 py-2 my-2 mx-1 text-black bg-gray-700
                          text-white hover:bg-gray-800 hover:text-green-200 mx-2"
                          onClick={(event) => {
                            handleDeleteCertificate(event, index);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <div>
                              <AiFillDelete />
                            </div>
                            <div className="mr-2">Delete</div>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div
                className="flex justify-between mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex 
              justify-between mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex 
              justify-between py-1"
              >
                <p className="text-white font-bold">certificate templates :</p>
                {certificateUrl.map((certificate) => {
                  return (
                    <div className="mt-2">
                      <embed
                        src={certificate}
                        type="application/pdf"
                        width="100%"
                        height="200"
                      />
                    </div>
                  );
                })}{" "}
              </div>
            )}
            <div className="text-red-500">{errors}</div>
            <button
              className="mx-4 bg-gray-700 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-800 hover:text-green-200"
              onClick={handleViewStudents}
            >
              View registered students
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;
