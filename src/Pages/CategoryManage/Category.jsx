import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../Reducer/CategorySlice";
import { useNavigate } from "react-router-dom";


const Category = () => {
  // const categories = [
  //   { id: 1, name: "Music" },
  //   { id: 2, name: "Sports" },
  //   { id: 3, name: "Technology" },
  // ];

  const {categoryList}=useSelector((state)=>state?.category)
  const dispatch=useDispatch()
  const navigate=useNavigate();
  useEffect(()=>{
dispatch(fetchCategories())
  },[])

  console.log("categoryList",categoryList);

  const handleAddCategory=()=>{
navigate("/add-category")
  }
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Category Management</h2>
        <button onClick={()=>handleAddCategory()} className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
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
            <tr key={cat.id} className="border-b last:border-none">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{cat.categoryName}</td>
               <td className="py-2">{cat.description}</td>
              <td className="py-2 space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
