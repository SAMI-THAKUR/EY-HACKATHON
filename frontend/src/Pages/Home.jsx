import { useEffect } from "react";
import { getUserHandler } from "../apicalls/auth.api";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import image from "../assets/DRONA.png";

const Home = () => {
  const dispatch = useDispatch();

  const handleGetUser = async () => {
    try {
      const res = await getUserHandler();
      if (res.success) {
        dispatch(setUser(res.user));
      }
    } catch (error) {
      console.error("Error getting user:", error);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* <Sidebar /> */}
      <div className="flex-1 overflow-auto">
        <div
          className="min-h-screen bg-contain bg-no-repeat bg-center flex flex-col items-center justify-center"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="bg-white bg-opacity-75 p-8 rounded-lg text-center">
            <h1 className="font-bold text-4xl text-blue-600 mb-4">Welcome to the DRONA-VERSE</h1>
            <p className="text-gray-800">Explore the world of DRONA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
