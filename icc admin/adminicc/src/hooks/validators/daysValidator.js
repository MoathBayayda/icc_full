function daysValidator(value) {
  const daysRegex =
    /^(?:sunday|monday|tuesday|wednesday|thursday|friday|saturday)(?:,(?:sunday|monday|tuesday|wednesday|thursday|friday|saturday))*$/;
  // Perform string check here
  if (!value.match(daysRegex)) {
    //,the number should starts with 009627 "+
    //"then followed by 7 or 8 or 9 , followed by 7 digits
    return (
      "Invalid days format , days must match the following :sunday,monday,tuesday,.... ,the format is :dayname,dayname," +
      "all days must be written correctly and Capitalization not allowed"
    );
  }
  return "";
}

export default daysValidator;
