import { useState, useEffect } from "react"; // Add useEffect import
import { useNavigate } from "react-router-dom";
import { IoLogOutSharp, IoLogIn } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io"; // Correct import
import { useDispatch, useSelector } from "react-redux";
import { setNav } from "../redux/navSlice";
import { RiRoadMapLine, RiAiGenerate } from "react-icons/ri";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { CiHome } from "react-icons/ci";
import { LogoutHandler } from "../apicalls/auth.api";
import { setUser } from "../redux/userSlice";
import Lakshya from '../landingPages/Lakshya.png';
import { Users } from 'lucide-react';

export default function Header() {
  const [profile, setProfile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Add this state
  const dispatch = useDispatch();
  const { nav } = useSelector((state) => state.nav);
  const { user } = useSelector((state) => state.users);
  const logedIn = user;
  const navigate = useNavigate();

  const onSubmit = async () => {
    await LogoutHandler();
    dispatch(setUser(null));
    await new Promise((resolve) => setTimeout(() => resolve(), 500));
    navigate("/auth/login");
  };

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="fixed w-full top-0 z-50"> {/* Make header fixed */}
        <nav className={`w-full mx-auto bg-gray-800 shadow transition-all duration-300 ${
          isScrolled ? 'bg-gray-800/80 backdrop-blur-md' : 'bg-gray-800'
        }`}>
          <div className="container px-6 justify-between h-16 flex items-center lg:items-stretch mx-auto">
            <div className="h-full flex items-center">
              <div
                onClick={() => {
                  dispatch(setNav("/home"));
                  navigate("/");
                }}
                className="cursor-pointer mr-10 flex items-center"
              >
                <img 
                  src={Lakshya} 
                  alt="Lakshya Logo" 
                  className="h-10 w-auto object-contain" 
                />
                <h3 className="text-base text-white font-bold tracking-normal leading-tight ml-3 hidden lg:block">LAKSHYA</h3>
              </div>
              <ul className="pr-12 flex items-center h-full">
                <li
                  onClick={() => {
                    navigate("/");
                    dispatch(setNav("/home"));
                  }}
                  className={`cursor-pointer h-full flex items-center hover:text-indigo-700 text-white tracking-normal ${
                    nav == "/home" && " border-b-2 border-white "
                  } `}
                >
                  Home
                </li>
                <li
                  onClick={() => {
                    navigate("/dashboard");
                    dispatch(setNav("/dashboard"));
                  }}
                  className={`cursor-pointer h-full flex items-center hover:text-indigo-700 text-white mx-10 tracking-normal ${
                    nav == "/dashboard" && " border-b-2 border-white "
                  }`}
                >
                  Dashboard
                </li>
                <li
                  onClick={() => {
                    window.open("http://localhost:8501/");
                  }}
                  className={`cursor-pointer h-full flex items-center hover:text-indigo-700 text-white mr-10 tracking-normal ${
                    nav == "/generate" && " border-b-2 border-white "
                  }`}
                >
                  Generate
                </li>
                <li
                  onClick={() => {
                    navigate("/calendar");
                    dispatch(setNav("/calendar"));
                  }}
                  className={`cursor-pointer h-full flex items-center hover:text-indigo-700 text-white tracking-normal ${
                    nav == "/calendar" && " border-b-2 border-white "
                  }`}
                >
                  Planner
                </li>
                <li
                  onClick={() => {
                    navigate("/community");
                    dispatch(setNav("/community"));
                  }}
                  className={`cursor-pointer h-full flex items-center hover:text-indigo-700 text-white ml-10 tracking-normal ${
                    nav == "/community" && " border-b-2 border-white "
                  }`}
                >
                  Community
                </li>
              </ul>
            </div>
            {logedIn ? (
              <div className="h-full flex items-center justify-end">
                <div className="w-full h-full flex items-center">
                  <div className="w-full h-full flex">
                    <div className="w-32 h-full flex items-center justify-center border-gray-700 border-r text-gray-400 cursor-pointer">
                      <IoMdNotificationsOutline className="text-2xl" />
                    </div>
                    <div className="w-full flex items-center justify-end relative cursor-pointer" onClick={() => setProfile(!profile)}>
                      {profile && (
                        <ul className="p-2 w-40 border-r bg-white absolute rounded left-0 shadow mt-16 top-0">
                          <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                            <div
                              className="flex items-center"
                              onClick={() => {
                                navigate("/profile");
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-user"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <circle cx={12} cy={7} r={4} />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                              </svg>
                              <span className="ml-2">My Profile</span>
                            </div>
                          </li>

                          <li
                            onClick={() => {
                              onSubmit();
                            }}
                            className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none"
                          >
                            <IoLogOutSharp className="text-2xl ml-1" />
                            <span className="ml-2">Logout</span>
                          </li>
                        </ul>
                      )}
                      <img className="rounded h-10 w-10 object-cover" src="/profile.webp" alt="logo" />
                      <p className="text-white text-sm ml-2">{user.username.split(" ")[0] || "User"}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  navigate("/auth/login");
                }}
                className="flex justify-center items-center text-white hover:text-indigo-700 focus:text-indigo-700 cursor-pointer gap-2"
              >
                <IoLogIn className="text-xl" />
                <p>Login</p>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
