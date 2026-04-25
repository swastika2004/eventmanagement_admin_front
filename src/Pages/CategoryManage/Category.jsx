import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, deleteCategory } from "../../Reducer/CategorySlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Category = () => {
  const { categoryList } = useSelector((state) => state?.category)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleAddCategory = () => {
    navigate("/add-category")
  }

  const handleEdit = (id) => {
    navigate(`/edit-category`, { state: { id: id } })
  }

  const openDeleteModal = (id) => {
    setSelectedCategoryId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedCategoryId(null);
  };

  const handleDelete = async () => {
    if (selectedCategoryId) {
      const res = await dispatch(deleteCategory(selectedCategoryId));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Category deleted successfully");
        closeDeleteModal();
      } else {
        toast.error(res.payload?.message || "Failed to delete category");
      }
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Category Management</h2>
          <button onClick={() => handleAddCategory()} className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
            Add Category
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">#</th>
              <th className="text-left py-2">Category Name</th>
              <th className="text-left py-2">Category Description</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoryList?.categories?.map((cat, index) => (
              <tr key={cat._id} className="border-b last:border-none">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{cat.categoryName}</td>
                <td className="py-2">{cat.description}</td>
                <td className="py-2 space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(cat?._id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => openDeleteModal(cat?._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full m-4 transform transition-all animate-in fade-in zoom-in duration-300">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6 mx-auto">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Delete Category?</h3>
            <p className="text-gray-500 text-center mb-8">
              Are you sure you want to delete this category? This action cannot be undone and will permanently remove the category.
            </p>
            <div className="flex gap-4">
              <button
                onClick={closeDeleteModal}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Category;

