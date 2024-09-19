import { useDispatch, useSelector } from "react-redux";
import { changePath, changeRenderedCourse } from "../Store/Store";

function Table({ data }) {
  const { reg_course_ids } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  function handleViewCourseDetails(event, course_id) {
    event.preventDefault();
    dispatch(changePath("/courses/id"));
    dispatch(changeRenderedCourse(course_id));
  }
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <table className="table-auto w-full border-collapse bg-gray-800 rounded-md">
        <tbody>
          {data.map((course) => {
            const matchs = reg_course_ids.filter(
              (studentCourse) => studentCourse === course.course_id
            );
            let isRegCourse = true;
            if (matchs.length === 0) isRegCourse = false;
            return (
              <tr key={course.course_id}>
                <td
                  className={
                    "border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center " +
                    course.style
                  }
                >
                  {course.course_id}
                </td>
                <td
                  className={
                    "border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center " +
                    course.style
                  }
                >
                  {course.course_name}
                </td>
                <td
                  className={
                    "border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center " +
                    course.style
                  }
                >
                  {course.starting_time}
                </td>
                <td
                  className={
                    "border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center " +
                    course.style
                  }
                >
                  {course.ending_time}
                </td>
                <td
                  className={
                    "border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center " +
                    course.style
                  }
                >
                  {course.days}
                </td>
                <td
                  className={
                    "border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center " +
                    course.style
                  }
                >
                  {course.availability === "availability"
                    ? "availability"
                    : course.availability
                    ? "open"
                    : "closed"}
                </td>
                {course.onAdd && !isRegCourse && course.availability ? (
                  <td
                    className={
                      "border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center " +
                      course.style
                    }
                  >
                    <button
                      className="cursor-pointer p-2 hover:bg-green-800 hover:text-green-200 
                      shadow-x1  rounded-md mt-4 px-4 py-2 my-2 mx-1 text-green-800 bg-white"
                      onClick={(event) => course.onAdd(event, course.course_id)}
                    >
                      add course
                    </button>
                  </td>
                ) : (
                  ""
                )}

                {course.onDelete && isRegCourse ? (
                  <td
                    className={
                      "border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center " +
                      course.style
                    }
                  >
                    <button
                      className="cursor-pointer p-2 hover:bg-red-800 hover:text-green-200 
                      shadow-x1  rounded-md mt-4 px-4 py-2 my-2 mx-1 text-red-800 bg-white"
                      onClick={(event) =>
                        course.onDelete(event, course.course_id)
                      }
                    >
                      drop course
                    </button>
                  </td>
                ) : (
                  ""
                )}

                {course.onDelete ? (
                  <td
                    className={
                      "border-0 border-gray-800 px-4 py-2 font-semibold text-green-200 whitespace-nowrap text-center " +
                      course.style
                    }
                  >
                    <button
                      className="cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 
                      shadow-x1  rounded-md mt-4 px-4 py-2 my-2 mx-1 text-black bg-white"
                      onClick={(event) =>
                        handleViewCourseDetails(event, course.course_id)
                      }
                    >
                      course details
                    </button>
                  </td>
                ) : (
                  ""
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
