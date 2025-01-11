import React, { useState, useEffect } from 'react';
import { 
  ArrowRight,
  Video, 
} from 'lucide-react';
import Lakshya from './Lakshya.png';
import CustomBg from './CustomBg.png';
import { useNavigate } from 'react-router-dom';

function HeroSection(){
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      setIsVisible(true);
    }, []);

    return(
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20" />
          <img 
            src={CustomBg} 
            alt="Background" 
            className="object-cover opacity-30"
          />
        </div>
        <div className="flex flex-col items-center justify-evenly relative w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:lg:flex-row">
          <img src={Lakshya} alt="" className="mb-6 max-w-3xl rounded-lg shadow-lg" />
          <div className={`flex flex-col shadow-lg justify-center items-center bg-black/20 p-5 border border-gray-500 rounded-xl gap-y-2 text-center mr-4 md:lg:m-1 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="max-w-3xl text-4xl md:text-5xl font-bold mb-4">
              Transform Your Career <br />with<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400"> Lakshya</span>
            </h1>
            <p className="max-w-3xl text-lg md:text-2xl">
              Your AI-Powered Career Growth Companion. Bridge Skills, Build Networks, Land Opportunities.
            </p>
            <div className="flex flex-col p-4 sm:flex-row justify-center gap-4">
              <button 
                onClick={() => navigate('/home')}
                className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-500 transition-colors inline-flex items-center justify-center"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center">
                Watch Demo <Video className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        {/* Floating Stats Cards */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 pb-16 relative">
          <div className="mr-4 md:lg:m-1 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 border border-white text-center backdrop-blur-lg rounded-lg p-6 transform hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl font-bold">10K+</div>
              <div className="text-sm opacity-80">Active Learners</div>
            </div>
            <div className="bg-white/10 border border-white text-center backdrop-blur-lg rounded-lg p-6 transform hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl font-bold">500+</div>
              <div className="text-sm opacity-80">Course Pathways</div>
            </div>
            <div className="bg-white/10 border border-white text-center backdrop-blur-lg rounded-lg p-6 transform hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl font-bold">90%</div>
              <div className="text-sm opacity-80">Career Transition Rate</div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default HeroSection;