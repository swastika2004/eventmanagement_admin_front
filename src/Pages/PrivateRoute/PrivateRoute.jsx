import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const storedToken = sessionStorage.getItem("event_token");
  const isToken = storedToken ? JSON.parse(storedToken).token : null;
  return isToken ? children : <Navigate to="/" />;
};
export default PrivateRoute