import { useState, useEffect } from "react";
import useConfLoginForm from "../hooks/useConfLoginForm";
import Form from "../components/Form";
import emailValidator from "../hooks/validators/emailValidator";
import passwordValidator from "../hooks/validators/passwordValidator";
import {
  usePostLoginMutation,
  changeIsLoggedIn,
  fetchStudent,
  changePath,
} from "../Store/Store";
import { useDispatch } from "react-redux";
import PopUp from "../components/PopUp";
function Login() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isError, setIsError] = useState(true);
  const [errors, setErrors] = useState("NO FIELD IS ALLOWED TO BE EMPTY");
  const [postLogin, result] = usePostLoginMutation();
  const dispatch = useDispatch();

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
  const config = useConfLoginForm({
    emailValue,
    passwordValue,
    isError,
    errors,
    emailOnChange,
    passwordOnChange,
  });
  function handleLoginSubmit(event) {
    event.preventDefault();
    if (isError) return;
    const validation =
      emailValidator(emailValue) + "" + passwordValidator(passwordValue);
    if (validation === "" && !isError && errors === "") {
      postLogin({ email: emailValue, password: passwordValue });
    } else {
      setErrors(validation);
      setIsError(true);
    }
  }
  useEffect(() => {
    if (!result.isUninitialized && !result.isLoading) {
      if (result.error) {
        setIsSuccess(false);
        dispatch(changeIsLoggedIn(false));
        console.log(result.data);
        setErrors(result.error.data.error);
        console.log(result);
        setIsError(true);
      } else {
        setIsError(false);
        handleAction();
        dispatch(changeIsLoggedIn(true));
        dispatch(fetchStudent(result.data));
      }
    }
  }, [result]);
  return (
    <div>
      <div>
        {isSuccess && (
          <PopUp
            message="logged in successfully"
            onClose={closePopup}
            path="/home"
          />
        )}
      </div>
      <Form config={config} onChange={handleLoginSubmit}></Form>
    </div>
  );
}
export default Login;
