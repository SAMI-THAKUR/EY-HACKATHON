
import ReactApexChart from 'react-apexcharts';

const StudentPerformance = () => {
  const state = {
    series: [65, 20, 10, 5],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Passed', 'Failed', 'Absent', 'Evaluation Pending'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200 
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      colors: ['#00E396', '#FF4560', '#FEB019', '#008FFB'],
     
    },
  };

  return (
    
      
       

<div className="overflow-x-auto">
      <div className="min-w-[500px]">
      <h2 className="text-xl font-bold mb-4">Student Results Distribution</h2>
      <ReactApexChart
          options={state.options}
          series={state.series}
          type="pie"
          width={400}
          height={400}
        />
      </div>
    </div>






      
    
  );
};

export default StudentPerformance;