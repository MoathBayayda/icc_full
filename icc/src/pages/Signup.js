import { useState, useEffect } from "react";
import useConfSignupForm from "../hooks/useConfSignupForm";
import Form from "../components/Form";
import emailValidator from "../hooks/validators/emailValidator";
import passwordValidator from "../hooks/validators/passwordValidator";
import checkConfirmPassword from "../hooks/validators/checkConfirmPassword";
import phoneNumberValidator from "../hooks/validators/phoneNumberValidator";
import genderValidator from "../hooks/validators/genderValidator";
import birthDateValidator from "../hooks/validators/birthDateValidator";
import nationalIdValidator from "../hooks/validators/nationalIdValidator";
import { useDispatch } from "react-redux";
import {
  usePostSignupMutation,
  changeIsLoggedIn,
  changePath,
} from "../Store/Store";
import PopUp from "../components/PopUp";
function Signup(states) {
  const [emailValue, setEmailValue] = useState("");
  const [nationalIdValue, setNationalIdValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [streetValue, setStreetValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [nationalityValue, setNationalityValue] = useState("");
  const [dbValue, setBbValue] = useState("");
  const [isError, setIsError] = useState(true);
  const [errors, setErrors] = useState("NO  FIELD IS ALLOWED TO BE EMPTY");
  const dispatch = useDispatch();
  const [postSignup, result] = usePostSignupMutation();

  const [isSuccess, setIsSuccess] = useState(false);

  const handleAction = () => {
    // Perform successful operation
    setIsSuccess(true);
  };

  const closePopup = () => {
    window.location.reload();
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
  function passwordOnChange(event) {
    setPasswordValue(event.target.value);
    const validation = passwordValidator(event.target.value);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
    }
  }
  function confirmPasswordOnChange(event) {
    setConfirmPasswordValue(event.target.value);
    const validation = checkConfirmPassword(event.target.value, passwordValue);
    if (validation !== "") {
      setIsError(true);
      setErrors(validation);
    } else {
      setIsError(false);
      setErrors(validation);
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
    setBbValue(event.target.value);
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
      passwordValue,
      confirmPasswordValue,
      firstNameValue,
      lastNameValue,
      phoneNumberValue,
      countryValue,
      cityValue,
      streetValue,
      genderValue,
      nationalityValue,
      dbValue,
      confirmPasswordOnChange,
      firstNameOnChange,
      lastNameOnChange,
      phoneNumberOnChange,
      emailOnChange,
      passwordOnChange,
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
    true
  );
  function handleSignupSubmit(event) {
    event.preventDefault();
    const validation =
      emailValidator(emailValue) +
      passwordValidator(passwordValue) +
      nationalIdValidator(nationalIdValue) +
      phoneNumberValidator(phoneNumberValue) +
      birthDateValidator(dbValue) +
      checkConfirmPassword(passwordValue, confirmPasswordValue) +
      genderValidator(genderValue);
    if (validation === "" && !isError && errors === "") {
      postSignup({
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
        password: passwordValue,
      });
      handleAction();
    } else {
      setErrors(validation);
      setIsError(true);
    }
  }
  useEffect(() => {
    if (!result.isUninitialized && !result.isLoading) {
      if (result.error) {
        dispatch(changeIsLoggedIn(false));
        setErrors(result.error.data.error);
        setIsError(true);
      } else {
        setIsError(false);
        dispatch(changeIsLoggedIn(true));
      }
    }
  }, [result]);
  return (
    <div>
      <div>
        {isSuccess && (
          <PopUp
            message="Signedup successfully"
            onClose={closePopup}
            path="/login"
          />
        )}
      </div>
      <Form config={config} onChange={handleSignupSubmit}></Form>
    </div>
  );
}
export default Signup;
