function nationalIdValidator(nationlId) {
  if (nationlId === "") return "NO FIELD IS ALLOWED TO BE EMPTY";
  if (nationlId.toString().length !== 14) {
    return "Invalid national id";
  }
  return "";
}
export default nationalIdValidator;
