function emailValidator(email) {
  const emailRegex = /[a-zA-Z0-9_]+[@][a-zA-Z0-9_]+[.][a-zA-Z0-9_]+/;
  if (email === "") return "NO FIELD IS ALLOWED TO BE EMPTY";
  if (!email.match(emailRegex)) return "ERROR PLEASE ENTER A VALID EMAIL";
  else return "";
}
export default emailValidator;
