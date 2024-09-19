function genderValidator(gender) {
  if (gender === "") return "NO FIELD IS ALLOWED TO BE EMPTY";
  if (!(gender === "male" || gender === "female")) {
    return "Invalid gender , you have only 2 options , male of female";
  }
  return "";
}
export default genderValidator;
