import { useSelector } from "react-redux";
import { ImNewspaper } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { ImBooks } from "react-icons/im";
import { RiLoginCircleFill } from "react-icons/ri";
import { PiStudentBold } from "react-icons/pi";
function useNavigationBarConfig() {
  const { path, isLoggedIn } = useSelector((state) => {
    return state.config;
  });
  const admin = useSelector((state) => state.admin);
  console.log(isLoggedIn);
  if (isLoggedIn) {
    return [
      {
        text: "News",
        icon: <ImNewspaper />,
        path: "/news",
        className:
          path === "/news" || path === "/news/id"
            ? "-gray-700 text-white hover:bg-gray-800 hover:text-green-200 flex justify-start "
            : "-white",
      },
      {
        text: "Courses",
        icon: <ImBooks />,
        path: "/courses",
        className:
          path === "/courses" || path === "/courses/id"
            ? "-gray-700 text-white hover:bg-gray-800 hover:text-green-200 flex justify-start "
            : "-white",
      },
      {
        text: "Students",
        icon: <PiStudentBold />,
        path: "/students",
        className:
          path === "/students" || path === "/students/id"
            ? "-gray-700 text-white hover:bg-gray-800 hover:text-green-200 flex justify-start "
            : "-white",
      },
      {
        text: admin.admin_email,
        icon: <CgProfile />,
        path: "/profile",
        className:
          path === "/profile"
            ? "-gray-700 text-white hover:bg-gray-800 hover:text-green-200 flex justify-start "
            : "-white",
      },
      {
        text: "logout",
        icon: <RiLogoutCircleRFill />,
        path: "/logout",
        className:
          path === "/logout"
            ? "-gray-700 text-white hover:bg-gray-800 hover:text-green-200 flex justify-start "
            : "-white",
      },
    ];
  } else
    return [
      {
        text: "Login",
        icon: <RiLoginCircleFill />,
        path: "/login",
        className:
          path === "/login"
            ? "-gray-700 text-white hover:bg-gray-800 hover:text-green-200 flex justify-end"
            : "-white",
      },
    ];
}
export default useNavigationBarConfig;
