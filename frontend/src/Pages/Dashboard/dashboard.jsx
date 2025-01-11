import BarChart from "./BarChart";
import SkillsHistogram from "./SkillsHistogram";
import CareerPieChart from "./CareerPieChart";
import { Brain, Briefcase, TrendingUp, Target, Award, BookOpen } from 'lucide-react';

const subjects = ["Mathematics", "Science", "English", "History", "Geography", "Computer Science"];

const Dashboard = () => {
  const careerMetrics = [
    { name: "Career Readiness", score: 85, improvement: "+12%", description: "Overall preparation for target role" },
    { name: "Industry Match", score: 78, improvement: "+8%", description: "Alignment with industry requirements" },
    { name: "Skills Coverage", score: 92, improvement: "+15%", description: "Required skills mastered" },
    { name: "Growth Potential", score: 88, improvement: "+10%", description: "Career advancement opportunity" }
  ];

  const careerInsights = [
    { title: "Software Developer", match: "95%", demand: "High", growthRate: "+25% YoY", avgSalary: "$95,000" },
    { title: "ML Engineer", match: "92%", demand: "Very High", growthRate: "+30% YoY", avgSalary: "$105,000" },
    { title: "DevOps Engineer", match: "88%", demand: "High", growthRate: "+22% YoY", avgSalary: "$98,000" }
  ];

  const skillGaps = [
    { title: "Cloud Architecture", progress: 75, priority: "High", timeToMaster: "3 months" },
    { title: "Machine Learning", progress: 60, priority: "Medium", timeToMaster: "6 months" },
    { title: "System Design", progress: 40, priority: "High", timeToMaster: "4 months" }
  ];

  return (
    <div className="mt-16 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 md:py-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Career Growth Analytics
        </h1>

        {/* Career Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {careerMetrics.map((metric, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-gray-700">
              <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3">{metric.name}</h3>
              <div className="flex justify-between items-center mb-2">
                <div className="text-2xl md:text-3xl font-bold">{metric.score}%</div>
                <div className="text-green-400 flex items-center text-sm md:text-base">
                  <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  {metric.improvement}
                </div>
              </div>
              <p className="text-sm text-gray-400">{metric.description}</p>
            </div>
          ))}
        </div>

        {/* Career Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-gray-700">
            <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
              <Briefcase className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Career Path Analysis
            </h2>
            <div className="space-y-3 md:space-y-4">
              {careerInsights.map((career, index) => (
                <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{career.title}</h3>
                    <span className="text-green-400">{career.match} Match</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-gray-400">Demand</p>
                      <p>{career.demand}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Growth</p>
                      <p className="text-green-400">{career.growthRate}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Avg. Salary</p>
                      <p>{career.avgSalary}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rest of the components remain the same */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-gray-700">
            <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Learning Progress
            </h2>
            <div className="space-y-3 md:space-y-4">
              {skillGaps.map((path, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm md:text-base">{path.title}</span>
                    <span className="text-xs md:text-sm text-gray-400">{path.timeToMaster}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${path.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <button className="flex items-center justify-center gap-2 bg-indigo-600 p-3 md:p-4 rounded-xl hover:bg-indigo-700 text-sm md:text-base">
            <Target className="w-4 h-4 md:w-5 md:h-5" /> Take Skill Assessment
          </button>
          <button className="flex items-center justify-center gap-2 bg-purple-600 p-3 md:p-4 rounded-xl hover:bg-purple-700 text-sm md:text-base">
            <Brain className="w-4 h-4 md:w-5 md:h-5" /> Explore Learning Paths
          </button>
          <button className="flex items-center justify-center gap-2 bg-pink-600 p-3 md:p-4 rounded-xl hover:bg-pink-700 text-sm md:text-base sm:col-span-2 md:col-span-1">
            <Award className="w-4 h-4 md:w-5 md:h-5" /> View Certifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

