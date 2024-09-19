import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import notEmptyValidator from "../hooks/validators/notEmptyValidator";
import PopUp from "../components/PopUp";
import genderValidator from "../hooks/validators/genderValidator";
import phoneNumberValidator from "../hooks/validators/phoneNumberValidator";
import emailValidator from "../hooks/validators/emailValidator";
import nationalIdValidator from "../hooks/validators/nationalIdValidator";
import birthDateValidator from "../hooks/validators/birthDateValidator";
import { IoAddCircleSharp } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { BiSolidSave } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {
  useDeleteStudentMutation,
  usePutStudentMutation,
} from "../Store/Store";

function Student() {
  const renderedStudentID = useSelector(
    (state) => state.config.renderedStudentId
  );
  const [student] = useSelector((state) =>
    state.students.filter(
      (studentSingle) => studentSingle.student_id === renderedStudentID
    )
  );
  const [deleteStudent, deleteStudentResult] = useDeleteStudentMutation();
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    national_id: student.national_id,
    first_name: student.first_name,
    last_name: student.last_name,
    phone_number: student.phone_number,
    city: student.city,
    country: student.country,
    street: student.street,
    email: student.email,
    registration_date: student.registration_date,
    gender: student.gender,
    nationality: student.nationality,
    birth_date: student.birth_date,
    certificates: student.certificates,
    reg_course_ids: student.reg_course_ids,
  });

  const [putStudent, putStudentResult] = usePutStudentMutation();
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();

  const [popupMsg, setPopupMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAction = () => {
    // Perform successful operation
    setIsSuccess(true);
  };

  const [certificateUrl, setCertificateUrl] = useState(
    student.certificates ? [...student.certificates] : []
  );
  console.log(student);

  const onUrlChange = (event, index) => {
    const newCertificateUrl = [...certificateUrl];
    newCertificateUrl[index] = event.target.value;
    setCertificateUrl([...newCertificateUrl]);
  };

  const handleAddCertificate = (event) => {
    event.preventDefault();
    setCertificateUrl([...certificateUrl, ""]);
  };

  const handleDeleteCertificate = (event, index) => {
    const certificates = [...certificateUrl];
    certificates.splice(index, 1);
    setCertificateUrl(certificates);
  };

  const closePopup = () => {
    setIsSuccess(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  function handleDeleteStudent(event) {
    event.preventDefault();
    deleteStudent(student.student_id);
  }
  useEffect(() => {
    console.log(putStudentResult);
    if (!putStudentResult.isUninitialized && !putStudentResult.isLoading) {
      if (putStudentResult.isError) {
        setPopupMsg("Error updating student");
      } else {
        const timeout = setTimeout(() => {
          closePopup();
          window.location.reload();
        }, 1000);
        setPopupMsg("Student successfully updated ");
      }
      handleAction();
    }
  }, [putStudentResult]);
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

  const handleInputChange = (event, attribute) => {
    const { name, value } = event.target;
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    const validation =
      emailValidator(editedData.email) ||
      nationalIdValidator(editedData.national_id) ||
      phoneNumberValidator(editedData.phone_number) ||
      birthDateValidator(editedData.birth_date) ||
      genderValidator(editedData.gender) ||
      notEmptyValidator(editedData.first_name) ||
      notEmptyValidator(editedData.last_name) ||
      notEmptyValidator(editedData.city) ||
      notEmptyValidator(editedData.street) ||
      notEmptyValidator(editedData.country) ||
      notEmptyValidator(editedData.nationality);
    if (validation === undefined || validation === "") {
      const urlValidation = certificateUrl.filter(
        (url) => notEmptyValidator(url).length !== 0
      );
      if (urlValidation.length !== 0) {
        setErrors("invalid certificate url");
        return;
      } else {
        setErrors();
        const { reg_course_ids, registration_date, ...dataObj } = editedData;
        putStudent({
          student_id: renderedStudentID,
          ...dataObj,
          certificates: certificateUrl,
        });
      }
    } else {
      setErrors(validation);
    }
  };

  if (!editedData) {
    return <div>Can't find student </div>;
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
                className="cursor-pointer p-2 hover:bg-red-800 hover:text-green-200 shadow-x1 rounded-md mt-4 px-4 py-2 my-2 mx-1 text-red-800 bg-white"
                onClick={handleDeleteStudent}
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
            {editedData.first_name} {editedData.last_name}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              {Object.keys(editedData).map((attribute) => {
                if (attribute === "certificates") {
                  return (
                    <p
                      key={attribute}
                      className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between py-1"
                    >
                      <strong className="text-white">{attribute}:</strong>
                      <div className="mt-2">
                        <embed
                          src={editedData[attribute]}
                          type="application/pdf"
                          width="100%"
                          height="200"
                        />
                      </div>
                    </p>
                  );
                }
                if (attribute === "reg_course_ids") {
                  if (!editMode)
                    return (
                      <p
                        key={attribute}
                        className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between py-1"
                      >
                        <strong className="text-white">{attribute}:</strong>
                        <div>{editedData[attribute].join(",")}</div>
                      </p>
                    );
                  else return null;
                }
                if (attribute === "registration_date" && editMode) return null;
                return (
                  <p
                    key={attribute}
                    className="mb-2 border-b border-gray-500 border-2 border-gray-100 rounded-md px-2 flex justify-between py-1"
                  >
                    <strong className="text-white">{attribute}:</strong>
                    {editMode ? (
                      <input
                        type="text"
                        name={attribute}
                        value={editedData[attribute]}
                        onChange={(event) =>
                          handleInputChange(event, attribute)
                        }
                        className="text-center placeholder-gray-400 text-green-800 font-bold focus:outline-none focus:ring-2 shadow-sm rounded-md focus:ring-gray-500 focus:border-transparent"
                      />
                    ) : (
                      <span>{editedData[attribute]}</span>
                    )}
                  </p>
                );
              })}
            </div>
            {editMode ? (
              <div>
                <div>
                  <button
                    className="cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 shadow-x1 rounded-md mt-4 px-4 py-2 my-2 mx-1 text-black bg-gray-700 text-white hover:bg-gray-800 hover:text-green-200"
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
                      <div key={index}>
                        <textarea
                          value={url}
                          onChange={(event) => {
                            onUrlChange(event, index);
                          }}
                          className="py-1 text-center placeholder-gray-400 text-green-800 font-bold focus:outline-none focus:ring-2 shadow-sm rounded-md focus:ring-gray-500 focus:border-transparent"
                        ></textarea>
                        <button
                          className="cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 shadow-x1 rounded-md mt-4 px-4 py-2 my-2 mx-1 text-black bg-gray-700 text-white hover:bg-gray-800 hover:text-green-200 mx-2"
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
              ""
            )}
            {editMode ? <div className="text-red-500">{errors}</div> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
