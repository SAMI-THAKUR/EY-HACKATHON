import { useEffect } from "react";
import { getUserHandler } from "../apicalls/auth.api";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Lakshya from '../landingPages/Lakshya.png';
import { 
  GraduationCap,
  Target,
  LineChart,
  Calendar,
  BookOpen,
  Award,
  Briefcase,
  TrendingUp
} from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const careerActions = [
    { title: "Skill Assessment", icon: <Target/>, route: "/generate", color: "bg-blue-600" },
    { title: "Career Track", icon: <LineChart/>, route: "/dashboard", color: "bg-green-600" },
    { title: "Learning Plan", icon: <Calendar/>, route: "/calendar", color: "bg-purple-600" },
    { title: "Resources", icon: <BookOpen/>, route: "/resources", color: "bg-indigo-600" }
  ];

  const careerMetrics = [
    { label: "Skills Tracked", value: "15+", icon: <Award/>, color: "bg-blue-500" },
    { label: "Career Paths", value: "8", icon: <Briefcase/>, color: "bg-green-500" },
    { label: "Learning Hours", value: "120+", icon: <GraduationCap/>, color: "bg-purple-500" },
    { label: "Growth Potential", value: "High", icon: <TrendingUp/>, color: "bg-indigo-500" }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <img src={Lakshya} alt="Lakshya Logo" className="h-20 mx-auto mb-8" />
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Build Your Dream Career
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Your personalized journey towards professional excellence. Get guidance, develop skills, 
          and chart your path to success.
        </p>
      </div>

      {/* Career Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {careerMetrics.map((metric, index) => (
          <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all">
            <div className={`${metric.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              {metric.icon}
            </div>
            <h3 className="text-2xl font-bold mb-1">{metric.value}</h3>
            <p className="text-gray-400">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Career Development Actions */}
      <h2 className="text-2xl font-semibold mb-6">Start Your Journey</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {careerActions.map((action, index) => (
          <button
            key={index}
            onClick={() => navigate(action.route)}
            className={`${action.color} hover:opacity-90 p-6 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105`}
          >
            {action.icon}
            <span className="font-semibold">{action.title}</span>
          </button>
        ))}
      </div>

      {/* Featured Resources */}
      <div className="mt-12 bg-gray-800/30 rounded-xl p-8 border border-gray-700">
        <h2 className="text-2xl font-semibold mb-6">Career Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="font-semibold text-xl mb-2">Skill Development</h3>
            <p className="text-gray-400">Access curated learning paths to enhance your professional skills</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="font-semibold text-xl mb-2">Career Guidance</h3>
            <p className="text-gray-400">Get expert advice and insights for career advancement</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="font-semibold text-xl mb-2">Industry Insights</h3>
            <p className="text-gray-400">Stay updated with latest trends and job market demands</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
