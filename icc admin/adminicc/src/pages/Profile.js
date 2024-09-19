import { useState, useEffect } from "react";
import useConfigProfile from "../hooks/useConfigProfile";
import Form from "../components/Form";
import emailValidator from "../hooks/validators/emailValidator";
import passwordValidator from "../hooks/validators/passwordValidator";
import { usePutAdminMutation } from "../Store/Store";
import { useDispatch, useSelector } from "react-redux";
import PopUp from "../components/PopUp";
function Profile() {
  const admin = useSelector((state) => state.admin);
  const [emailValue, setEmailValue] = useState(admin.admin_email);
  const [oldPasswordValue, setOldPasswordValue] = useState("");
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [isError, setIsError] = useState(true);
  const [errors, setErrors] = useState("NO FIELD IS ALLOWED TO BE EMPTY");
  const [putAdmin, putAdminResult] = usePutAdminMutation();

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
      setErrors(validation);
    }
  }
  const config = useConfigProfile({
    emailValue,
    oldPasswordValue,
    newPasswordValue,
    isError,
    errors,
    emailOnChange,
    oldPasswordOnChange,
    newPasswordOnChange,
  });
  function handleLoginSubmit(event) {
    event.preventDefault();
    if (isError) return;
    const validation =
      emailValidator(emailValue) ||
      passwordValidator(oldPasswordValue) ||
      (newPasswordValue !== "" && passwordValidator(newPasswordValue));
    console.log(isError, errors);
    if ((!validation || validation === "") && !isError && errors === "") {
      console.log(111, validation);
      if (newPasswordValue === "")
        putAdmin({
          admin_id: admin.admin_id,
          admin_email: emailValue,
          oldPassword: oldPasswordValue,
        });
      else
        putAdmin({
          admin_id: admin.admin_id,
          admin_email: emailValue,
          oldPassword: oldPasswordValue,
          newPassword: newPasswordValue,
        });
    } else {
      setErrors(validation);
      setIsError(true);
    }
  }
  useEffect(() => {
    console.log(putAdminResult);
    if (!putAdminResult.isUninitialized && !putAdminResult.isLoading) {
      if (putAdminResult.error) {
        setIsSuccess(false);
        setErrors(putAdminResult.error.data.error);
        setIsError(true);
      } else {
        setIsError(false);
        handleAction();
      }
    }
  }, [putAdminResult]);
  return (
    <div>
      <div>
        {isSuccess && (
          <PopUp
            message="Admin is updated successfully"
            onClose={closePopup}
            path="/news"
            reload={true}
          />
        )}
      </div>
      <Form
        config={config}
        onChange={handleLoginSubmit}
        className="w-2/5"
      ></Form>
    </div>
  );
}
export default Profile;
