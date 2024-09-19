import { useSelector } from "react-redux";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Courses from "../pages/Courses";
import Profile from "../pages/Profile";
import Course from "../pages/Course";
import News from "../pages/News";
import RegisteredCourses from "../pages/RegisteredCourses";
import Certificates from "../pages/Certificates";
import Logout from "../pages/Logout";
function useNavigate() {
  const { path, isLoggedIn } = useSelector((state) => {
    return state.config;
  });
  switch (path) {
    case "/home":
      return <Home></Home>;
    case "/login":
      return <Login></Login>;
    case "/signup":
      return <Signup></Signup>;
    case "/profile":
      if (isLoggedIn) return <Profile></Profile>;
      else {
        window.history.pushState({}, "", "/login");
        return <Login></Login>;
      }
    case "/courses":
      if (isLoggedIn) return <Courses></Courses>;
      else {
        window.history.pushState({}, "", "/login");
        return <Login></Login>;
      }
    case "/certificates":
      if (isLoggedIn) return <Certificates></Certificates>;
      else {
        window.history.pushState({}, "", "/login");
        return <Login></Login>;
      }
    case "/courses/id":
      if (isLoggedIn) return <Course></Course>;
      else {
        window.history.pushState({}, "", "/login");
        return <Login></Login>;
      }
    case "/regcourses":
      if (isLoggedIn) return <RegisteredCourses></RegisteredCourses>;
      else {
        window.history.pushState({}, "", "/login");
        return <Login></Login>;
      }
    case "/logout":
      if (isLoggedIn) return <Logout></Logout>;
      else {
        window.history.pushState({}, "", "/login");
        return <Login></Login>;
      }
    case "/home/id":
      return <News></News>;
  }
}

export default useNavigate;
