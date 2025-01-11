import React from 'react';
import ReactApexChart from 'react-apexcharts';

const CareerPieChart = () => {
  const options = {
    series: [44, 55, 41, 17],
    chart: {
      type: 'donut',
      background: 'transparent'
    },
    labels: ['Technical', 'Management', 'Design', 'Analysis'],
    colors: ['#4F46E5', '#059669', '#7C3AED', '#DB2777'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Skills',
              color: '#fff'
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff']
      }
    },
    legend: {
      position: 'bottom',
      labels: {
        colors: '#fff'
      }
    },
    tooltip: {
      theme: 'dark'
    }
  };

  return (
    <div className="w-full">
      <ReactApexChart 
        options={options} 
        series={options.series} 
        type="donut" 
        height={350} 
      />
    </div>
  );
};

export default CareerPieChart;
