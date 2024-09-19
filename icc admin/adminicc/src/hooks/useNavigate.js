import { useDispatch, useSelector } from "react-redux";
import Login from "../pages/Login";
import Courses from "../pages/Courses";
import Profile from "../pages/Profile";
import Course from "../pages/Course";
import News from "../pages/News";
import Logout from "../pages/Logout";
import SingleNews from "../pages/SingleNews";
import { changePath } from "../Store/Store";
import CreateNews from "../pages/CreateNews";
import CreateCourse from "../pages/CreateCourse";
import Students from "../pages/Students";
import Student from "../pages/Student";
import CreateStudent from "../pages/CreateStudent";
function useNavigate() {
  const { path, isLoggedIn } = useSelector((state) => {
    return state.config;
  });
  const dispatch = useDispatch();
  console.log(isLoggedIn, path);
  switch (path) {
    case "/profile":
      if (isLoggedIn) {
        return <Profile></Profile>;
      } else {
        window.history.pushState({}, "", "/login");
        dispatch(changePath("/login"));
        return <Login></Login>;
      }
    case "/courses":
      if (isLoggedIn) {
        return <Courses></Courses>;
      } else {
        window.history.pushState({}, "", "/login");
        dispatch(changePath("/login"));
        return <Login></Login>;
      }
    case "/courses/create":
      if (isLoggedIn) {
        return <CreateCourse></CreateCourse>;
      } else {
        window.history.pushState({}, "", "/login");
        dispatch(changePath("/login"));
        return <Login></Login>;
      }
    case "/courses/id":
      if (isLoggedIn) {
        return <Course></Course>;
      } else {
        window.history.pushState({}, "", "/login");
        dispatch(changePath("/login"));
        return <Login></Login>;
      }
    case "/news":
      if (isLoggedIn) {
        return <News></News>;
      } else {
        window.history.pushState({}, "", "/login");
        dispatch(changePath("/login"));
        return <Login></Login>;
      }
    case "/news/id":
      if (isLoggedIn) {
        return <SingleNews></SingleNews>;
      } else {
        window.history.pushState({}, "", "/login");
        dispatch(changePath("/login"));
        return <Login></Login>;
      }
    case "/logout":
      if (isLoggedIn) return <Logout></Logout>;
      else {
        window.history.pushState({}, "", "/login");
        dispatch(changePath("/login"));
        return <Login></Login>;
      }
    case "/students":
      if (isLoggedIn) return <Students courses={false}></Students>;
      else {
        window.history.pushState({}, "", "/login");
        dispatch(changePath("/login"));
        return <Login></Login>;
      }
    case "/students/id":
      if (isLoggedIn) return <Student></Student>;
      else {
        window.history.pushState({}, "", "/login");
        dispatch(changePath("/login"));
        return <Login></Login>;
      }
    case "/students/create":
      if (isLoggedIn) return <CreateStudent></CreateStudent>;
      else {
        window.history.pushState({}, "", "/login");
        dispatch(changePath("/login"));
        return <Login></Login>;
      }
    case "/courses/id/students":
      if (isLoggedIn) return <Students courses={true}></Students>;
      else {
        window.history.pushState({}, "", "/login");
        dispatch(changePath("/login"));
        return <Login></Login>;
      }
    case "/login": {
      return <Login></Login>;
    }
    case "/news/create": {
      if (isLoggedIn) {
        return <CreateNews></CreateNews>;
      } else {
        window.history.pushState({}, "", "/login");
        dispatch(changePath("/login"));
        return <Login></Login>;
      }
    }
  }
}

export default useNavigate;
