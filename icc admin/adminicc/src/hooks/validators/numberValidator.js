function numberValidator(value, max, min, label) {

  if (min <= value && value <= max) return "";
  else if (value === undefined) return ` no  field is allowed to be empty.`;
  else
    return ` value of ${label} is not allowed, maximum value allowed  is ${max} and minimum value allowed is ${min} .`;
}
export default numberValidator;
