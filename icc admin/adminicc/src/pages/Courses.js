import React from "react";
import { changePath, useDeleteCourseMutation } from "../Store/Store";
import Table from "../components/Table";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTableConfig from "../hooks/useTableConfig";
import Error from "./Error";
import PopUp from "../components/PopUp";
import {IoAddCircleSharp} from "react-icons/io5"
function Courses() {
  const [renderedContent, setRenderedContent] = useState();
  const courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const configArr = useTableConfig();

  const [deleteCourse, deleteCourseResult] = useDeleteCourseMutation();
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

  function handleEditCourse() {}

  function handleAddCourse(event) {
    event.preventDefault();
    dispatch(changePath("/courses/create"));
  }

  function handleDeleteCourse(event, course_id) {
    deleteCourse(course_id);
  }

  useEffect(() => {
    if (courses.length !== 0) {
      const data = courses.map((course) => {
        return {
          ...course,
          onAdd: handleEditCourse,
          onDelete: handleDeleteCourse,
        };
      });
      setRenderedContent(<Table data={[...configArr, ...data]}></Table>);
    } else {
      setRenderedContent(
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600">No available courses to be shown</p>
        </div>
      );
    }
  }, [courses]);

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

  return (
    <div className="flex items-center justify-center h-screen">
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
      <div
        className="mx-4 cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 shadow-x1 rounded-md mt-4 
      px-4 py-2 my-2 mx-1 text-black bg-gray-700 text-white hover:bg-gray-800 hover:text-green-200"
        onClick={handleAddCourse}
      >
        <button>
          <div className="flex items-center gap-2">
            <div>
              <IoAddCircleSharp />
            </div>
            <div className="mr-2"> Add course</div>
          </div>
        </button>
      </div>

      <div>{renderedContent}</div>
    </div>
  );
}

export default Courses;
