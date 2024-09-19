function notEmptyValidator(value) {
  if (value === "") return "NO FIELD IS ALLOWED TO BE EMPTY";
  else return "";
}
export default notEmptyValidator;
