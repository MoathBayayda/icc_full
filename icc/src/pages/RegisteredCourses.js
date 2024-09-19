import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function RegisteredCourses() {
  const [renderedContent, setRenderedContent] = useState(
    "No registered courses to be displayed"
  );
  const student = useSelector((state) => state.student);
  console.log(student);
  const regCourses = useSelector((state) => [
    ...state.courses.filter((course) =>
      student.reg_course_ids.includes(course.course_id)
    ),
  ]);
  console.log(renderedContent);

  useEffect(() => {
    const content = regCourses.map((course, index) => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <div
          key={index}
          className="mb-2 border-b border-gray-700 border-2 rounded-md bg-gray-800 shadow-lg rounded-lg p-6 mb-4"
        >
          <h2 className="mb-2 border-b border-gray-500 border-2 rounded-md text-center text-xl font-semibold mb-3 text-white">
            {course.course_name}
          </h2>
          <ul className="text-green-200">
            <li className="py-1 px-2 flex justify-between mb-2 mb-2 border-b border-gray-500 border-2 rounded-md ">
              <span className="font-semibold text-white">Instructor:</span>{" "}
              {course.instructor}
            </li>
            <li className="py-1 px-2 flex justify-between mb-2 mb-2 border-b border-gray-500 border-2 rounded-md ">
              <span className="font-semibold text-white">Description:</span>{" "}
              {course.description}
            </li>
            <li className="py-1 px-2 flex justify-between mb-2 mb-2 border-b border-gray-500 border-2 rounded-md ">
              <span className="font-semibold text-white">Hall:</span>{" "}
              {course.hall_name}
            </li>
            <li className="py-1 px-2 flex justify-between mb-2 mb-2 border-b border-gray-500 border-2 rounded-md ">
              <span className="font-semibold text-white">Capacity:</span>{" "}
              {course.max_students}
            </li>
            <li className="py-1 px-2 flex justify-between mb-2 mb-2 border-b border-gray-500 border-2 rounded-md ">
              <span className="font-semibold text-white">Schedule:</span>{" "}
              {course.days}
            </li>
            <li className="py-1 px-2 flex justify-between mb-2 mb-2 border-b border-gray-500 border-2 rounded-md ">
              <span className="font-semibold text-white">Time :</span>{" "}
              {course.starting_time} - {course.ending_time}
            </li>
            <li className="py-1 px-2 flex justify-between mb-2 mb-2 border-b border-gray-500 border-2 rounded-md ">
              <span className="font-semibold text-white">Price:</span>{" "}
              {course.price}$
            </li>
          </ul>
        </div>
      </div>
    ));
    setRenderedContent(content);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {renderedContent.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-600">No registered courses to be shown</p>
        </div>
      ) : (
        renderedContent
      )}
    </div>
  );
}

export default RegisteredCourses;
