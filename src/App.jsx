import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Sidebar from "./Pages/Sidebar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Category from "./Pages/CategoryManage/Category";
import ManageEvent from "./Pages/ManageEvent/ManageEvent";
import Addcategory from "./Pages/CategoryManage/Addcategory";


function App() {
  const storedToken = sessionStorage.getItem("event_token");
  const isToken = storedToken ? JSON.parse(storedToken).token : null;

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        {isToken && (
          <Route path="/" element={<Sidebar />}>
            {/* default after login */}
            <Route index element={<Navigate to="dashboard" />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="category" element={<Category />} />
            <Route path="event" element={<ManageEvent />} /> 
            <Route path="/add-category" element={<Addcategory/>}/>
          </Route>
        )}

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
