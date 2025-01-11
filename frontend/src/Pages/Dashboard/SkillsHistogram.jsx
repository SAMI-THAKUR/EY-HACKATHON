import React from 'react';
import ReactApexChart from "react-apexcharts";

const SkillsHistogram = () => {
  const options = {
    series: [{
      name: 'Frequency',
      data: [12, 19, 28, 35, 41, 25, 15, 8]
    }],
    chart: {
      type: 'histogram',
      height: 350,
      toolbar: {
        show: false
      },
      background: 'transparent'
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: '85%',
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#4F46E5'],
    xaxis: {
      categories: ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80'],
      labels: {
        style: {
          colors: '#fff'
        }
      },
      title: {
        text: 'Skill Level Range',
        style: {
          color: '#fff'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Number of Skills',
        style: {
          color: '#fff'
        }
      },
      labels: {
        style: {
          colors: '#fff'
        }
      }
    },
    theme: {
      mode: 'dark'
    }
  };

  return (
    <div className="w-full">
      <ReactApexChart 
        options={options} 
        series={options.series} 
        type="bar" 
        height={350} 
      />
    </div>
  );
};

export default SkillsHistogram;
