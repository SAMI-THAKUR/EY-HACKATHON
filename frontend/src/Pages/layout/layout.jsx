// import { Outlet } from "react-router-dom";
// import Sidebar from "./sideBar";
// export default function Layout() {
//   return (
//     <div className="h-screen  bg-[##F0F0F0]">
//      <div className="flex w-64">
//       <Sidebar />
//       </div>

//       <Outlet />
//     </div>
//   );
// }




import { Outlet } from "react-router-dom";
import Sidebar from "./../layout/sideBar";

export default function Layout() {
  return (
    <div className="h-screen bg-[#F0F0F0] flex">
      <div className="w-64">
        <Sidebar />
      </div>
      {/* sagar added this */}
      <div className="flex-1 p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
