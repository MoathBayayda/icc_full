function useConfigCreateNews(states) {
  const configs = [
    {
      labelText: "Title",
      placeHolder: "title",
      value: states.titleValue,
      onChange: states.titleOnChange,
      type: "text",
      component: (
        <textarea
          className="h-32 py-1 bg-gray-800 text-center border-md text-green-200 font-bold focus:outline-none
          focus:ring-2  border-2 border-green-200 shadow-sm rounded-md focus:ring-gray-500 focus:border-transparent focus:ring-red-500"
          onChange={states.titleOnChange}
          value={states.titleValue}
        ></textarea>
      ),
    },
    {
      labelText: "Description",
      placeHolder: "description",
      value: states.descriptionValue,
      onChange: states.descriptionOnChange,
      type: "text",
      component: (
        <textarea
          className="h-32 py-1 bg-gray-800 text-center border-md text-green-200 font-bold focus:outline-none
        focus:ring-2  border-2 border-green-200 shadow-sm rounded-md focus:ring-gray-500 focus:border-transparent focus:ring-red-500"
          onChange={states.descriptionOnChange}
          value={states.descriptionValue}
        ></textarea>
      ),
    },
    {
      labelText: "Content",
      placeHolder: "content",
      value: states.contentValue,
      onChange: states.contentOnChange,
      type: "text",
      component: (
        <textarea
          className="h-32 py-1 bg-gray-800 text-center border-md text-green-200 font-bold focus:outline-none
        focus:ring-2  border-2 border-green-200 shadow-sm rounded-md focus:ring-gray-500 focus:border-transparent focus:ring-red-500"
          onChange={states.contentOnChange}
          value={states.contentValue}
        ></textarea>
      ),
    },
    {
      labelText: "News Date",
      placeHolder: "news date",
      value: states.nDateValue,
      onChange: states.nDateOnChange,
      type: "text",
      component: (
        <textarea
          className="h-32 py-1 bg-gray-800 text-center border-md text-green-200 font-bold focus:outline-none
        focus:ring-2  border-2 border-green-200 shadow-sm rounded-md focus:ring-gray-500 focus:border-transparent focus:ring-red-500"
          onChange={states.nDateOnChange}
          value={states.nDateValue}
        ></textarea>
      ),
    },
  ];
  configs["isError"] = states.isError;
  configs["errors"] = states.errors;
  return configs;
}
export default useConfigCreateNews;
