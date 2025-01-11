import React from 'react'
import { 
  Star, 
  User2Icon
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function Testimonials() {
    const testimonials = [
        {
          name: "Sarah Chen",
          role: "Software Developer",
          content: "Lakshya helped me transition from a junior to senior developer in just 8 months. The personalized roadmap was invaluable.",
          avatar: <User2Icon className="w-7 h-7"/>
        },
        {
          name: "Michael Roberts",
          role: "Data Scientist",
          content: "The community support and mock interviews were game-changers in my job search. Landed my dream role!",
          avatar: "/api/placeholder/64/64"
        },
        {
          name: "Priya Sharma",
          role: "UX Designer",
          content: "The multilingual support and doubt-solving features helped me overcome language barriers in tech.",
          avatar: "/api/placeholder/64/64"
        },
        {
          name: "John Doe",
          role: "Cybersecurity Specialist",
          content: "Lakshya's resources and mentorship helped me stay up-to-date with the latest security trends and best practices.",
          avatar: "/api/placeholder/64/64"
        },
      ];
  return (
    <div className="flex flex-col justify-center items-center h-full py-8 px-6 bg-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">Success Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((testimonial, index) => {
          const elementRef = useScrollAnimation();
          return (
            <div 
              ref={elementRef}
              key={index} 
              className="opacity-0 bg-gray-700 rounded-xl p-8 relative"
            >
              <div className="absolute -top-4 -left-4">
                <Star className="w-8 h-8 text-yellow-400 fill-current" />
              </div>
              <div className="flex items-center mb-6">
                <User2Icon className='w-12 h-12 rounded-full border border-gray-400 p-2'/>
                <div className="ml-4">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-300">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-200">{testimonial.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  )
}

export default Testimonials