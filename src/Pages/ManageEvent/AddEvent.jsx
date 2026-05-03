import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../Reducer/CategorySlice";
import { useForm } from "react-hook-form";
import { addEvent } from "../../Reducer/EventSlice";
import { toast } from "react-toastify";

const AddEvent = () => {

const {categoryList}=useSelector((state)=>state?.category)
  const dispatch=useDispatch()
  const navigate=useNavigate();
  const [preview, setPreview] = useState(null);
  useEffect(()=>{
dispatch(fetchCategories())
  },[])

  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setPreview(URL.createObjectURL(file));
  }
};
   const {
          register,
          handleSubmit,
          formState: { errors },
        } = useForm();

        const onsubmit = (data) => {
          const formData = new FormData();
          formData.append("eventName", data?.eventName);
          formData.append("description", data?.description);
          formData.append("category", data?.category);
          formData.append("eventDate", data?.eventDate);
          formData.append("venue", data?.venue);
          formData.append("location", data?.location);
          formData.append("totalSeats", data?.totalSeats);
          formData.append("availableSeats", data?.availableSeats);
          formData.append("price", data?.price);
          formData.append("status", data?.status);
          formData.append("image", data.image[0]);

          dispatch(addEvent(formData)).then((res) => {
            if (res?.payload?.status_code === 200 || res?.payload?.status_code === 201) {
              toast.success(res?.payload?.message || "Event created successfully!");
              navigate("/event");
            } else {
              toast.error(res?.payload?.message || "Event creation failed!");
            }
          }).catch((err) => {
            toast.error("Something went wrong. Please try again.");
          });
        }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">

      <div className="bg-white w-full max-w-[500px] p-4 md:p-6 rounded-2xl shadow">

        <h2 className="text-2xl font-semibold text-center mb-4">
          Add Event
        </h2>

        <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">

          {/* Event Name */}
          <div>
            <label className="block mb-1">Event Name</label>
            <input 
             {...register("eventName",{required:"EventName is required"})}
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Enter event name"
            />
           {
              errors?.eventName&&(
                <span className="text-red-500">{errors?.eventName?.message}</span>
              )
             }
          </div>

          {/* Description */}
          <div>
            
            <label className="block mb-1">Description</label>
            <textarea
             {...register("description",{required:"Description is required"})}
              className="w-full border p-2 rounded"
              placeholder="Enter description"
            />
             {
              errors?.description&&(
                <span className="text-red-500">{errors?.description?.message}</span>
              )
             }
          </div>

          {/* Category */}
          <div>
           
            <label className="block mb-1">Category</label>
            <select className="w-full border p-2 rounded"   {...register("category",{required:"Category is required"})}>
              <option>Select category</option>
              {
                    categoryList?.categories?.map((cat)=>{
                        return(
                            <>
                            <option value={cat?._id}>{cat?.categoryName}</option>
                            </>
                        )
                    })
              }
            </select>
             {
              errors?.category&&(
                <span className="text-red-500">{errors?.category?.message}</span>
              )
             }
          </div>

          {/* Date */}
          <div>
            <label className="block mb-1">Event Date</label>
            <input
             {...register("eventDate",{required:"Event Date Name is required"})}
              type="date"
              className="w-full border p-2 rounded"
            />
            {
                errors?.eventDate&&(
                <span className="text-red-500">{errors?.eventDate?.message}</span>
              )
            }
          </div>

          {/* Venue */}
          <div>
            <label className="block mb-1">Venue</label>
            <input
            {...register("venue",{required:"Venue Name is required"})}
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Enter venue"
            />
            {
              errors?.venue&&(
                <span className="text-red-500">{errors?.venue?.message}</span>
              )
             }
          </div>

          {/* Location */}
          <div>
            <label className="block mb-1">Location</label>
            <input
            {...register("location",{required:"Location Name is required"})}
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Enter location"
            />
            {
              errors?.location&&(
                <span className="text-red-500">{errors?.location?.message}</span>
              )
             }
          </div>

          {/* Seats */}
          <div>
            <label className="block mb-1">Total Seats</label>
            <input
             {...register("totalSeats",{required:"Total Seat  is required"})}
              type="number"
              className="w-full border p-2 rounded"
            />
            {
              errors?.totalSeats&&(
                <span className="text-red-500">{errors?.totalSeats?.message}</span>
              )
             }
          </div>

          <div>
            <label className="block mb-1">Available Seats</label>
            <input
            {...register("availableSeats",{required:"Avilable seat is required"})}
              type="number"
              className="w-full border p-2 rounded"
            />
            {
              errors?.availableSeats&&(
                <span className="text-red-500">{errors?.availableSeats?.message}</span>
              )
             }
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1">Price</label>
            <input
            {...register("price",{required:"Price is required"})}
              type="number"
              className="w-full border p-2 rounded"
            />
              {
              errors?.price&&(
                <span className="text-red-500">{errors?.price?.message}</span>
              )
             }
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1">Status</label>
            <select className="w-full border p-2 rounded"
            {...register("status",{required:"Status is required"})}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="cancelled">Cancelled</option>
            </select>
             {
              errors?.status&&(
                <span className="text-red-500">{errors?.status?.message}</span>
              )
             }
          </div>

          {/* Image */}
              <div>
            <label className="block mb-1">Image</label>

            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">

              {
                preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="h-32 object-cover"
                  />
                ) : (
                  <>
                    <span className="text-gray-500">
                      Upload Event Image
                    </span>

                    <span className="text-xs text-gray-400">
                      PNG, JPG allowed
                    </span>
                  </>
                )
              }

              <input
                type="file"
                className="hidden"
                accept="image/*"
                {...register("image", {
                  required: "Image is required",
                  onChange: handleImageChange,
                })}
              />

            </label>

            {errors?.image && (
              <span className="text-red-500">
                {errors?.image?.message}
              </span>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg"
          >
            Add Event
          </button>

        </form>

      </div>

    </div>
  );
};

export default AddEvent;