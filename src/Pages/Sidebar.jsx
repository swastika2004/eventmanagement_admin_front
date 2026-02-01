// import { Outlet, NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="flex h-screen">
//       <aside className="w-64 bg-gray-900 text-white">
//         <NavLink to="/dashboard">Dashboard</NavLink>
//         <NavLink to="/category">Category</NavLink>
//       </aside>

//       <main className="flex-1 p-6 bg-gray-100">
//         {/* THIS IS WHERE PAGES RENDER */}
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Sidebar;



import { NavLink, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
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
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow px-6 flex items-center">
          <h1 className="text-xl font-semibold">Admin Panel</h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {/* THIS IS WHERE DASHBOARD / CATEGORY LOAD */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Sidebar;

