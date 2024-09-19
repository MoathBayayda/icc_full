import React from "react";
import {
  changePath,
  dropRegCourse,
  fetchCourses,
  regCourse,
  useDeleteCourseMutation,
  useGetCoursesQuery,
  usePostCourseMutation,
} from "../Store/Store";
import Table from "../components/Table";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTableConfig from "../hooks/useTableConfig";
import Error from "./Error";
import PopUp from "../components/PopUp";

function Courses() {
  const [renderedContent, setRenderedContent] = useState();
  const courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const getCoursesResponse = useGetCoursesQuery();
  const configArr = useTableConfig();

  const [popupMsg, setPopupMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [postCourse, postCourseResult] = usePostCourseMutation();
  const [deleteCourse, deleteCourseResult] = useDeleteCourseMutation();
  const { student_id } = useSelector((state) => state.student);
  const [droppedCourseId, setDroppedCourseId] = useState();

  function handleAddCourse(event, course_id) {
    postCourse({ student_id, course_id });
    //dispatch
  }

  function handleDeleteCourse(event, course_id) {
    deleteCourse({ student_id, course_id });
    setDroppedCourseId(course_id);
    //dispatch
  }

  useEffect(() => {
    if (!postCourseResult.isUninitialized && !postCourseResult.isLoading) {
      if (postCourseResult.error) {
        setPopupMsg(postCourseResult.error.data.error);
        handleAction();
      } else {
        console.log(postCourseResult);
        setPopupMsg("Course registered successfully !");
        handleAction();
        dispatch(regCourse(postCourseResult.data.reg_course_ids));
        getCoursesResponse.refetch();
      }
    }
  }, [postCourseResult]);

  useEffect(() => {
    if (!deleteCourseResult.isUninitialized && !deleteCourseResult.isLoading) {
      if (deleteCourseResult.error) {
        setPopupMsg(deleteCourseResult.error.data.error);
      } else {
        setPopupMsg("Course dropped successfully");
        handleAction();
        dispatch(dropRegCourse(droppedCourseId));
        getCoursesResponse.refetch();
      }
    }
  }, [deleteCourseResult]);

  const handleAction = () => {
    // Perform successful operation
    setIsSuccess(true);
  };

  const closePopup = () => {
    setIsSuccess(false);
  };

  useEffect(() => {
    console.log(getCoursesResponse);
    if (!getCoursesResponse.isLoading && !getCoursesResponse.isUninitialized) {
      if (getCoursesResponse.error) {
        setRenderedContent(
          <Error errorCode={getCoursesResponse.error.status}></Error>
        );
      } else {
        dispatch(fetchCourses(getCoursesResponse.data.data));
      }
    }
  }, [getCoursesResponse]);

  useEffect(() => {
    console.log(1);
    if (courses.length !== 0) {
      const data = courses.map((course) => {
        return {
          ...course,
          onAdd: handleAddCourse,
          onDelete: handleDeleteCourse,
        };
      });
      setRenderedContent(<Table data={[...configArr, ...data]}></Table>);
    } else {
      setRenderedContent(
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600">No available courses to be registered is to be shown</p>
        </div>
      );
    }
  }, [courses]);

  return (
    <div className="flex items-center justify-center h-screen">
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
      {renderedContent}
    </div>
  );
}

export default Courses;
