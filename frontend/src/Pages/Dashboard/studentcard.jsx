import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const StudentCard = ({ subject }) => {
  const navigate = useNavigate();

  const handlePlannerClick = () => {
    // Define the subject-specific payload here
    const subjectData = {
      subject,
      students: [
        { name: "Student A", class: "Class 1", score: 85, percentage: 85 },
        { name: "Student B", class: "Class 2", score: 90, percentage: 90 },
        // Add more student data as needed
      ],
    };

    // Navigate to the table route with the subject data as state
    navigate(`/dashboard/${subject}`, { state: subjectData });
  };

  return (
    <div className="">
      <div className="card bg-slate-800 w-full sm:w-96 shadow-xl hover:rounded-lg  rounded-lg h-45">
        <div className="card-body p-6 hover:rounded-lg  transition-colors hover:shadow-xl">
          <h2 className="text-2xl text-white font-bold mb-4">{subject}</h2>
          <div className="flex justify-end">
            <button className="bg-white hover:bg-slate-200 text-black py-2 px-4 mr-2 rounded  transition-colors" onClick={handlePlannerClick}>
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;

StudentCard.propTypes = {
  subject: PropTypes.string.isRequired,
};
