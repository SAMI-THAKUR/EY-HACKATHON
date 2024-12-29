




//         import ReactApexChart from "react-apexcharts";

// const state = {
//     series: [44, 55, 41, 17, 15],
//     options: {
//       chart: {
//         width: 380,
//         type: 'donut',
//       },
//       plotOptions: {
//         pie: {
//           startAngle: -90,
//           endAngle: 270
//         }
//       },
//       dataLabels: {
//         enabled: false
//       },
//       fill: {
//         type: 'gradient',
//       },
//       legend: {
//         formatter: function(val, opts) {
//           return val + " - " + opts.w.globals.series[opts.seriesIndex]
//         }
//       },
//       title: {
//         text: 'Students subjects distribution',
//       },
//       responsive: [{
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: 200
//           },
//           legend: {
//             position: 'bottom'
//           }
//         }
//       }]
//     },
// };

// const Donut = () => {
//     return (
//         <div id="chart">
//             <ReactApexChart options={state.options} series={state.series} type="donut" height={350} />
//         </div>
//     );
// }

// export default Donut;
import ReactApexChart from "react-apexcharts";

const subjectData = {
    series: [30, 25, 20, 15, 10, 8], // Example data representing the number of students in each subject
    options: {
        chart: {
            width: 380,
            type: 'donut',
        },
        labels: ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Computer Science'],
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270,
            },
        },
        dataLabels: {
            enabled: false,
        },
        fill: {
            type: 'gradient',
        },
        legend: {
            formatter: function(val, opts) {
                return val + " - " + opts.w.globals.series[opts.seriesIndex] + " students";
            },
        },
        title: {
            text: 'Student Subject Distribution',
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: 'bottom',
                },
            },
        }],
    },
};

const Donut = () => {
    return (
        <div id="chart">
            <ReactApexChart options={subjectData.options} series={subjectData.series} type="donut" height={350} />
        </div>
    );
}

export default Donut;
