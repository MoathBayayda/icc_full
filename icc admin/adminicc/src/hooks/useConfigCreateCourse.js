function useConfigCreateCourse(states) {
  const configs = [
    {
      labelText: "Hall name",
      placeHolder: "Hall name",
      value: states.hallNameValue,
      onChange: states.hallNameOnChange,
      type: "text",
    },
    {
      labelText: "Instructor",
      placeHolder: "instructor",
      value: states.instructorValue,
      onChange: states.instructorOnChange,
      type: "text",
    },
    {
      labelText: "Course name",
      placeHolder: "Course name",
      value: states.courseNameValue,
      onChange: states.courseNameOnChange,
      type: "text",
    },
    // {
    //   labelText: "Number of students",
    //   placeHolder: "number of students currently registered",
    //   value: states.numStudentsValue,
    //   onChange: states.numStudentsOnChange,
    //   type: "text",
    // },
    {
      labelText: "Pass mark",
      placeHolder: "pass mark",
      value: states.passMarkValue,
      onChange: states.passMarkOnChange,
      type: "number",
    },
    {
      labelText: "Starting time",
      placeHolder: "starting time",
      value: states.startingTimeValue,
      onChange: states.startingTimeOnChange,
      type: "number",
    },
    {
      labelText: "Ending time",
      placeHolder: "ending time",
      value: states.endingTimeValue,
      onChange: states.endingTimeOnChange,
      type: "number",
    },
    {
      labelText: "Days",
      placeHolder: "days",
      value: states.daysValue,
      onChange: states.daysOnChange,
      type: "text",
    },
    {
      labelText: "Maximum students",
      placeHolder: "maximum number of students allowed to register",
      value: states.maxStudentsValue,
      onChange: states.maxStudentsOnChange,
      type: "number",
    },
    {
      labelText: "Availability",
      placeHolder: "availability",
      value: states.availabilityValue,
      onChange: states.availabilityOnChange,
      type: "checkbox",
    },
    {
      labelText: "Price",
      placeHolder: "price",
      value: states.priceValue,
      onChange: states.priceOnChange,
      type: "number",
    },
    {
      labelText: "Duration hours",
      placeHolder: "duration hours",
      value: states.durationHoursValue,
      onChange: states.durationHoursOnChange,
      type: "number",
    },
    // {
    //   labelText: "registration_date",
    //   placeHolder: "registration_date",
    //   value: states.nDateValue,
    //   onChange: states.nDateOnChange,
    //   type: "text",
    // },
    {
      labelText: "Description",
      placeHolder: "description",
      type: "text",
      component: (
        <textarea
          className={
            "py-1 text-center placeholder-gray-400 text-green-800 font-bold focus:outline-none focus:ring-2 shadow-sm " +
            "rounded-md focus:ring-gray-500 focus:border-transparent"
          }
          onChange={states.descriptionOnChange}
          value={states.descriptionValue}
        ></textarea>
      ),
    },
  ];
  configs["isError"] = states.isError;
  configs["errors"] = states.errors;
  return configs;
}
export default useConfigCreateCourse;
