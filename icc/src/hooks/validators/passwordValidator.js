function passwordValidator(password) {
  const passwordFirstCheck = /[0-9]{1,}/;
  const passwordSecondCheck = /[a-z]{1,}/;
  const passwordThirdCheck = /[A-Z]{1,}/;
  const passwordFourthCheck = /[~!@#$%^&*()_+\-=\\|{}\[\]?><;,.\"']+/;
  // Perform string check here
  if (password === "") return "NO FIELD IS ALLOWED TO BE EMPTY";
  if (!(
      password.match(passwordFirstCheck) &&
      password.match(passwordSecondCheck) &&
      password.match(passwordThirdCheck) &&
      password.match(passwordFourthCheck) &&
      password.length >= 8
    )) {
    return ( "password is invalid it must includes at least 1 " +
            "numbers ,1 small letters , 1 capital letters and a special character" );
  } else return "";
}
export default passwordValidator;
