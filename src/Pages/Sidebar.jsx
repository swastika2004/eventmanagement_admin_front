import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Reducer/AuthSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            Dashboard
          </NavLink>

          {/* Category Management */}
          <NavLink
            to="/category"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            Category Management
          </NavLink>

          {/* Event Management */}
          <NavLink
            to="/event"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            Event Management
          </NavLink>

          {/* Order Management */}
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            Order Management
          </NavLink>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-sm px-6 flex justify-between items-center z-10">
          <h1 className="text-xl font-bold text-gray-800">Admin Control Center</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all shadow hover:shadow-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
