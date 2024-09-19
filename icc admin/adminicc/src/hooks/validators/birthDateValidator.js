function birthDateValidator(bd) {
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  // Perform string check here
  if (bd === "") return "NO FIELD IS ALLOWED TO BE EMPTY";
  if (!bd.match(dateRegex)) {
    return "Invalid date format , must match the following : YYYY-MM-DD , ex: 2001-09-01";
  }
  return "";
}
export default birthDateValidator;
