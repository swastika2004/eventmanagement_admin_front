import { useState } from "react";
import Dashboard from "./Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";

const Sidebar=()=>{
    const [active, setActive] = useState("dashboard");
    const navigate=useNavigate()
    const handleCategory=()=>{
        setActive("categories")
        navigate('/category')
    }
    return(
        <>
        <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActive("dashboard")}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              active === "dashboard" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => handleCategory()}
            className={`w-full text-left px-4 py-2 rounded-lg ${
              active === "categories" ? "bg-gray-700" : "hover:bg-gray-800"
            }`}
          >
            Category Management
          </button>
        </nav>
        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
          © 2026 Admin
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold capitalize">{active}</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Admin User</span>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {active === "dashboard" && <Dashboard />}
          {/* {active === "categories" && <CategoryManagement />} */}
        </main>
      </div>
    </div>
        </>
    )
}
export default Sidebar

