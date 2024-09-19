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
      labelText: "Old password",
      placeHolder: "your current password",
      value: states.oldPasswordValue,
      onChange: states.oldPasswordOnChange,
      type: "password",
    },
    {
      labelText: "New password",
      placeHolder: "your new password password",
      value: states.newPasswordValue,
      onChange: states.newPasswordOnChange,
      type: "password",
    },
  ];
  configs["isError"] = states.isError;
  configs["errors"] = states.errors;
  return configs;
}
export default useConfLoginForm;
