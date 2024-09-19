import { useDispatch } from "react-redux";
import useNavigationBarConfig from "../hooks/useNavigationBarConfig";
import { changePath } from "../Store/Store";
import logo from "../icc_logo.png";
function NavigationBar() {
  const dispatch = useDispatch();

  function handleClick(event, path) {
    dispatch(changePath(path));
  }

  const elements = useNavigationBarConfig();

  const renderedElementsLeft = elements
    .filter(
      (banElement) =>
        banElement.path !== "/logout" &&
        banElement.path !== "/profile" &&
        banElement.path !== "/login" &&
        banElement.path !== "/signup"
    )
    .map((banElement) => (
      <div
        key={banElement.path}
        onClick={(event) => handleClick(event, banElement.path)}
        className={
          "cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 shadow-x1 rounded-md mt-4 px-4 py-2 my-2 mx-1 text-black bg" +
          banElement.className
        }
      >
        <div className="flex items-center">
          <div className="mr-2">{banElement.icon}</div>
          <div>{banElement.text}</div>
        </div>
      </div>
    ));

  const renderedElementsRight = elements
    .filter(
      (banElement) =>
        banElement.path === "/logout" ||
        banElement.path === "/profile" ||
        banElement.path === "/login" ||
        banElement.path === "/signup"
    )
    .map((banElement) => (
      <div
        key={banElement.path}
        onClick={(event) => handleClick(event, banElement.path)}
        className={
          "cursor-pointer p-2 hover:bg-gray-800 hover:text-green-200 shadow-x1 rounded-md mt-4 px-4 py-2 my-2 mx-1 text-black bg" +
          banElement.className
        }
      >
        <div className="flex items-center">
          <div className="mr-2">{banElement.icon}</div>
          <div>{banElement.text}</div>
        </div>
      </div>
    ));

  return (
    <div className="flex items-start space-x-4 bg-gray-800">
      <div>
        <img
          src={logo}
          alt="Logo"
          className="w-12 h-12 mx-4 mt-2 object-contain cursor-pointer"
          onClick={() => handleClick(null, "/home")} // Replace "/home" with the desired path when clicking the logo
        />
      </div>
      <div className="flex-grow flex justify-start">{renderedElementsLeft}</div>
      <div className="flex justify-end">{renderedElementsRight}</div>
    </div>
  );
}

export default NavigationBar;
