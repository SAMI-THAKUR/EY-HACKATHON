import React from 'react';
import { 
  ChevronRight,
} from 'lucide-react';
import CustomBg from './CustomBg.png';
function CTA() {
  return (
      <div style={{backgroundImage: `url(${CustomBg})`, backgroundPosition:"bottom"}} className="w-screen min-h-[500px] bg-black pb-8 text-white py-4 gap-x-6 flex justify-evenly items-center flex-col md:lg:flex-row">
        <div className='text-center'>
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8">Join thousands of professionals who are accelerating their careers with Lakshya</p>
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-500 transition-colors inline-flex items-center">
            Start With Lakshya Today <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
  )
}

export default CTA