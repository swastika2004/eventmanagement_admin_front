import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateEvent, fetchSingleEvents } from "../../Reducer/EventSlice";
import { useForm } from "react-hook-form";
import { fetchCategories } from "../../Reducer/CategorySlice";
import { toast } from "react-toastify";

const EditEvent = () => {
    const { singleEventData } = useSelector((state) => state?.event);
    const { categoryList } = useSelector((state) => state?.category);
    const location = useLocation();
    const id = location?.state?.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [preview, setPreview] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(fetchSingleEvents({ id: id }));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (singleEventData?.events) {
            const event = singleEventData.events;
            setValue("eventName", event.eventName);
            setValue("description", event.description);
            setValue("category", event.category?._id);
            setValue("eventDate", event.eventDate ? event.eventDate.split('T')[0] : "");
            setValue("venue", event.venue);
            setValue("location", event.location);
            setValue("totalSeats", event.totalSeats);
            setValue("availableSeats", event.availableSeats);
            setValue("price", event.price);
            setValue("status", event.status);
            
            if (event.imageUrl) {
                setPreview(`${import.meta.env.VITE_API_BASE_URL.replace("/api", "")}${event.imageUrl}`);
            }
        }
    }, [singleEventData, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("eventName", data.eventName);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("eventDate", data.eventDate);
        formData.append("venue", data.venue);
        formData.append("location", data.location);
        formData.append("totalSeats", data.totalSeats);
        formData.append("availableSeats", data.availableSeats);
        formData.append("price", data.price);
        formData.append("status", data.status);
        
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        dispatch(updateEvent({ id, data: formData })).then((res) => {
            if (res?.payload?.status_code === 200) {
                toast.success(res?.payload?.message || "Event updated successfully!");
                navigate("/event");
            } else {
                toast.error(res?.payload?.message || "Event update failed!");
            }
        }).catch((err) => {
            toast.error("Something went wrong!");
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white w-full max-w-[600px] p-8 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Edit Event</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Event Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600 ml-1">Event Name</label>
                        <input
                            {...register("eventName", { required: "Event name is required" })}
                            type="text"
                            placeholder="Enter event name"
                            className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                        />
                        {errors.eventName && <span className="text-red-500 text-xs ml-1">{errors.eventName.message}</span>}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600 ml-1">Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            placeholder="Tell us about the event..."
                            className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none transition-all h-32 resize-none"
                        />
                        {errors.description && <span className="text-red-500 text-xs ml-1">{errors.description.message}</span>}
                    </div>

                    {/* Category & Status Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Category</label>
                            <select
                                {...register("category", { required: "Category is required" })}
                                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none bg-white transition-all"
                            >
                                <option value="">Select Category</option>
                                {categoryList?.categories?.map((cat) => (
                                    <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                                ))}
                            </select>
                            {errors.category && <span className="text-red-500 text-xs ml-1">{errors.category.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Status</label>
                            <select
                                {...register("status", { required: "Status is required" })}
                                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none bg-white transition-all"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                            {errors.status && <span className="text-red-500 text-xs ml-1">{errors.status.message}</span>}
                        </div>
                    </div>

                    {/* Date & Price Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Event Date</label>
                            <input
                                {...register("eventDate", { required: "Date is required" })}
                                type="date"
                                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                            />
                            {errors.eventDate && <span className="text-red-500 text-xs ml-1">{errors.eventDate.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Price (₹)</label>
                            <input
                                {...register("price", { required: "Price is required" })}
                                type="number"
                                placeholder="0.00"
                                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                            />
                            {errors.price && <span className="text-red-500 text-xs ml-1">{errors.price.message}</span>}
                        </div>
                    </div>

                    {/* Venue & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Venue</label>
                            <input
                                {...register("venue", { required: "Venue is required" })}
                                type="text"
                                placeholder="Grand Hall"
                                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                            />
                            {errors.venue && <span className="text-red-500 text-xs ml-1">{errors.venue.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Location</label>
                            <input
                                {...register("location", { required: "Location is required" })}
                                type="text"
                                placeholder="City, State"
                                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                            />
                            {errors.location && <span className="text-red-500 text-xs ml-1">{errors.location.message}</span>}
                        </div>
                    </div>

                    {/* Seats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Total Seats</label>
                            <input
                                {...register("totalSeats", { required: "Total seats required" })}
                                type="number"
                                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                            />
                            {errors.totalSeats && <span className="text-red-500 text-xs ml-1">{errors.totalSeats.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-600 ml-1">Available Seats</label>
                            <input
                                {...register("availableSeats", { required: "Available seats required" })}
                                type="number"
                                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                            />
                            {errors.availableSeats && <span className="text-red-500 text-xs ml-1">{errors.availableSeats.message}</span>}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600 ml-1">Event Image</label>
                        <div className="relative group">
                            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all overflow-hidden bg-gray-50">
                                {preview ? (
                                    <div className="relative w-full h-full">
                                        <img src={preview} alt="preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-white font-medium">Change Image</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center p-4">
                                        <svg className="w-12 h-12 text-gray-400 mb-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-sm font-medium text-gray-600">Click to upload event image</p>
                                        <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (MAX. 800x400px)</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    {...register("image", { onChange: handleImageChange })}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/event")}
                            className="flex-1 px-6 py-3 border-2 border-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98]"
                        >
                            Update Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEvent;