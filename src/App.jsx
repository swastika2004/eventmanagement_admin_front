import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Sidebar from "./Pages/Sidebar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Category from "./Pages/CategoryManage/Category";
import ManageEvent from "./Pages/ManageEvent/ManageEvent";
import Addcategory from "./Pages/CategoryManage/Addcategory";
import PublicRoute from "./Pages/PublicRoute/PublicRoute";
import PrivateRoute from "./Pages/PrivateRoute/PrivateRoute";
import EditCategory from "./Pages/CategoryManage/EditCategory";
import AddEvent from "./Pages/ManageEvent/AddEvent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/" element={<PrivateRoute><Sidebar /></PrivateRoute>}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="event" element={<ManageEvent />} />
          <Route path="add-category" element={<Addcategory />} />
             <Route path="edit-category" element={<EditCategory />} />
             <Route path="add-event" element={<AddEvent/>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;


