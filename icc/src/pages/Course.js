import { useSelector } from "react-redux";

function Course() {
  const renderedCourseId = useSelector((state) => state.config.renderedCourseId);
  const [course] = useSelector((state) => {
    return state.courses.filter(
      (courseObj) => courseObj.course_id === renderedCourseId
    );
  });

  if (!course) {
    // Handle the case when the course is not found
    return <div>Course not found</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-3xl w-full bg-gray-800 text-green-200 p-4 shadow rounded-md">
        <h2 className="text-3xl font-bold mb-4 text-white text-center">{course.course_name}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between">
              <strong className="text-white">Course ID:</strong>
              <span>{course.course_id}</span>
            </p>
            <p className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between">
              <strong className="text-white">Course Instructor:</strong>
              <span>{course.instructor}</span>
            </p>
            <p className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between">
              <strong className="text-white">Hall Name:</strong>
              <span>{course.hall_name}</span>
            </p>
            <p className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between">
              <strong className="text-white">Number of Students:</strong>
              <span>{course.num_students}</span>
            </p>
            <p className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between">
              <strong className="text-white">Pass Mark:</strong>
              <span>{course.pass_mark}</span>
            </p>
            <p className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between">
              <strong className="text-white">Starting hour:</strong>
              <span>{course.starting_time}</span>
            </p>
            <p className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between">
              <strong className="text-white">Ending hour:</strong>
              <span>{course.ending_time}</span>
            </p>
          </div>
          <div>
            <p className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between">
              <strong className="text-white">Days:</strong>
              <span>{course.days}</span>
            </p>
            <p className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between">
              <strong className="text-white">Maximum Students:</strong>
              <span>{course.max_students}</span>
            </p>
            <p className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between">
              <strong className="text-white">Availability:</strong>
              <span>{course.availability ? "Open" : "Closed"}</span>
            </p>
            <p className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between">
              <strong className="text-white">Price:</strong>
              <span>{course.price+"$"}</span>
            </p>
            <p className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between">
              <strong className="text-white">Course weight (hours):</strong> {/* =======> duration}*/}
              <span>{course.duration_hours}</span>
            </p>
            <p className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between">
              <strong className="text-white">Registration Date:</strong>
              <span>{course.registration_date}</span>
            </p>
            <p className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between">
              <strong className="text-white">Description:</strong>
              <span>{course.description}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;
