import React from 'react';
import ReactApexChart from "react-apexcharts";

const BarChart = () => {
    const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];

    const options = {
        series: [{
            name: 'Test Scores',
            data: [85, 92, 78, 95, 88, 90, 82, 97, 86, 93, 79, 91, 84]
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
                columnWidth: '45%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: [
                ['John', 'Doe'],
                ['Joe', 'Smith'],
                ['Jake', 'Williams'],
                'Amber',
                ['Peter', 'Brown'],
                ['Mary', 'Evans'],
                ['David', 'Wilson'],
                ['Lily', 'Roberts'],
                ['Sophia', 'Turner'],
                ['James', 'Miller'],
                ['Olivia', 'Anderson'],
                ['Michael', 'Clark'],
                ['Emma', 'Thompson']
            ],
            labels: {
                style: {
                    colors: colors,
                    fontSize: '12px'
                }
            },
            tickPlacement: 'on'
        },
        yaxis: {
            title: {
                text: 'Test Scores'
            },
            min: 0,
            max: 100
        },
        title: {
            text: 'Student Test Scores',
            align: 'center',
            margin: 10,
            offsetY: 0,
            style: {
                fontSize: '20px',
            },
        },
        grid: {
            show: false
        }
    };

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[1200px]">
                <ReactApexChart options={options} series={options.series} type="bar" height={350} />
            </div>
        </div>
    );
}

export default BarChart;