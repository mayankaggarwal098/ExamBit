//Student Profile
import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ LineData }) => {
  return (
    <Line
      height={100}
      options={{
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100,
              },
              scaleLabel: {
                display: true,
                labelString: "Percentage",
              },
            },
          ],
        },
      }}
      data={LineData}
    />
  );
};

export default LineChart;
