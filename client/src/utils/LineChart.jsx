import React from 'react';
import { Line } from 'react-chartjs-2';

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
                // userCallback: function (label, index, labels) {
                //   // when the floored value is the same as the value we have a whole number
                //   if (Math.floor(label) === label) {
                //     return label;
                //   }
                // },
              },
              scaleLabel: {
                display: true,
                labelString: 'Percentage',
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
