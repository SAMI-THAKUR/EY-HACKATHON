import { useEffect } from "react";
import { getUserHandler, validateToken } from "../apicalls/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { useLocation } from "react-router-dom";
import { setNav } from "../redux/navSlice";

// eslint-disable-next-line react/prop-types
const ProtectedPage = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const handleGetUser = async () => {
    try {
      const res = await getUserHandler();
      if (res.success) {
        dispatch(setUser(res.user));
      }
    } catch (error) {
      console.error("Error getting user:", error);
    }
  };

  const handelValidate = async () => {
    try {
      const response = await validateToken();
      if (response.success && !user) {
        dispatch(setUser(response.user));
        navigate(location.pathname);
        dispatch(setNav(location.pathname));
      }
      if (!response.success) {
        window.location.href = "/auth/login";
      }
    } catch (error) {
      console.error("Error validating token:", error);
    }
  };

  useEffect(() => {
    handleGetUser();
    handelValidate();
  }, []);
  return <div>{children}</div>;
};

export default ProtectedPage;
