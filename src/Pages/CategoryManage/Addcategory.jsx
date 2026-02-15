import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../Reducer/CategorySlice";

const Addcategory=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const onSubmit=(data)=>{
        dispatch(addCategory(data))
        
        
    }
    return(
        <>
         <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Add Category
        </h2>

        <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Category Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              {...register("categoryName")}
              placeholder="Enter category name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              {...register("description")}
              rows="4"
              placeholder="Enter category description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Add Category
          </button>

        </form>
      </div>
    </div>
        </>
    )
}
export default Addcategory