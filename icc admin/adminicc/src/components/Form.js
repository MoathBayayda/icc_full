import { VscSend } from "react-icons/vsc";
function Form({ config, onChange, children, className }) {
  const formGroups = config.map((element, index) => {
    return (
      <div
        key={index}
        className={`grid grid-cols-2 gap-4 mb-4 mb-2 border-b border-gray-500 border-2 rounded-md shadow-sm p-3`}
      >
        <label className="text-green-200">
          {config.isError ? <h className="text-red-400">*</h> : ""}{" "}
          {element.labelText}
        </label>
        {element.component || (
          <input
            className={
              "py-1 text-center placeholder-gray-400 text-green-800 font-bold focus:outline-none focus:ring-2 shadow-sm rounded-md " +
              `focus:ring-gray-500 focus:border-transparent${
                config.isError ? " focus:ring-red-500" : " focus:ring-gray-500"
              }`
            }
            placeholder={element.placeHolder}
            value={element.value}
            onChange={element.onChange}
            type={element.type}
          />
        )}
      </div>
    );
  });
  console.log(formGroups);
  return (
    <form
      className={
        "p-6 rounded-lg shadow-md mx-auto my-14 mb-2 border-b " +
        "border-gray-700 border-2 rounded-md bg-gray-800 shadow-lg rounded-lg p-6 mb-4 " +
        className
      }
    >
      {formGroups}
      <div>{children || ""}</div>
      <div className={`text-red-500 ${config.isError ? "block" : "hidden"}`}>
        {config.errors}
      </div>

      <button
        className="bg-gray-700 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-800 hover:text-green-200"
        onClick={onChange}
      >
        <div className="flex items-center">
          <div className="mr-2"> Submit</div>
          <div>
            <VscSend />
          </div>
        </div>
      </button>
    </form>
  );
}

export default Form;
