function phoneNumberValidator(phoneNumber) {
  const phoneNumberRegex = /009627[7-9]{1,}[0-9]{7,}/;
  // Perform string check here
  if (phoneNumber === "") return "NO FIELD IS ALLOWED TO BE EMPTY";
  if (!(phoneNumber.match(phoneNumberRegex) && phoneNumber.length === 14)) {
    //,the number should starts with 009627 "+
    //"then followed by 7 or 8 or 9 , followed by 7 digits
    return "Invalid phone number format , it should be a jordan mobile number which starts with 009627";
  } else return "";
}
export default phoneNumberValidator;
