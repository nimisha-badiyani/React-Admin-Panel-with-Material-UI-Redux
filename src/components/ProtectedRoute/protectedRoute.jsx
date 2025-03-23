/* eslint-disable */

import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/thunks/authThunk";

const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuthenticated, tokenExpirationTime } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const currentTime = Date.now();

  if (isAuthenticated && tokenExpirationTime) {
    if (currentTime > tokenExpirationTime) {
      dispatch(logoutUser());
      return <Navigate to="/auth/login" />;
    }
  }

  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
