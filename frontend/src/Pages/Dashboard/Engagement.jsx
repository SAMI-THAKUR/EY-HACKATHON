import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Engagement = () => {
  const series = {
    monthDataSeries1: {
      month: ["01 Jan", "01 Feb", "01 Mar", "01 Apr", "01 May", "01 Jun", "01 Jul", "01 Aug", "01 Sep", "01 Oct", "01 Nov"],
      scores: [75, 80, 85, 82, 88, 90, 87, 91, 89, 92, 95],
    },
  };

  const options = {
    series: [
      {
        name: "Student Engagement",
        data: series.monthDataSeries1.scores,
      },
    ],
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Student Engagement Analysis",
      align: "left",
    },
    subtitle: {
      text: "Monthly Engagement Scores",
      align: "left",
    },
    labels: series.monthDataSeries1.month,
    xaxis: {
      type: "category",
    },
    yaxis: {
      opposite: true,
      title: {
        text: "Engagement Score",
      },
    },
    legend: {
      horizontalAlign: "left",
    },
  };

  return (
    <div className="engagement bg-gray-100 p-2">
      <div className="engagement__header">
        <h3 className="font-bold ">Engagement</h3>
      </div>
      <div className="engagement__chart ">
        <ReactApexChart options={options} series={options.series} type="area" height={500} width={800} />
      </div>
    </div>
  );
};

export default Engagement;
