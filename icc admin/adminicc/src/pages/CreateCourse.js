import { useState, useEffect } from "react";
import useConfigCreateCourse from "../hooks/useConfigCreateCourse";
import Form from "../components/Form";
import PopUp from "../components/PopUp";
import notEmptyValidator from "../hooks/validators/notEmptyValidator";
import numberValidator from "../hooks/validators/numberValidator";
import daysValidator from "../hooks/validators/daysValidator";
import { usePostCourseMutation } from "../Store/Store";
import { IoAddCircleSharp } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
function CreateCourse() {
  const [hallNameValue, setHallNameValue] = useState("");
  const [instructorValue, setInstructorValue] = useState("");
  const [courseNameValue, setCourseNameValue] = useState("");
  const [passMarkValue, setPassMarkValue] = useState("");
  const [startingTimeValue, setStartingTimeValue] = useState("");
  const [endingTimeValue, setEndingTimeValue] = useState("");
  const [daysValue, setDaysValue] = useState("");
  const [maxStudentsValue, setMaxStudentsValue] = useState("");
  const [availabilityValue, setAvailabilityValue] = useState(false);
  const [priceValue, setPriceValue] = useState("");
  const [durationHoursValue, setDurationHoursValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [isError, setIsError] = useState(true);
  const [errors, setErrors] = useState("NO FIELD IS ALLOWED TO BE EMPTY");
  const [popupMsg, setPopupMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState([]);

  const [postCourses, postCoursesResult] = usePostCourseMutation();

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
      setIsError(true);
      setErrors("1 certificate at least must be included ");
    } else {
      setIsError(false);
      setErrors();
    }
  }

  const handleAction = () => {
    // Perform successful operation
    setIsSuccess(true);
  };

  const closePopup = () => {
    window.location.reload();
    setIsSuccess(false);
  };

  const hallNameOnChange = (event) => {
    setHallNameValue(event.target.value);
    const validation = notEmptyValidator(event.target.value);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  };

  const instructorOnChange = (event) => {
    setInstructorValue(event.target.value);
    const validation = notEmptyValidator(event.target.value);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  };

  const courseNameOnChange = (event) => {
    setCourseNameValue(event.target.value);
    const validation = notEmptyValidator(event.target.value);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  };

  const passMarkOnChange = (event) => {
    setPassMarkValue(parseInt(event.target.value));
    const validation = numberValidator(
      parseInt(event.target.value),
      100,
      20,
      "pass mark"
    );
    console.log(validation);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  };

  const startingTimeOnChange = (event) => {
    setStartingTimeValue(parseInt(event.target.value));
    const validation = numberValidator(
      parseInt(event.target.value),
      19,
      8,
      "starting time"
    );
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
    if (endingTimeValue - parseInt(event.target.value) <= 0) {
      setIsError(true);
      setErrors(
        "starting time must not equal ending time and the ending time must be bigger than starting time"
      );
    } else {
      setIsError(false);
      setErrors(validation);
    }
  };

  const endingTimeOnChange = (event) => {
    setEndingTimeValue(parseInt(event.target.value));
    const validation = numberValidator(
      parseInt(event.target.value),
      19,
      8,
      "ending time"
    );
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
    if (parseInt(event.target.value) - startingTimeValue <= 0) {
      setIsError(true);
      setErrors(
        "starting time must not equal ending time and the ending time must be bigger than starting time"
      );
    } else {
      setIsError(false);
      setErrors(validation);
    }
  };

  const daysOnChange = (event) => {
    setDaysValue(event.target.value);
    const validation = daysValidator(event.target.value);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  };

  const maxStudentsOnChange = (event) => {
    setMaxStudentsValue(parseInt(event.target.value));
    const validation = numberValidator(
      parseInt(event.target.value),
      500,
      0,
      "maximum number of students"
    );
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  };

  const availabilityOnChange = (event) => {
    setAvailabilityValue(event.target.checked);
  };

  const priceOnChange = (event) => {
    setPriceValue(parseInt(event.target.value));
    const validation = numberValidator(
      parseInt(event.target.value),
      500,
      0,
      "price"
    );
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  };

  const durationHoursOnChange = (event) => {
    setDurationHoursValue(parseInt(event.target.value));
    const validation = numberValidator(
      parseInt(event.target.value),
      8,
      0,
      "duration hours"
    );
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  };

  const descriptionOnChange = (event) => {
    setDescriptionValue(event.target.value);
    const validation = notEmptyValidator(event.target.value);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  };

  const states = {
    hallNameValue,
    hallNameOnChange,
    instructorValue,
    instructorOnChange,
    courseNameValue,
    courseNameOnChange,
    passMarkValue,
    passMarkOnChange,
    startingTimeValue,
    startingTimeOnChange,
    endingTimeValue,
    endingTimeOnChange,
    daysValue,
    daysOnChange,
    maxStudentsValue,
    maxStudentsOnChange,
    availabilityValue,
    availabilityOnChange,
    priceValue,
    priceOnChange,
    durationHoursValue,
    durationHoursOnChange,
    descriptionValue,
    descriptionOnChange,
    isError,
    errors,
  };

  function handleCourseSubmit(event) {
    event.preventDefault();
    if (isError) return;
    let validation =
      notEmptyValidator(hallNameValue) +
      "" +
      notEmptyValidator(instructorValue) +
      "" +
      notEmptyValidator(courseNameValue) +
      "" +
      notEmptyValidator(descriptionValue) +
      "" +
      numberValidator(passMarkValue, 100, 20, "pass mark") +
      "" +
      numberValidator(startingTimeValue, 19, 8, "starting time") +
      "" +
      numberValidator(endingTimeValue, 19, 8, "ending time") +
      "" +
      numberValidator(maxStudentsValue, 500, 0, "maximum number of students") +
      "" +
      numberValidator(priceValue, 500, 0, "price") +
      "" +
      numberValidator(durationHoursValue, 8, 0, "duration hours") +
      "" +
      daysValidator(daysValue);

    if (endingTimeValue - startingTimeValue <= 0) {
      validation +=
        "starting time must not equal ending time and the ending time must be bigger than starting time";
    } else {
      setIsError(false);
      setErrors(validation);
    }
    if (
      validation === "" &&
      !isError &&
      (errors === "" || errors === undefined)
    ) {
      if (certificateUrl.length === 0) {
        setIsError(true);
        setErrors("must at least include 1 certificate url");
        return;
      } else {
        const urlValidation = certificateUrl.filter(
          (url) => notEmptyValidator(url).length !== 0
        );
        if (urlValidation.length !== 0) {
          setIsError(true);
          setErrors("invalid certificate url");
          return;
        } else {
          setErrors();
          setIsError(false);
        }
      }
    } else {
      setErrors(validation);
      setIsError(true);
      return;
    }
    const dataObject = {
      hall_name: hallNameValue,
      instructor: instructorValue,
      course_name: courseNameValue,
      num_students: 0,
      pass_mark: passMarkValue,
      starting_time: startingTimeValue,
      ending_time: endingTimeValue,
      days: daysValue,
      max_students: maxStudentsValue,
      availability: availabilityValue,
      price: priceValue,
      duration_hours: durationHoursValue,
      registration_date: new Date().toISOString().slice(0, 10),
      description: descriptionValue,
      certificates: [...certificateUrl],
    };
    postCourses(dataObject);
  }

  useEffect(() => {
    console.log(postCoursesResult);
    if (!postCoursesResult.isUninitialized && !postCoursesResult.isLoading) {
      if (postCoursesResult.isError) {
        setPopupMsg("error adding course");
      } else {
        const timeout = setTimeout(() => {
          closePopup();
          window.location.reload();
        }, 1000);
        setPopupMsg("successfully added");
      }
      handleAction();
    }
  }, [postCoursesResult]);

  const coursesConfig = useConfigCreateCourse(states);

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
        <div>
          <Form
            config={coursesConfig}
            onChange={handleCourseSubmit}
            className="w-2/3"
          >
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
                          setIsError(true);
                          return;
                        } else {
                          setErrors();
                          setIsError(false);
                        }
                        if (certificateUrl.length === 0) {
                          setErrors("must at least include 1 certificate url");
                          setIsError(true);
                        } else {
                          setErrors();
                          setIsError(false);
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
          </Form>
        </div>
      </div>
    </div>
  );
}
export default CreateCourse;
