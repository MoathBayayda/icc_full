import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePath,
  usePostAuthMutation,
  changeIsLoggedIn,
  fetchAdmin,
  useGetCoursesQuery,
  fetchCourses,
  useGetAllStudentsQuery,
  fetchStudents,
} from "./Store/Store";
import useNavigate from "./hooks/useNavigate";
import NavigationBar from "./components/NavigationBar";
function App() {
  const { path } = useSelector((state) => state.config);
  const getAllStudentsResult = useGetAllStudentsQuery();
  const [postAuth, result] = usePostAuthMutation();
  const getCoursesResponse = useGetCoursesQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    postAuth();
    window.history.pushState({}, "", "/news");
    const handlePopState = () => {
      dispatch(changePath(window.location.pathname));
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (!getCoursesResponse.isUninitialized && !getCoursesResponse.isLoading) {
      if (getCoursesResponse.error) {
      } else {
        dispatch(fetchCourses(getCoursesResponse.data.data));
      }
    }
  }, [getCoursesResponse]);

  useEffect(() => {
    if (
      !getAllStudentsResult.isUninitialized &&
      !getAllStudentsResult.isLoading
    ) {
      if (getCoursesResponse.error) {
      } else {
        dispatch(fetchStudents(getAllStudentsResult.data));
      }
    }
  }, [getAllStudentsResult]);

  useEffect(() => {
    postAuth();
    console.log(path);
    window.history.pushState({}, "", path);
  }, [path]);

  useEffect(() => {
    if (!result.isUninitialized && !result.isLoading) {
      if (result.error) {
        dispatch(changeIsLoggedIn(false));
      } else {
        dispatch(changeIsLoggedIn(true));
        dispatch(fetchAdmin(result.data.data));
        console.log(path, 2222);
        if (path === "/login") dispatch(changePath("/news"));
      }
    }
  }, [result]);

  return (
    <div>
      <NavigationBar></NavigationBar>
      {useNavigate()}
    </div>
  );
}

export default App;
