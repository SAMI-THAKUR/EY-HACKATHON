
// import ReactApexChart from "react-apexcharts";

// const MixedChart = () => {
//   const state = {
//     series: [{
//       name: 'Percentage',
//       type: 'column',
//       data: [85, 92, 78, 88, 95, 82, 91, 76, 89, 93]
//     }, {
//       name: 'Students in Class',
//       type: 'line',
//       data: [10, 25, 28, 32, 26, 29, 27, 31, 24, 33]
//     }],
//     options: {
//       chart: {
//         height: 350,
//         type: 'line',
//       },
//       stroke: {
//         width: [0, 4]
//       },
//       title: {
//         text: 'Student Performance by Class',
//         style: {
//           fontSize: '20px',
//       },
//       },
//       dataLabels: {
//         enabled: true,
//         enabledOnSeries: [1]
//       },
//       labels: ['10A', '10B', '10C', '10D', '11A', '11B', '11C', '11D', '12A', '12B'],
//       xaxis: {
//         title: {
//           text: 'Class'
//         }
//       },
//       yaxis: [{
//         title: {
//           text: 'Percentage',

//         },
//       }, {
//         opposite: true,
//         title: {
//           text: 'Number of Students'
//         }
//       }]
//     },
//   };

//   return (
//     <div id="chart">
//       <ReactApexChart 
//         options={state.options} 
//         series={state.series} 
//         type="line" 
//         height={350} 
//       />
//     </div>
//   );
// }

// export default MixedChart;


import ReactApexChart from "react-apexcharts";

const MixedChart = () => {
  const state = {
    series: [
      {
        name: 'Percentage',
        type: 'column',
        data: [85, 92, 78, 88, 95, 82, 91, 76, 89, 93],
      },
      {
        name: 'Students in Class',
        type: 'line',
        data: [10, 25, 28, 32, 26, 29, 27, 31, 24, 33],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
      },
      stroke: {
        width: [0, 4],
      },
      title: {
        text: 'Student Performance by Class',
        style: {
          fontSize: '20px',
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      labels: ['10A', '10B', '10C', '10D', '11A', '11B', '11C', '11D', '12A', '12B'],
      xaxis: {
        title: {
          text: 'Class',
        },
      },
      yaxis: [
        {
          title: {
            text: 'Percentage',
          },
        },
        {
          opposite: true,
          title: {
            text: 'Number of Students',
          },
        },
      ],
    },
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[500px]">
        <ReactApexChart 
          options={state.options} 
          series={state.series} 
          type="line" 
          height={350} 
        />
      </div>
    </div>
  );
};

export default MixedChart;
