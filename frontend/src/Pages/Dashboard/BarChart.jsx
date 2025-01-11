import React from 'react';
import ReactApexChart from "react-apexcharts";

const BarChart = () => {
    const colors = ['#4F46E5', '#059669', '#7C3AED', '#DB2777', '#2563EB'];

    const options = {
        series: [{
            name: 'Current Level',
            data: [78, 85, 90, 92, 88, 95]
        }],
        chart: {
            height: 350,
            type: 'bar',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: colors,
        plotOptions: {
            bar: {
                columnWidth: '60%',
                distributed: true,
                borderRadius: 5,
                dataLabels: {
                    position: 'top'
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + '%';
            },
            style: {
                fontSize: '12px',
                colors: ['#fff']
            }
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: [
                'Technical Expertise',
                'Industry Knowledge',
                'Leadership Skills',
                'Problem Solving',
                'Domain Expertise',
                'Career Readiness'
            ],
            labels: {
                style: {
                    colors: colors,
                    fontSize: '13px',
                    fontWeight: 500
                },
                rotate: -45,
                trim: true
            },
            tickPlacement: 'on'
        },
        yaxis: {
            title: {
                text: 'Proficiency Level (%)',
                style: {
                    fontSize: '14px',
                    fontWeight: 500
                }
            },
            min: 0,
            max: 100,
            labels: {
                formatter: function (val) {
                    return val + '%';
                }
            }
        },
        title: {
            text: 'Career Skill Development Progress',
            align: 'center',
            margin: 10,
            offsetY: 0,
            style: {
                fontSize: '20px',
                fontWeight: 600
            },
        },
        grid: {
            borderColor: '#f1f1f1',
            opacity: 0.1
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val + '% Proficiency'
                }
            }
        },
        theme: {
            mode: 'dark'
        }
    };

    return (
        <div className="w-full bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700">
            <div className="min-w-[600px]">
                <ReactApexChart 
                    options={options} 
                    series={options.series} 
                    type="bar" 
                    height={350} 
                />
            </div>
        </div>
    );
}

export default BarChart;