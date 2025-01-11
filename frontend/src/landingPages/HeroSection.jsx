import React, { useState, useEffect } from 'react';
import { 
  ArrowRight,
  Video,
  Sparkles 
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
        <div className="w-full min-h-screen relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-10" />
                <img 
                    src={CustomBg} 
                    alt="Background" 
                    className="object-cover opacity-20"
                />
            </div>
            <div className="relative container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
                <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 rounded-full mb-8 border border-gray-700">
                        <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                        <span className="text-sm">AI-Powered Career Development Platform</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                        Transform Your Career Journey with <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400">Lakshya</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
                        Your personalized AI companion for career growth. Get data-driven insights, 
                        skill assessments, and expert guidance to accelerate your professional success.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                        <button 
                            onClick={() => navigate('/home')}
                            className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-500 transition-all transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
                        >
                            Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                        <button className="border-2 border-white/20 bg-white/5 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all transform hover:scale-105 inline-flex items-center justify-center backdrop-blur-sm">
                            Watch Demo <Video className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-gray-800/30 border border-gray-700 backdrop-blur-sm rounded-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
                        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">10K+</div>
                        <div className="text-gray-400 mt-2">Successful Career Transitions</div>
                    </div>
                    <div className="bg-gray-800/30 border border-gray-700 backdrop-blur-sm rounded-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
                        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">500+</div>
                        <div className="text-gray-400 mt-2">Learning Pathways</div>
                    </div>
                    <div className="bg-gray-800/30 border border-gray-700 backdrop-blur-sm rounded-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
                        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">95%</div>
                        <div className="text-gray-400 mt-2">Success Rate</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;