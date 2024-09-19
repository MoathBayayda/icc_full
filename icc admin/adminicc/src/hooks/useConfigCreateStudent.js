function useConfigCreateStudent(states, profileORsignup) {
  const configs = [
    {
      labelText: "Email",
      placeHolder: "email@email.com",
      value: states.emailValue,
      onChange: states.emailOnChange,
      type: "email",
    },
    {
      labelText: profileORsignup ? "Password" : "Old password",
      placeHolder: profileORsignup ? "Password" : "Old password",
      value: profileORsignup ? states.passwordValue : states.oldPasswordValue,
      onChange: profileORsignup
        ? states.passwordOnChange
        : states.oldPasswordOnChange,
      type: "password",
    },
    {
      labelText: profileORsignup ? "Confirem password" : "New  password",
      placeHolder: profileORsignup ? "Confirm password" : "New password",
      value: profileORsignup
        ? states.confirmPasswordValue
        : states.newPasswordValue,
      onChange: profileORsignup
        ? states.confirmPasswordOnChange
        : states.newPasswordOnChange,
      type: "password",
    },
    {
      labelText: "Frist Name",
      placeHolder: "first name",
      value: states.firstNameValue,
      onChange: states.firstNameOnChange,
      type: "text",
    },
    {
      labelText: "Last name",
      placeHolder: "Last name",
      value: states.lastNameValue,
      onChange: states.lastNameOnChange,
      type: "text",
    },
    {
      labelText: "Phone number",
      placeHolder: "phone number",
      value: states.phoneNumberValue,
      onChange: states.phoneNumberOnChange,
      type: "text",
    },
    {
      labelText: "Home counrty",
      placeHolder: "Home country",
      value: states.countryValue,
      onChange: states.countryOnChange,
      type: "text",
    },
    {
      labelText: "city",
      placeHolder: "city",
      value: states.cityValue,
      onChange: states.cityOnChange,
    },
    {
      labelText: "street",
      placeHolder: "street",
      value: states.streetValue,
      onChange: states.streetOnChange,
      type: "text",
    },
    {
      labelText: "gender",
      placeHolder: "gender",
      value: states.genderValue,
      onChange: states.genderOnChange,
      type: "text",
    },
    {
      labelText: "nationality",
      placeHolder: "nationality",
      value: states.nationalityValue,
      onChange: states.nationalityOnChange,
      type: "text",
    },
    {
      labelText: "date of birth",
      placeHolder: "date of birth",
      value: states.dbValue,
      onChange: states.dbOnChange,
      type: "text",
    },
    {
      labelText: "national id",
      placeHolder: "national id",
      value: states.nationalIdValue,
      onChange: states.nationalIdOnChange,
      type: "text",
    },
    //todo add national_id and registeration date
  ];
  configs["isError"] = states.isError;
  configs["errors"] = states.errors;
  return configs;
}
export default useConfigCreateStudent;
