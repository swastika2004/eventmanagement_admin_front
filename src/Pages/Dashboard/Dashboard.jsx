// import Sidebar from "../Sidebar"

// const Dashboard=()=>{
//     return(
//         <>
//         {/* <Sidebar/> */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//        <div className="bg-white p-6 rounded-2xl shadow">
//          <h3 className="text-gray-500">Total Users</h3>
//          <p className="text-3xl font-bold mt-2">120</p>
//        </div>
//        <div className="bg-white p-6 rounded-2xl shadow">
//                  <h3 className="text-gray-500">Total Categories</h3>

//         <p className="text-3xl font-bold mt-2">12</p>

//       </div>

//       <div className="bg-white p-6 rounded-2xl shadow">

//         <h3 className="text-gray-500">Total Events</h3>

//         <p className="text-3xl font-bold mt-2">45</p>

//       </div>

//     </div>
//         </>
//     )
// }
// export default Dashboard


const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-gray-500">Total Users</h3>
        <p className="text-3xl font-bold mt-2">120</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-gray-500">Total Categories</h3>
        <p className="text-3xl font-bold mt-2">12</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow">
        <h3 className="text-gray-500">Total Events</h3>
        <p className="text-3xl font-bold mt-2">45</p>
      </div>
    </div>
  );
};

export default Dashboard;
