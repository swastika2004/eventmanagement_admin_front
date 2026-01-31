import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../Reducer/AuthSlice";

const Login=()=>{
  const navigate=useNavigate()
  const dispatch=useDispatch()
   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit=(data)=>{
    console.log("data",data);
    dispatch(login(data)).then((res)=>{
      if(res.payload?.status_code===200){
        navigate("/dashboard")
      }
    })
    
  }
  const handleDashboard=()=>{
    navigate('/dashboard')
  }
    return(
        <>
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-700">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 mt-2">
            Sign in to manage events
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" 
        onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("email")}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register("password")}
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-400">
              <input type="checkbox" className="accent-indigo-500" />
              Remember me
            </label>
            <a href="#" className="text-indigo-400 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
         
         
            className="w-full py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © 2026 Event Management Admin
        </p>
      </div>
    </div>
  
        </>
    )
}
export default Login