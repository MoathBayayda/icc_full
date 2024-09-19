function checkConfirmPassword(confirmPassword, password) {
  if (confirmPassword === "" || password === "")
    return "NO FIELD IS ALLOWED TO BE EMPTY";
  if (confirmPassword === password) return "";
  else return "ERROR PASSWORD AND CONFIRM PASSWORD DOESN'T MATCH";
}
export default checkConfirmPassword;
