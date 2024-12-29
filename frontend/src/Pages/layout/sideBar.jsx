import { Icon } from "@iconify/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside className={`${open ? "bg-sec_bg" : "bg-transparent"} sm:bg-sec_bg w-64  fixed px-3 py-4 left-0 overflow-hidden h-[100vh] z-50`}>
      <button
        onClick={() => setOpen(!open)}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 mb-3 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-white "
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <div
        id="default-sidebar"
        className={` ${
          open ? "translate-x-0" : "-translate-x-[110%]"
        } "transition-transform py-3  flex flex-col justify-between bg-sec_bg   sm:translate-x-0 "`}
        aria-label="Sidebar"
      >
        <div >
          <ul className="space-y-2 font-medium">
            <li className="text-heading font-bold drop-shadow text-3xl mb-10">
              <span className="ms-3 text-sky-400">DRONA</span>
            </li>
            <li>
              <Link to={"/dashboard"} className="flex items-center p-2 text-text rounded-lg  hover:bg-white  group">
                <Icon icon="mdi:graph-box" /> 
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={"/transactions"} className="flex items-center p-2 text-text rounded-lg  hover:bg-white  group">
                <Icon icon="fa-solid:file-upload" />
                <span className="flex-1 ms-3 whitespace-nowrap">Upload Document</span>
              </Link>
            </li>

            <li>
              <Link to={"/add-transaction"} className="flex items-center p-2 text-text rounded-lg  hover:bg-white  group">
                <Icon icon="mingcute:ai-fill" />
                <span className="flex-1 ms-3 whitespace-nowrap">AI Assitance</span>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="sign-up" className="flex items-center p-2 text-text rounded-lg  hover:bg-white  group">
                <Icon icon="ph:sign-in-duotone" />
                <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
              </Link>
            </li>
            <li>
              <Link to="log-in" className="flex items-center p-2 text-text rounded-lg  hover:bg-white  group">
                <Icon icon="wpf:create-new" />
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
