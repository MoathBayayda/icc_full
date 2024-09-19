import { useState, useEffect } from "react";
import useConfSignupForm from "../hooks/useConfSignupForm";
import Form from "../components/Form";
import emailValidator from "../hooks/validators/emailValidator";
import passwordValidator from "../hooks/validators/passwordValidator";
import phoneNumberValidator from "../hooks/validators/phoneNumberValidator";
import genderValidator from "../hooks/validators/genderValidator";
import birthDateValidator from "../hooks/validators/birthDateValidator";
import nationalIdValidator from "../hooks/validators/nationalIdValidator";
import { useDispatch, useSelector } from "react-redux";
import {
  usePutStudentMutation,
  fetchStudent,
  changeIsLoggedIn,
} from "../Store/Store";

import PopUp from "../components/PopUp";
function Profile() {
  const student = useSelector((state) => state.student);
  const [emailValue, setEmailValue] = useState(student.email);
  const [nationalIdValue, setNationalIdValue] = useState(student.national_id);
  const [oldPasswordValue, setOldPasswordValue] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState(student.first_name);
  const [lastNameValue, setLastNameValue] = useState(student.last_name);
  const [phoneNumberValue, setPhoneNumberValue] = useState(
    student.phone_number
  );
  const [countryValue, setCountryValue] = useState(student.country);
  const [cityValue, setCityValue] = useState(student.city);
  const [streetValue, setStreetValue] = useState(student.street);
  const [genderValue, setGenderValue] = useState(student.gender);
  const [nationalityValue, setNationalityValue] = useState(student.nationality);
  const [dbValue, setDbValue] = useState(student.birth_date);
  const [isError, setIsError] = useState(true);
  const [errors, setErrors] = useState("NO FIELD IS ALLOWED TO BE EMPTY");

  const dispatch = useDispatch();

  const [putStudent, result] = usePutStudentMutation();

  const [isSuccess, setIsSuccess] = useState(false);

  const handleAction = () => {
    // Perform successful operation
    console.log(isSuccess);
    setIsSuccess(true);
  };

  const closePopup = () => {
    setIsSuccess(false);
  };

  function emailOnChange(event) {
    setEmailValue(event.target.value);
    const validation = emailValidator(event.target.value);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  }

  function oldPasswordOnChange(event) {
    setOldPasswordValue(event.target.value);
    const validation = passwordValidator(event.target.value);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  }

  function newPasswordOnChange(event) {
    setNewPasswordValue(event.target.value);
    const validation = passwordValidator(event.target.value);
    if (validation !== "" && event.target.value !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
    }
  }

  function firstNameOnChange(event) {
    setFirstNameValue(event.target.value);
  }

  function lastNameOnChange(event) {
    setLastNameValue(event.target.value);
  }

  function phoneNumberOnChange(event) {
    setPhoneNumberValue(event.target.value);
    const validation = phoneNumberValidator(event.target.value);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  }

  function countryOnChange(event) {
    setCountryValue(event.target.value);
  }

  function cityOnChange(event) {
    setCityValue(event.target.value);
  }

  function streetOnChange(event) {
    setStreetValue(event.target.value);
  }

  function nationalityOnChange(event) {
    setNationalityValue(event.target.value);
  }

  function genderOnChange(event) {
    setGenderValue(event.target.value);
    const validation = genderValidator(event.target.value);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  }

  function dbOnChange(event) {
    setDbValue(event.target.value);
    const validation = birthDateValidator(event.target.value);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  }

  function nationalIdOnChange(event) {
    setNationalIdValue(event.target.value);
    const validation = nationalIdValidator(event.target.value);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  }

  const config = useConfSignupForm(
    {
      emailValue,
      nationalIdValue,
      oldPasswordValue,
      newPasswordValue,
      firstNameValue,
      lastNameValue,
      phoneNumberValue,
      countryValue,
      cityValue,
      streetValue,
      genderValue,
      nationalityValue,
      dbValue,
      oldPasswordOnChange,
      firstNameOnChange,
      lastNameOnChange,
      phoneNumberOnChange,
      emailOnChange,
      newPasswordOnChange,
      countryOnChange,
      cityOnChange,
      streetOnChange,
      nationalityOnChange,
      genderOnChange,
      dbOnChange,
      nationalIdOnChange,
      isError,
      errors,
    },
    false
  );

  function handleProfileSubmit(event) {
    event.preventDefault();
    console.log(errors);
    if (isError) return;
    let validation =
      emailValidator(emailValue) +
      nationalIdValidator(nationalIdValue) +
      phoneNumberValidator(phoneNumberValue) +
      birthDateValidator(dbValue) +
      genderValidator(genderValue) +
      passwordValidator(oldPasswordValue);
    if (newPasswordValue !== "")
      validation += passwordValidator(newPasswordValue);

    if (validation === "" && !isError && errors === "") {
      putStudent({
        national_id: nationalIdValue,
        first_name: firstNameValue,
        last_name: lastNameValue,
        phone_number: phoneNumberValue,
        city: cityValue,
        country: countryValue,
        street: streetValue,
        email: emailValue,
        registration_date: new Date().toISOString().slice(0, 10),
        gender: genderValue,
        nationality: nationalityValue,
        birth_date: dbValue,
        newPassword: newPasswordValue,
        oldPassword: oldPasswordValue,
      });
    } else {
      if (validation === "NO FIELD IS ALLOWED TO BE EMPTY")
        validation = "old password must be at least filled";
      setErrors(validation);
      setIsError(true);
    }
  }
  useEffect(() => {
    if (!result.isUninitialized && !result.isLoading) {
      if (result.error) {
        console.log(result);
        setErrors(result.error.data.error);
        setIsError(true);
      } else {
        console.log(11111111);
        setIsError(false);
        handleAction();
        window.location.reload();
        dispatch(changeIsLoggedIn(false));
      }
    }
  }, [result]);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-red-100 text-red-500 px-4 py-2 my-4 w-full max-w-lg">
        <p className="text-sm">
          <strong>NOTE:</strong> You must enter the old password in order to
          change any field. If you enter the new password and the old one is
          correct, then the password will be changed to the new one.
        </p>
      </div>
      <div>
        {isSuccess && (
          <PopUp
            message="Operation successful!"
            onClose={closePopup}
            path="/login"
          />
        )}
      </div>
      <Form config={config} onChange={handleProfileSubmit} />
    </div>
  );
}

export default Profile;
