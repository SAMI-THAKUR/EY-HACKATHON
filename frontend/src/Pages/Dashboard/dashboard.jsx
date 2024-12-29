import Histogram from "./Histogram";
import Donut from "./Donut";
import StudentCard from "./studentcard";

const subjects = ["Mathematics", "Science", "English", "History", "Geography", "Computer Science"];

const Dashboard = () => {
  return (
    <div className="xl:mx-[70px] max-sm:mt-10 max-sm:py-10 flex min-h-screen bg-gray-100">
      <div className="flex-1 p-4 overflow-auto">
        <h1 className="text-3xl font-bold mb-6 text-slate-950 ">Teacher Dashboard</h1>

        {/* Student Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {subjects.map((subject, index) => (
            <StudentCard key={index} subject={subject} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow-md">
            <Histogram />
          </div>
          <div className="bg-white p-4 rounded shadow-md">
            <Donut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
