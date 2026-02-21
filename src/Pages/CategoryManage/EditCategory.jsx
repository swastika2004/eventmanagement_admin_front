import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { singleCategory, updateCategory } from "../../Reducer/CategorySlice";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const EditCategory=()=>{
    const{singlecate}=useSelector((state)=>state?.category)
    const location=useLocation()
       const {
            register,
            handleSubmit,
            setValue,
            formState: { errors },
          } = useForm();
    console.log("location",location);
    const id=location?.state?.id
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(singleCategory({id:id}))
    },[id])
    console.log("singlecate",singlecate);

    useEffect(()=>{
        setValue("categoryName",singlecate?.categories?.categoryName)
        setValue("description",singlecate?.categories?.description)
    },[singlecate])

    const onSubmit=(data)=>{
        dispatch(updateCategory({
            id:id,
            data: data 
        })).then((res)=>{
            console.log("res",res);
            if(res?.payload?.status_code===200){
                toast.success(res?.payload?.message)
            }
            
        })
    }
    return(
        <>
         <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <ToastContainer/>
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Edit Category
        </h2>

        <form  
         onSubmit={handleSubmit(onSubmit)} 
        className="space-y-4">
          
          {/* Category Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Category Name
            </label>
            <input
              type="text"
              name="name"
             {...register("categoryName",{required:"Category Name is required"})}
              placeholder="Enter category name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            
            />
             {/* {
              errors?.categoryName&&(
                <span className="text-red-500">{errors?.categoryName?.message}</span>
              )
             } */}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
             {...register("description",{required:"Description is required"})}
              rows="4"
              placeholder="Enter category description"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             
            ></textarea>
              {/* {
              errors?.description&&(
                <span className="text-red-500">{errors?.description?.message}</span>
              )
             } */}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Update
          </button>

        </form>
      </div>
    </div>
        </>
    )
}
export default EditCategory;