import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changePath,
  usePostAuthMutation,
  changeIsLoggedIn,
  fetchStudent,
} from "./Store/Store";
import useNavigate from "./hooks/useNavigate";
import NavigationBar from "./components/NavigationBar";
function App() {
  const { path } = useSelector((state) => state.config);

  const [postAuth, result] = usePostAuthMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    postAuth();
    window.history.pushState({}, "", "/home");
    const handlePopState = () => {
      dispatch(changePath(window.location.pathname));
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    postAuth();
    window.history.pushState({}, "", path);
  }, [path]);

  useEffect(() => {
    if (!result.isUninitialized && !result.isLoading) {
      if (result.error) {
        dispatch(changeIsLoggedIn(false));
      } else {
        dispatch(changeIsLoggedIn(true));
        dispatch(fetchStudent(result.data.data));
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
