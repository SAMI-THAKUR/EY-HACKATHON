import React from 'react';
import { 
    BookOpen, 
    Users, 
    Briefcase, 
    CheckCircle,
    Star, 
    ChevronRight,
    User2Icon
  } from 'lucide-react';

function CoreFeatures(){
    const features = [
        {
          title: "Skill Gap Analysis & Learning",
          icon: <BookOpen className="w-6 h-6 text-white" />,
          description: "Personalized learning roadmaps, curated courses, and virtual mentorship to bridge your skill gaps",
          subFeatures: [
            "Customized Learning Roadmaps",
            "Handpicked Course Recommendations",
            "24/7 Virtual Doubt Resolution",
            "Progress Assessment Tools",
            "Support in Multiple Languages"
          ]
        },
        {
          title: "Learn in Public",
          icon: <Users className="w-6 h-6 text-white" />,
          description: "Build your personal brand and connect with like-minded professionals through our community features",
          subFeatures: [
            "Social Learning Platform",
            "Community Events & Meetups",
            "Knowledge Sharing Sessions",
            "Industry Expert Seminars",
            "Collaborative Projects"
          ]
        },
        {
          title: "Employment Support",
          icon: <Briefcase className="w-6 h-6 text-white" />,
          description: "Comprehensive career support from job search to interview preparation",
          subFeatures: [
            "Cold Email Templates & Guidance",
            "Mock Interview Practice",
            "Real-time Job Opportunities",
            "Trending Skills Analysis",
            "Career Path Planning"
          ]
        }
      ];
    return (
        <div className="flex flex-col justify-center items-center w-screen h-auto py-12 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Our Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-700 rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-indigo-600 rounded-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold ml-3">{feature.title}</h3>
                </div>
                <p className="text-gray-300 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.subFeatures.map((subFeature, idx) => (
                    <li key={idx} className="flex items-center text-gray-200">
                      <CheckCircle className="w-5 h-5 text-indigo-400 mr-3" />
                      {subFeature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
export default CoreFeatures;