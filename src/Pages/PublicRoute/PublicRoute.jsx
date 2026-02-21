import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const storedToken = sessionStorage.getItem("event_token");
  const isToken = storedToken ? JSON.parse(storedToken).token : null;
  return isToken ? <Navigate to="/dashboard" /> : children;
};
export default PublicRoute