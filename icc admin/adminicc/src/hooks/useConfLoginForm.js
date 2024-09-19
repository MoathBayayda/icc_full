function useConfLoginForm(states) {
  const configs = [
    {
      labelText: "Email",
      placeHolder: "email@email.com",
      value: states.emailValue,
      onChange: states.emailOnChange,
      type: "email",
    },
    {
      labelText: "Password",
      placeHolder: "password",
      value: states.passwordValue,
      onChange: states.passwordOnChange,
      type: "password",
    },
  ];
  configs["isError"] = states.isError;
  configs["errors"] = states.errors;
  return configs;
}
export default useConfLoginForm;
