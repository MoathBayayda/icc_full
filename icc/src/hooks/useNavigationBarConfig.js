import { useSelector } from "react-redux";
import { TiHome } from "react-icons/ti";
import { GiBookshelf } from "react-icons/gi";
import { PiCertificateFill } from "react-icons/pi";
import { MdBookmarkAdded } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { GiArchiveRegister } from "react-icons/gi";
import { RiLoginCircleFill } from "react-icons/ri";
function useNavigationBarConfig() {
  const { path, isLoggedIn } = useSelector((state) => {
    return state.config;
  });
  const student = useSelector((state) => state.student);
  if (isLoggedIn) {
    return [
      {
        text: "Home",
        icon: <TiHome />,
        path: "/home",
        className:
          path === "/home" || path === "/home/id"
            ? "-gray-700 text-white hover:bg-gray-800 hover:text-green-200 flex justify-start "
            : "-white",
      },
      {
        text: "Availabe Courses",
        icon: <GiBookshelf />,
        path: "/courses",
        className:
          path === "/courses" || path === "/courses/id"
            ? "-gray-700 text-white hover:bg-gray-800 hover:text-green-200 flex justify-start "
            : "-white",
      },
      {
        text: "My Certificates",
        icon: <PiCertificateFill />,
        path: "/certificates",
        className:
          path === "/certificates"
            ? "-gray-700 text-white hover:bg-gray-800 hover:text-green-200 flex justify-start "
            : "-white",
      },
      {
        text: "My Registered Courses",
        icon: <MdBookmarkAdded />,
        path: "/regcourses",
        className:
          path === "/regcourses"
            ? "-gray-700 text-white hover:bg-gray-800 hover:text-green-200 flex justify-start "
            : "-white",
      },
      {
        text: student.email,
        icon: <CgProfile />,
        path: "/profile",
        className:
          path === "/profile" || path === "/profile/id"
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
        text: "Home",
        icon: <TiHome />,
        path: "/home",
        className:
          path === "/home" || path === "/home/id"
            ? "-gray-700 text-white hover:bg-gray-800 hover:text-green-200 flex justify-start"
            : "-white",
      },
      {
        text: "Login",
        icon: <RiLoginCircleFill />,
        path: "/login",
        className:
          path === "/login"
            ? "-gray-700 text-white hover:bg-gray-800 hover:text-green-200 flex justify-end"
            : "-white",
      },
      {
        text: "Signup",
        icon: <GiArchiveRegister />,
        path: "/signup",
        className:
          path === "/signup"
            ? "-gray-700 text-white hover:bg-gray-800 hover:text-green-200 flex justify-end"
            : "-white",
      },
    ];
}
export default useNavigationBarConfig;
